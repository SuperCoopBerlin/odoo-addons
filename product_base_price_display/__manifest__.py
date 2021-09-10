# Copyright 2021-SuperCoop Berlin eG (<http://supercoop.de>)
# - Leon Handreke <leonh@ndreke.de>
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl.html).
{
    "name": "Product base price display",
    "version": "12.0.1.0.0",
    "depends": ["product"],
    "author": "SuperCoop Berlin eG",
    "website": "https://supercoop.de",
    "license": "AGPL-3",
    "summary": """
        Allow computing a base price (Grundpreis) for products for display on pricetags as required by German law.
    """,
    "data": [
        "views/view_product_template.xml",
    ],
    "installable": True,
}
