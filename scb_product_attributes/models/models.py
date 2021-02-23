from odoo import models, fields, api

class SCBProduct(models.Model):
    _inherit = "product.template"

    organic_label = fields.Selection(
            string="Organic Label",
            selection=[
                ('eu_bio', "EU Bio"),
                ('trust', "Trust-based"),
                ('bioland', "Bioland"),
                ('naturland', "Naturland"),
                ('demeter', "Demeter"),
                ])
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
