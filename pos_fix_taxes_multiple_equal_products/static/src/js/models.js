odoo.define('pos_fix_taxes_multiple_equal_products.models', function (require) {
    "use strict";

    var models = require('point_of_sale.models');

    var _super_pos_model = models.Orderline.prototype;
    models.Orderline = models.Orderline.extend({


    _compute_all: function(tax, base_amount, quantity) {
        if (tax.amount_type === 'fixed') {
            var sign_base_amount = Math.sign(base_amount) || 1;
            // Since base amount has been computed with quantity
            // we take the abs of quantity
            // Same logic as bb72dea98de4dae8f59e397f232a0636411d37ce
            return tax.amount * sign_base_amount * Math.abs(quantity);
        }
        if ((tax.amount_type === 'percent' && !tax.price_include) || (tax.amount_type === 'division' && tax.price_include)){
            return base_amount * tax.amount / 100;
        }
        if (tax.amount_type === 'percent' && tax.price_include){
            return base_amount - (base_amount / (1 + tax.amount / 100));
        }
        if (tax.amount_type === 'division' && !tax.price_include) {
            return base_amount / (1 - tax.amount / 100) - base_amount;
        }
        return false;
    },
    compute_all: function(taxes, price_unit, quantity, currency_rounding, no_map_tax) {
        var self = this;
        var list_taxes = [];
        var currency_rounding_bak = currency_rounding;
        if (this.pos.company.tax_calculation_rounding_method == "round_globally"){
        currency_rounding = currency_rounding * 0.00001;
        }
        var total_excluded = round_pr(price_unit * quantity, currency_rounding);
        var total_included = total_excluded;
        var base = total_excluded;
        _(taxes).each(function(tax) {
            if (!no_map_tax){
                tax = self._map_tax_fiscal_position(tax);
            }
            if (!tax){
                return;
            }
            if (tax.amount_type === 'group'){
                var ret = self.compute_all(tax.children_tax_ids, price_unit, quantity, currency_rounding);
                total_excluded = ret.total_excluded;
                base = ret.total_excluded;
                total_included = ret.total_included;
                list_taxes = list_taxes.concat(ret.taxes);
            }
            else {
                var tax_amount = self._compute_all(tax, base, quantity);
                tax_amount = round_pr(tax_amount, currency_rounding);

                if (tax_amount){
                    if (tax.price_include) {
                        total_excluded -= tax_amount;
                        base -= tax_amount;
                    }
                    else {
                        total_included += tax_amount;
                    }
                    if (tax.include_base_amount) {
                        base += tax_amount;
                    }
                    var data = {
                        id: tax.id,
                        amount: tax_amount,
                        name: tax.name,
                    };
                    list_taxes.push(data);
                }
            }
        });
        return {
            taxes: list_taxes,
            total_excluded: round_pr(total_excluded, currency_rounding_bak),
            total_included: round_pr(total_included, currency_rounding_bak)
        };
    }
    });

});