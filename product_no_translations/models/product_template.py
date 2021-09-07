from odoo import models, fields, api

class ProductTemplate(models.Model):
    _inherit = "product.template"

    name = fields.Char('Name', index=True, required=True, translate=False)
    description = fields.Text('Description', translate=False)
