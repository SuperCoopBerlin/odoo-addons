odoo.define("pos_product_deposit.models", function (require) {
    "use strict";

    var models = require("point_of_sale.models");

    models.load_fields("product.product", ["deposit_product_id"]);

    // DepositOrderline is for deposits. Every product orderline with a deposit has
    // exactly one DepositOrderline that is updated when its quantity changes. To
    // always ensure this 1-to-1 mapping, never merge DepositOrderline with any
    // others.
    var DepositOrderline = models.Orderline.extend({
        can_be_merged_with: function(orderline) {
            return false
        }
    })

    // This is how ineritance seems to be done in this madness
    // https://github.com/OCA/pos/blob/d1088fb917896259f75d07913113cebb74a661ed/pos_payment_terminal/static/src/js/models.js#L14
    // this._super, as documented for 14.0, doesn't seem to work (yet?)
    var _orderlineproto = models.Orderline.prototype;
    var Orderline = models.Orderline.extend({
        recompute_deposit_line: function() {
            if (!this.order) {
                // This happens when recreating the orderline from JSON, the order is
                // only set later in the init_from_JSON process. Bail out early and
                // trust that we'll be called again later.
                return
            }
            if (this.product && this.product.deposit_product_id) {
                // We store the ID and do a lookup every time because storing a direct
                // reference would not survive a page reload, where the whole object
                // gets stored as JSON.
                if (this.deposit_line_id) {
                    var deposit_line = this.order.orderlines.get(this.deposit_line_id);
                    // deposit_line could be unset. This can happen during restore, because
                    // the referenced orderline has not yet been restored from JSON, or
                    // because somebody deleted the previously created orderline in the UI.
                    // Because we can't distinguish the two cases here, be conservative and
                    // do nothing in that case to avoid creating duplicated lines during restore.
                    // The trade-off is that if somebody deletes our associated DepositOrderline
                    // in the UI, it's gone and we won't re-create it.
                    if (deposit_line) {
                        deposit_line.set_quantity(this.quantity);
                    }
                } else {
                    var deposit_product = this.pos.db.product_by_id[this.product.deposit_product_id[0]];
                    var deposit_line = new DepositOrderline({}, {
                        pos: this.pos, order: this.order, product: deposit_product
                    });
                    this.deposit_line_id = deposit_line.id;
                    this.order.orderlines.add(deposit_line);
                    deposit_line.set_quantity(this.quantity);
                }
            }
        },
        set_quantity: function(quantity, keep_price) {
            var res = _orderlineproto.set_quantity.apply(this, arguments);
            this.recompute_deposit_line();
            return res;
        },

        /* init_from_JSON, export_as_JSON, clone are overridden to deal with this.deposit_line_id */
        init_from_JSON: function(json) {
            this.deposit_line_id = json.deposit_line_id;
            return _orderlineproto.init_from_JSON.apply(this, arguments);
        },
        export_as_JSON: function() {
            var res = _orderlineproto.export_as_JSON.apply(this, arguments);
            res.deposit_line_id = this.deposit_line_id;
            return res;
        },
        clone: function() {
            var res = _orderlineproto.clone.apply(this, arguments);
            res.deposit_line_id = this.deposit_line_id;
            return res;
        },

    })
    models.Orderline = Orderline;
});