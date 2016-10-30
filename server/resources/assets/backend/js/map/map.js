'use strict';
$(function () {
    var fc = {
        url: $(document.body).data('base'),
        path: $(document.body).data('path'),
        init: function (options) {
            return this.each(function () {
                this.self = $(this);
                this.opt = $.extend(true, {}, $.fn.shipMap.defaults, options);

                fc.refresh.call(this);
            });
        },
        refresh: function () {
            var self = this;

            fc.elements.call(self);
            fc.initMap.call(self);
            fc.makeMarkerMap.call(self);
        },
        elements: function () {
            var self = this;

            self.elements = {
                root: '#wrapper',
                form: '[detect="form"]',
                coverMap: '.ship-order-map'
            };

            self.maps = {
                map: null,
                bounds: null,
                markers: [],
                infowindow: null,
                enableZoomChanged: true,
                directionsService: null,
                directionsDisplay: null
            };

            self.type = {
                ships: 'ships',
                orders: 'orders'
            };
        },
        initMap: function (options) {
            var self = this;

            var root = self.elements.coverMap;
            var wrapper = self.elements.coverMap;

            if ($(wrapper).length) {
                if (options === null || typeof options === "undefined") {
                    var options = {
                        center: new google.maps.LatLng(21.0227358, 105.8194541),
                        zoom: 8,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                }

                $(wrapper).height(($('body').height() - 200));
                self.maps.map = new google.maps.Map($(wrapper).get(0), options);
                self.maps.infowindow = new google.maps.InfoWindow();
                self.maps.geocoder = new google.maps.Geocoder();
                self.maps.bounds = new google.maps.LatLngBounds();
                self.maps.directionsService = new google.maps.DirectionsService();
                self.maps.directionsDisplay = new google.maps.DirectionsRenderer();
                
                google.maps.event.addListener(self.maps.map, "idle", function(){
                    google.maps.event.trigger(self.maps.map, "resize");
                });
            }
        },
        makeMarkerMap: function () {
            var self = this;

            var wrapper = self.elements.coverMap;

            if (self.maps.map !== null) {
                var url = $(wrapper).data('url-map');
                fc.ajax(url, 'post', {}, function (rs) {
                    if (rs.status) {
                        var data = rs.data;

                        if (data != null && typeof data['orders'] !== 'undefined') {
                            var infowindow = new google.maps.InfoWindow();
                            
                            if (data['orders'] != null && typeof data['orders'] !== 'undefined') {
                                $.each(data['orders'], function (key, order) {
                                    fc.makeMarker.call(self, self.type.orders, key, order);
                                });
                            }

                            if (data['ships'] != null && typeof data['ships'] !== 'undefined') {
                                $.each(data['ships'], function (key, ship) {
                                    fc.makeMarker.call(self, self.type.ships, key, ship);
                                });
                            }
                        }
                    }
                });
            }
        },
        makeMarker: function (type, key, locations) {
            var self = this;
            
            if (locations !== null && typeof locations !== 'undefined') {
                
                if (locations.lat && locations.lng) {
                    var location = new google.maps.LatLng(locations.lat, locations.lng);

                    if (!self.maps.markers[type]) {
                        self.maps.markers[type] = [];
                    }

                    if (!self.maps.markers[type][key]) {
                        self.maps.markers[type][key] = new google.maps.Marker({
                            position: location,
                            map: self.maps.map
                        });
                    }

                    if (self.maps.markers[type][key]) {
                        self.maps.markers[type][key].setPosition(location);
                    }

                    self.maps.bounds.extend(location);
                    
                    var html = locations.infowindown;
                    google.maps.event.addListener(self.maps.markers[type][key], 'click', (function (marker, html) {
                        return function () {
                            self.maps.infowindow.setContent(html);
                            self.maps.infowindow.open(self.maps.map, marker);
                        };
                    })(self.maps.markers[type][key], html));

                    if (locations.icon !== null && typeof locations.icon !== 'undefined') {
                        self.maps.markers[type][key].setIcon(locations.icon);
                    }

                    self.maps.map.fitBounds(self.maps.bounds);
                }
            }
        },
        fitBounds: function (bounds) {
            var self = this;

            if (bounds !== null && typeof bounds !== 'undefined') {
                self.maps.map.fitBounds(bounds);
                return;
            }

            if (self.maps.bounds) {
                self.maps.map.fitBounds(self.maps.bounds);
            }
        },
        action: function (event, obj, callback) {
            $(document).off(event, obj);

            $(document).on(event, obj, function (e) {
                callback.call(this, e);
            });
        },
        delay: (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })(),
        ajax: function (url, type, data, response) {
            $.ajax({
                url: url,
                type: type,
                dataType: "json",
                data: data,
                async: false,
                success: function (rs)
                {
                    response(rs);
                }
            });
        }
    };

    $.fn.shipMap = function (method) {
        if (fc[method]) {
            return fc[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return fc.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist!');
        }
    };

    $.fn.shipMap.defaults = {
        root: "#wrapper"
    };

    //----- INIT SHIP MAP -----
    if ($('[init="ship-map"]').length) {
        $('[init="ship-map"]').each(function () {
            $(this).shipMap({
                root: "body"
            });
        });
    }
});
