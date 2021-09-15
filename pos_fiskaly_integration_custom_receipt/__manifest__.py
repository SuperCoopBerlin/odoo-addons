# Copyright 2021-SuperCoop Berlin eG (<http://supercoop.de>)
# - Thilo Krachenfels - <11920747+lichttag@users.noreply.github.com>
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl.html).
{
    "name": "POS Fiskaly Integration Custom Receipt (SuperCoop)",
    "version": "12.0.1.0.0",
    "depends": ["point_of_sale"],
    "author": "SuperCoop Berlin eG",
    "category": "Point Of Sale",
    "website": "https://supercoop.de",
    "license": "AGPL-3",
    "summary": """
        Adapt point of sale receipt
    """,
    "depends": ["pos_fiskaly_integration"],
    "data": [],
    "qweb": ["static/src/xml/receipt.xml"],
    "installable": True,
}
