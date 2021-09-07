# 2021-Today Supercoop Berlin (https://www.supercoop.de)
# @author: Thilo Krachenfels
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
# Extended version of pos_warning_exiting from GRAP (http://www.grap.coop)
#   Initial author: Sylvain LE GAL (https://twitter.com/legalsylvain)

{
    "name": "Point Of Sale - Trigger end_of_day on PoS exiting",
    "summary": "Add option at exiting the PoS front office UI"
    " to trigger end_of_day on payment terminal",
    "version": "12.0.1.0.1",
    "category": "Point Of Sale",
    "author": "Supercoop Berlin",
    "website": "https://www.supercoop.de",
    "license": "AGPL-3",
    "depends": [
        "point_of_sale",
        "pos_payment_terminal",
        "pos_payment_terminal_return"
    ],
    "data": [
        "views/templates.xml",
    ],
    "images": [
        "static/description/pos_warning_connection_lost.png",
        "static/description/pos_warning_unpaid_draft_orders.png",
    ],
    "installable": True,
}
