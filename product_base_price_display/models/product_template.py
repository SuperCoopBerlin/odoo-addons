from decimal import Decimal

from odoo import models, fields, api

class ProductTemplate(models.Model):
    _inherit = "product.template"

    base_price_unit = fields.Char('Base price unit', required=False, translate=False)
    base_price_factor = fields.Float('Base price factor', required=False, digits=(10,3),
            help="Factor from the store unit to the base price unit, e.g. 2 if the store unit it 500g and the base price unit kg")
    base_price_display = fields.Char('Base price display', compute='_compute_base_price_display')

    @api.depends('base_price_unit', 'base_price_factor', 'lst_price')
    def _compute_base_price_display(self):
        for p in self:
            base_lst_price = Decimal(p.lst_price) * Decimal(p.base_price_factor)
            # TODO(Leon Handreke): Use currency_id here
            p.base_lst_price_display = '%s€/%s' % (base_lst_price.quantize(Decimal("1.000")), p.base_price_unit)
