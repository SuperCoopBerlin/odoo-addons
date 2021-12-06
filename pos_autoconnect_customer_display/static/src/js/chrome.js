odoo.define('pos_autoconnect_customer_display.chrome', function (require) {
    "use strict";

    var chrome = require('point_of_sale.chrome');

    chrome.ClientScreenWidget = chrome.ClientScreenWidget.extend({

    status_loop: function() {
        var self = this;
        function loop() {
            if (self.pos.proxy.posbox_supports_display) {
                var deffered = self.pos.proxy.test_ownership_of_client_screen();
                if (deffered) {
                    deffered.then(
                        function(data) {
                            if (typeof data === 'string') {
                                data = JSON.parse(data);
                            }
                            if (data.status === 'OWNER') {
                                self.change_status_display('success');
                            } else {
                                //Now owner -> Try to take ownership
                                self.pos.render_html_for_customer_facing_display().then(function(rendered_html) {
                                    self.pos.proxy.take_ownership_over_client_screen(rendered_html).then(

                                    function(data) {
                                        if (typeof data === 'string') {
                                            data = JSON.parse(data);
                                        }
                                        if (data.status === 'success') {
                                           self.change_status_display('success');
                                        } else {
                                           self.change_status_display('warning');
                                        }
                                        if (!self.pos.proxy.posbox_supports_display) {
                                            self.pos.proxy.posbox_supports_display = true;
                                            self.status_loop();
                                        }
                                    },

                                    function(err) {
                                        if (typeof err == "undefined") {
                                            self.change_status_display('failure');
                                        } else {
                                            self.change_status_display('not_found');
                                        }
                                    });
                                });
                            }
                        },

                        function(err) {
                            if (typeof err == "undefined") {
                                self.change_status_display('failure');
                            } else {
                                self.change_status_display('not_found');
                                self.pos.proxy.posbox_supports_display = false;
                            }
                        })

                    .always(function () {
                        setTimeout(loop,3000);
                    });
                }
            }
        }
        loop();
    },

    });

});