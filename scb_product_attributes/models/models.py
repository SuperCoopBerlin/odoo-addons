from odoo import models, fields, api

class SCBProductTemplate(models.Model):
    _inherit = "product.template"

    product_importer_script_behavior = fields.Selection(
            string="Product Importer",
            selection=[
                # In case we want more levels in the future
                ('enabled', "Enabled"),
                ('disabled', "Disabled"),
                ],
            default='enabled')

    shelf_location_sale = fields.Char(string="Sale shelf")
    shelf_location_storage = fields.Char(string="Storage shelf")

# class scb_product_attributes(models.Model):
#     _name = 'scb_product_attributes.scb_product_attributes'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         self.value2 = float(self.value) / 100
