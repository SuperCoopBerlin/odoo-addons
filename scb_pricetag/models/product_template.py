from decimal import Decimal

from odoo import models, fields, api
from odoo.addons import decimal_precision as dp


class ProductTemplate(models.Model):
    _inherit = "product.template"

    pricetag_base_price_display = fields.Char('Pricetag base price display', compute='_compute_pricetag_base_price_display')
    pricetag_sale_price = fields.Float('Pricetag sale price', compute='_compute_pricetag_sale_price', digits=dp.get_precision('Product Price'))

    @api.depends('base_price_unit', 'base_price_factor', 'pricetag_sale_price')
    def _compute_pricetag_base_price_display(self):
        for p in self:
            base_lst_price = Decimal(p.pricetag_sale_price) * Decimal(p.base_price_factor)
            # TODO(Leon Handreke): Use currency_id here
            p.pricetag_base_price_display = '%s€/%s' % (base_lst_price.quantize(Decimal("1.000")), p.base_price_unit)

    @api.depends('website_price')
    def _compute_pricetag_sale_price(self):
        for p in self:
            p.pricetag_sale_price = p.with_context({'website_id': 1}).website_price


