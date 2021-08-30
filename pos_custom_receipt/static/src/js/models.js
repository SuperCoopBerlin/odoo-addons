odoo.define('pos_custom_receipt.models', function (require) {
    "use strict";

    var models = require('point_of_sale.models');

    var _super_pos_model = models.PosModel.prototype;
    models.PosModel = models.PosModel.extend({
        initialize: function (session, attributes) {
            var company_model = _.find(this.models, function(model){ return model.model === 'res.company'; });
            company_model.fields.push('street');
            company_model.fields.push('street2');
            company_model.fields.push('city');
            company_model.fields.push('zip');
            company_model.fields.push('state');
            company_model.fields.push('country');
            return _super_pos_model.initialize.apply(this, arguments);
        },
    });


    var _super_order = models.Order.prototype;
    models.Order = models.Order.extend({
        export_for_printing: function() {
            var receipt = _super_order.export_for_printing.call(this);
            receipt.company['street'] = this.pos.company.street
            receipt.company['street2'] = this.pos.company.street2
            receipt.company['city'] = this.pos.company.city
            receipt.company['zip'] = this.pos.company.zip
            receipt.company['state'] = this.pos.company.state
            receipt.company['country'] = this.pos.company.country
            return receipt;
        },
    });

});
