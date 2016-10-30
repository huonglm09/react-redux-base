'use strict';
$(function () {
    var fc = {
        url: $(document.body).data('base'),
        path: $(document.body).data('path'),
        init: function (options) {
            return this.each(function () {
                this.self = $(this);
                this.opt = $.extend(true, {}, $.fn.orderMap.defaults, options);

                fc.refresh.call(this);
            });
        },
        refresh: function () {
            var self = this;

            fc.elements.call(self);
            fc.initMap.call(self);
            fc.initBtnFind.call(self);
        },
        elements: function () {
            var self = this;

            self.elements = {
                root: '#wrapper',
                form: '[detect="form"]',
                coverMap: '.cover-order-map',
                btnFind: '[detect="find-shiper"]'
            };

            self.maps = {
                map: null,
                bounds: null,
                markers: [],
                enableZoomChanged: true,
                directionsService: null,
                directionsDisplay: null,
            };

            self.type = {
                places: 'places',
                marker: 'marker'
            };
        },
        initBtnFind: function () {
            var self = this;

            var btn = self.elements.btnFind;

            fc.action('click', btn, function () {
                var params = $(this).data('params');
                var url = $(this).data('url');

                fc.delay(function () {
                    fc.ajax(url, 'post', params, function (rs) {
                        if (rs.status) {
                            var latLng = $.parseJSON(rs.data.lat_long);
                            fc.makeMarker.call(self, {shiper: latLng});
                        }
                    });
                }, 300);

            });
        },
        initMap: function (options) {
            var self = this;

            var wrapper = self.elements.coverMap;

            if ($(wrapper).length) {
                if (options === null || typeof options === "undefined") {
                    var options = {
                        center: new google.maps.LatLng(21.0227358, 105.8194541),
                        zoom: 8,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                }

                self.maps.map = new google.maps.Map($(wrapper).get(0), options);
                self.maps.geocoder = new google.maps.Geocoder();
                self.maps.bounds = new google.maps.LatLngBounds();
                self.maps.directionsService = new google.maps.DirectionsService();
                self.maps.directionsDisplay = new google.maps.DirectionsRenderer();

                fc.makeMarker.call(self, {start: $(wrapper).data('sender-location'), end: $(wrapper).data('receiver-location'), shiper: $(wrapper).data('shiper-location')});
                fc.directions.call(self);
            }
        },
        makeMarker: function (locations) {
            var self = this;

            if (locations !== null && typeof locations !== 'undefined') {
                $.each(locations, function (key, location) {
                    if (location && location.lat && location.lng) {
                        var icon = location.icon;
                        location = new google.maps.LatLng(location.lat, location.lng);
                        if (!self.maps.markers[key]) {
                            self.maps.markers[key] = new google.maps.Marker({
                                position: location,
                                map: self.maps.map
                            });
                        }

                        if (self.maps.markers[key]) {
                            self.maps.markers[key].setPosition(location);
                        }

                        self.maps.bounds.extend(location);
                        
                        if (icon !== null && typeof icon !== 'undefined') {
                            self.maps.markers[key].setIcon(icon);
                        }
                    }
                });

                fc.fitBounds.call(self);
            }
        },
        directions: function () {
            var self = this;
            var start = self.maps.markers['start'];
            var end = self.maps.markers['end'];
            var shiper = !self.maps.markers['shiper'] ? null : self.maps.markers['shiper'];
            start.setMap(null);
            
            if (self.maps.directionsDisplay != null) {
                self.maps.directionsDisplay.setMap(null);
                self.maps.directionsDisplay = null;
            }
            
            if (self.maps.map !== null) {
                self.maps.directionsDisplay = new google.maps.DirectionsRenderer();
                self.maps.directionsDisplay.setMap(self.maps.map);

                if (shiper && end) {
                    self.maps.directionsService.route({
                        origin: shiper.position,
                        destination: end.position,
                        travelMode: google.maps.TravelMode.DRIVING
                    }, function (response, status) {
                        if (status === google.maps.DirectionsStatus.OK) {
                            end.setMap(null);
                            shiper.setMap(null);
                            self.maps.directionsDisplay.setDirections(response);
                            fc.delay(function () {
                                fc.fitBounds.call(self);
                            }, 0);
                            return;
                        }
                        
                        console.warn('Directions request failed due to ' + status);
                    });
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

    $.fn.orderMap = function (method) {
        if (fc[method]) {
            return fc[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return fc.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist!');
        }
    };

    $.fn.orderMap.defaults = {
        root: "#wrapper"
    };

    //----- INIT ORDER -----
    if ($('[init="order-map"]').length) {
        $('[init="order-map"]').each(function () {
            $(this).orderMap({
                root: "body"
            });
        });
    }
});
