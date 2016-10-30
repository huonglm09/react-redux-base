'use strict';
$(function () {
    var fc = {
        url: $(document.body).data('base'),
        path: $(document.body).data('path'),
        init: function (options) {
            return this.each(function () {
                this.self = $(this);
                this.opt = $.extend(true, {}, $.fn.shipOrder.defaults, options);

                fc.refresh.call(this);
            });
        },
        refresh: function () {
            var self = this;

            fc.elements.call(self);
            fc.initMap.call(self);
            fc.initInputPlaces.call(self);
            fc.eventInputPrice.call(self);
        },
        elements: function () {
            var self = this;

            self.elements = {
                root: '#wrapper',
                form: '[detect="form"]',
                price: 'price',
                distance: 'distance',
                coverMap: '.cover-order-map',
                inputPlace: '[init="input-place"]',
                placeCover: '[place="cover"]',
                inputLat: '[place="lat"]',
                inputLng: '[place="lng"]',
                inputCal: '[detect="cal-price"]',
                inputDistance: '[fill-value="distance"]'
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
                search: 'search',
                marker: 'marker'
            };
        },
        eventInputPrice: function () {
            var self = this;
            var form = self.elements.form;
            var price = self.elements.price;
            var distance = self.elements.distance;
            var inputCal = self.elements.inputCal;

            if ($(inputCal).length) {
                fc.action('change , dp.change', inputCal, function () {
                    var data = fc.getDataPrice.call(self);
                    var url = $(form).data('url-price');
                    fc.delay(function () {
                        fc.ajax(url, 'post', data, function (rs) {
                            $(price).text(rs.data.price);
                            $(distance).text(rs.request.distance);
                        });
                    }, 300);
                });
            }
        },
        getDataPrice: function () {
            var self = this;
            var inputCal = self.elements.inputCal;
            var data = {};
            if ($(inputCal).length) {
                $(inputCal).each(function () {
                    var input = this;

                    var type = $(input).attr('type');
                    var key = $(input).data('name');
                    var value = $(input).val();

                    switch (type) {
                        case 'checkbox':
                            if ($(input).is(':checked')) {
                                data[key] = value;
                            }

                            break;
                        case 'radio':
                            if ($(input).is(':checked')) {
                                data[key] = value;
                            }

                            break;
                        default:
                            data[key] = value;
                            break;
                    }
                });
            }

            return data;
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

                google.maps.event.addListener(self.maps.map, 'click', function (event) {
                    fc.geocoder.call(self, self.type.marker, event.latLng);
                });

                fc.initMarkers.call(self, {start: $(wrapper).data('sender-location'), end: $(wrapper).data('receiver-location')});
                fc.directions.call(self);
            }
        },
        initMarkers: function (locations) {
            var self = this;

            if (locations !== null && typeof locations !== 'undefined') {
                $.each(locations, function (key, location) {

                    if (location) {
                        var icon = location.icon;
                        location = new google.maps.LatLng(location.lat, location.lng);
                        self.maps.markers[key] = new google.maps.Marker({
                            position: location,
                            map: self.maps.map
                        });

                        self.maps.bounds.extend(location);
                        self.maps.markers[key].setIcon(icon);
                    }
                });

                fc.fitBounds.call(self);
            }
        },
        initInputPlaces: function () {
            var self = this;
            var inputPlace = self.elements.inputPlace;

            if ($(inputPlace, self).length) {
                $(inputPlace, self).each(function () {
                    var input = this;
                    //======== on focus ========
                    $(input, self).on('focus', function () {
                        $(inputPlace, self).removeClass('active');
                        $(this).addClass('active');
                    });

                    //======== init search box ========
                    self.maps.places = new google.maps.places.SearchBox(input);
                    google.maps.event.addListener(self.maps.places, 'places_changed', function () {
                        fc.geocoder.call(self, self.type.places, $(input).val());
                    });

                    //======== on change ========
                    $(input, self).on('keyup', function (e) {
                        fc.delay(function () {
                            if (e.which !== 13) {
                                fc.geocoder.call(self, self.type.search, $(input).val());
                            }
                        }, 300);
                    });
                });
            }
        },
        geocoder: function (type, value) {
            var self = this;

            if (type !== null && typeof type !== 'undefined') {
                var config = {};
                var location = null;

                switch (type) {
                    case self.type.search:
                        config.address = value;
                        break;
                    case self.type.places:
                        config.address = value;
                        break;
                    case self.type.marker:
                        config.latLng = value;
                        location = value;
                        break;
                }

                self.maps.geocoder.geocode(config, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (type == self.type.places || type == self.type.search) {
                            location = results[0].geometry.location;
                            fc.makeMarker.call(self, location);
                        }

                        if (type == self.type.marker) {
                            fc.makeMarker.call(self, location, results[0].formatted_address);
                        }

                        fc.directions.call(self);
                        return;
                    }

                    fc.setLocation.call(self, null, null);
                    fc.directions.call(self);
                    console.warn('Địa chỉ không thể tìm được bạn hay chọn trên bản đồ');
//                    bootbox.alert('Địa chỉ không thể tìm được bạn hay chọn trên bản đồ');
                });
            }
        },
        setLocation: function (location, andress, callback) {
            var self = this;
            var inputDistance = self.elements.inputDistance;
            var inputPlace = self.elements.inputPlace;
            var placeCover = self.elements.placeCover;
            var inputLat = self.elements.inputLat;
            var inputLng = self.elements.inputLng;

            var inputActive = $(inputPlace + '.active', self);
            if (inputActive.length) {
                var cover = inputActive.closest(placeCover);
                var detect = inputActive.data('detect');

                if (callback !== null && typeof callback !== 'undefined') {
                    callback(detect);
                }

                if (andress !== null && typeof andress !== 'undefined') {
                    inputActive.val(andress);
                }


                if (cover.length) {
                    if (location !== null && typeof location !== 'undefined') {
                        $(inputLat, cover).val(location.lat());
                        $(inputLng, cover).val(location.lng());
                    }

                    if ((location == null || typeof location == 'undefined') && self.maps.markers[detect]) {
                        console.log($(inputDistance));
                        $(inputDistance).val(0).change();
                        $(inputLat, cover).val('');
                        $(inputLng, cover).val('');
                        self.maps.markers[detect].setMap(null);
                        self.maps.markers[detect] = null;
                        
                        if(detect == 'start' && self.maps.markers['end']){
                            self.maps.markers['end'].setMap(self.maps.map);
                        }
                        
                        if(detect == 'end' && self.maps.markers['start']){
                            self.maps.markers['start'].setMap(self.maps.map);
                        }
                    }
                }
            }
        },
        makeMarker: function (location, andress) {
            var self = this;

            fc.setLocation.call(self, location, andress, function (detect) {
                if (self.maps.markers[detect] == null || typeof self.maps.markers[detect] == 'undefined') {
                    self.maps.markers[detect] = new google.maps.Marker({
                        position: location,
                        map: self.maps.map
                    });

                    self.maps.bounds.extend(self.maps.markers[detect].position);
                }

                if (self.maps.markers[detect]) {
                    self.maps.markers[detect].setMap(self.maps.map);
                    self.maps.markers[detect].setPosition(location);

                    if (!(self.maps.markers['start'] && self.maps.markers['end'])) {
                        self.maps.bounds = new google.maps.LatLngBounds();
                    }

                    self.maps.bounds.extend(self.maps.markers[detect].position);
                }

                fc.fitBounds.call(self);
            });
        },
        directions: function () {
            var self = this;
            var inputDistance = self.elements.inputDistance;
            var start = self.maps.markers['start'];
            var end = self.maps.markers['end'];



            if (self.maps.directionsDisplay != null) {
                self.maps.directionsDisplay.setMap(null);
                self.maps.directionsDisplay = null;
            }

            if (self.maps.map !== null) {
                self.maps.directionsDisplay = new google.maps.DirectionsRenderer();
                self.maps.directionsDisplay.setMap(self.maps.map);

                if (start && end) {
                    self.maps.directionsService.route({
                        origin: start.position,
                        destination: end.position,
                        travelMode: google.maps.TravelMode.DRIVING
                    }, function (response, status) {
                        if (status === google.maps.DirectionsStatus.OK) {
                            start.setMap(null);
                            end.setMap(null);
                            self.maps.directionsDisplay.setDirections(response);

                            if ($(inputDistance).length) {
                                var distance = response.routes[0].legs[0].distance.value / 1000;
                                distance = distance.toFixed(2);

                                $(inputDistance).val(distance).change();
                            }
                        }
                    });
                }
            }
        },
        fitBounds: function (bounds) {
            var self = this;
            var start = self.maps.markers['start'];
            var end = self.maps.markers['end'];

            if (bounds !== null && typeof bounds !== 'undefined') {
                self.maps.map.fitBounds(bounds);
                return;
            }

            if (start && end) {
                self.maps.bounds = new google.maps.LatLngBounds();
                self.maps.bounds.extend(start.position);
                self.maps.bounds.extend(end.position);
                self.maps.map.fitBounds(self.maps.bounds);
                return;
            }


            if (start || end) {
                
                if (start) {
                    self.maps.map.panTo(start.position);
                }

                if (end) {
                    self.maps.map.panTo(end.position);
                }
                
                self.maps.map.setZoom(8);
            }
        },
        loadding: function () {
            var self = this;
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

    $.fn.shipOrder = function (method) {
        if (fc[method]) {
            return fc[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return fc.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist!');
        }
    };

    $.fn.shipOrder.defaults = {
        root: "#wrapper"
    };

    //----- INIT ORDER -----
    if ($('[ship="root-order"]').length) {
        $('[ship="root-order"]').each(function () {
            $(this).shipOrder({
                root: "body"
            });
        });
    }
    
    if($("[init='datetime']")) {
        $("[init='datetime']").datetimepicker({
            viewMode: 'years',
            format: 'YYYY-MM-DD',
            locale: 'vi'
        });
    }    
});
