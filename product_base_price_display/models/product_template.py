from odoo import models, fields, api

class ProductTemplate(models.Model):
    _inherit = "product.template"

    base_price_unit = fields.Char('Base price unit', required=False, translate=False)
    base_price_factor = fields.Float('Base price factor', required=False, digits=(10,3),
            help="Factor from the store unit to the base price unit, e.g. 2 if the store unit it 500g and the base price unit kg")

    base_lst_price_display = fields.Char(compute='_compute_lst_base_price_display')

    @api.depends('base_price_unit', 'base_price_factor', 'lst_price')
    def _compute_lst_base_price_display(self):
        for p in self:
            base_lst_price = p.lst_price * p.base_price_factor
            # TODO(Leon Handreke): Use currency_id here
            p.base_lst_price_display = '%s€/%s' % (base_lst_price, p.base_price_unit)


