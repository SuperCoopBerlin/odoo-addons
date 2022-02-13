from odoo import models, fields, api

class ProductTemplate(models.Model):
    _inherit = "product.template"

    deposit_product_id = fields.Many2one(
            'product.product',
            string="Deposit Product",
            help="Products to automatically add to the sale")
