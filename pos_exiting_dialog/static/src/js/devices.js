/*
2021-Today Supercoop Berlin (https://www.supercoop.de)
@author: Thilo Krachenfels
License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
*/

odoo.define('pos_exiting_dialog.devices', function (require) {
    "use strict";

    var devices = require('point_of_sale.devices');
    var utils = require('web.utils');
    var round_pr = utils.round_precision;

    devices.ProxyDevice.include({
        payment_terminal_turnover_totals: function(popup, print_receipt){
            popup.$('.button.confirm').css('display', 'none');
            this.message('payment_terminal_turnover_totals', {'print_receipt' : print_receipt}, { timeout: 240000 }).then(function (answer) {
                if (answer) {
                    var transaction_result = answer['result'];
                    if (transaction_result == true) {
                        // This means that the operation was a success
                            if ('turnover_totals_receipt' in answer) {
                                popup.$('.body').empty().append(_t("Operation successful, please confirm"))
                                popup.$('.button.confirm').css('display', 'block');
                            }
                    } else {
                        //Error
                    }
                } else {
                    //Error
                }
            });
        },

        payment_terminal_end_of_day: function(popup, print_receipt){
            popup.$('.button.confirm').css('display', 'none');
            this.message('payment_terminal_end_of_day', {'print_receipt' : print_receipt}, { timeout: 240000 }).then(function (answer) {
                if (answer) {
                    var transaction_result = answer['result'];
                    if (transaction_result == true) {
                        // This means that the operation was a success
                            if ('end_of_day_receipt' in answer) {
                                //TODO: Add to pos.session
                                popup.$('.body').empty().append(_t("Operation successful, please confirm"))
                                popup.$('.button.confirm').css('display', 'block');
                            }
                    } else {
                        //screen.transaction_error();
                    }
                } else {
                    //screen.transaction_error();
                }
            });
        },
    });
});