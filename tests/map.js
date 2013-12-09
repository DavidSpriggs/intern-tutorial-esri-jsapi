define([
    'intern!object',
    'intern/chai!assert',
    'esri/map',
    'dojo/dom-construct',
    'dojo/_base/window'
], function(registerSuite, assert, Map, domConstruct, win) {
    // local vars scoped to this module
    var map;

    registerSuite({
        name: 'Map zoom',
        // before the suite starts
        setup: function() {
            // create a map div in the body, load esri css, and create the map for our tests
            domConstruct.place('<link rel="stylesheet" type="text/css" href="//js.arcgis.com/3.7/js/dojo/dijit/themes/claro/claro.css">', win.doc.getElementsByTagName("head")[0], 'last');
            domConstruct.place('<link rel="stylesheet" type="text/css" href="//js.arcgis.com/3.7/js/esri/css/esri.css">', win.doc.getElementsByTagName("head")[0], 'last');
            domConstruct.place('<div id="map" style="width:300px;height:200px;" class="claro"></div>', win.body(), 'only');

            map = new Map("map", {
                basemap: "topo",
                center: [-122.45, 37.75],
                zoom: 13,
                sliderStyle: "small"
            });
        },

        // before each test executes
        beforeEach: function() {
            // do nothing
        },

        // after the suite is done (all tests)
        teardown: function() {
            map.destroy();
        },

        // the tests, each function is a test
        'Test zoom constructor': function() {
            // make this test async by calling this.async() and getting a handle to the defred
            var dfd = this.async(5000);

            // define callback for on load with our tests
            var mapReady = function(/*evt*/) {
                assert.strictEqual(map.getZoom(), 13, 'map.getZoom() should return 13 as defined in map constructor');
            };

            // assign callback to the maps on load, wraping it in this tests async deferd
            map.on('load', dfd.callback(mapReady));
        },

        'Test map zooming': function() {
            // make this test async by calling this.async() and getting a handle to the defred
            var dfd = this.async(5000);

            // do the async action on the map, wrapping it in this tests async defered
            map.setZoom(14).then(dfd.callback(function() {
                assert.strictEqual(map.getZoom(), 14, 'map.getZoom() should return 14 after setting level to 14');
            }), dfd.reject.bind(dfd));
        },

        'Test map zooming (Promises/A)': function() {
            // do the async action on the map, returning a promise
            return map.setZoom(14).then(function() {
                assert.strictEqual(map.getZoom(), 14, 'map.getZoom() should return 14 after setting level to 14');
            });
        }

    });
});