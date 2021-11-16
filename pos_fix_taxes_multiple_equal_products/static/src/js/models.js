odoo.define('pos_fix_taxes_multiple_equal_products.models', function (require) {
    "use strict";

    var models = require('point_of_sale.models');

    var utils = require('web.utils');
    var round_pr = utils.round_precision;

    var _super_orderline_model = models.Orderline.prototype;
    models.Orderline = models.Orderline.extend({

    compute_all: function(taxes, price_unit, quantity, currency_rounding, no_map_tax) {
        var self = this;

        //Calculate rounded taxes per item, if product not weighed
        if (Number.isInteger(quantity) && !this.get_product().to_weight && quantity > 1){
            //Set quantity = 1
            var res = _super_orderline_model.compute_all.call(this, taxes, price_unit, 1, currency_rounding, no_map_tax);

            //Multiply the values for quantity = 1 with the actual quantity
            for (let i = 0; i < res.taxes.length; i++) {
                res.taxes[i].amount = round_pr(res.taxes[i].amount * quantity, currency_rounding)
            }
            return {
                taxes: res.taxes,
                total_excluded: round_pr(res.total_excluded * quantity, currency_rounding),
                total_included: round_pr(res.total_included * quantity, currency_rounding)
            };
        } else { //Product quantity weighed, not a natural number, or quantity = 1
            return _super_orderline_model.compute_all.call(this, taxes, price_unit, quantity, currency_rounding, no_map_tax);
        }

    }

    });

});