define([
    'intern!object',
    'intern/chai!assert',
    'dojo/dom-construct',
    'dojo/_base/window',
    'esri/map',
    'gis/dijit/Print'
], function(registerSuite, assert, domConstruct, win, Map, Print) {
    registerSuite({
        name: 'Print Widget',
        // before the suite starts
        setup: function() {
            // load claro & esri css, create a map div in the body, and create the map object and print widget for our tests
            domConstruct.place('<link rel="stylesheet" type="text/css" href="//js.arcgis.com/3.6/js/dojo/dijit/themes/claro/claro.css">', win.doc.getElementsByTagName("head")[0], 'last');
            domConstruct.place('<link rel="stylesheet" type="text/css" href="//js.arcgis.com/3.6/js/esri/css/esri.css">', win.doc.getElementsByTagName("head")[0], 'last');
            domConstruct.place('<div id="map" style="width:300px;height:200px;" class="claro"></div>', win.body(), 'only');
            domConstruct.place('<div id="print" style="width:300px;" class="claro"></div>', win.body(), 'last');

            map = new Map("map", {
                basemap: "topo",
                center: [-122.45, 37.75],
                zoom: 13,
                sliderStyle: "small"
            });

            printWidget = new Print({
                map: map,
                printTaskURL: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
                authorText: "Me",
                copyrightText: "Copyright",
                defaultTitle: 'Map',
                defaultFormat: 'PDF',
                defaultLayout: 'Letter ANSI A Landscape'
            }, domConstruct.create("div")).placeAt('print');
            printWidget.startup();
        },

        // before each test executes
        beforeEach: function() {
            // do nothing
        },

        // after the suite is done (all tests), clean up globals
        teardown: function() {
            map.destroy();
            printWidget.destroy();
            delete window.map;
            delete window.printWidget;
        },

        // the tests, each function is a test
        'Test Print': function() {
            // let the test output console reporter know we are waiting for stuff to load
            console.log('Waiting for dependencies and GP to finish...');

            // make this test async by calling this.async() and getting a handle to the defred, prints take longer so set timeout to 10 sec.
            var dfd = this.async(10000);

            // define callback for map on load with our tests
            var ready = function(evt) {
                // call the print method which returns a defered, then wrap this tests defered around our tests.
                printWidget.print().fileHandle.then(function(data) {
                    var re = /^http/i;
                    if (data.url) {
                        console.log('data.url: ', data.url);
                    }
                    // this example shows how to use the dfd object directly rather than using dfd.callback()
                    try {
                        assert.strictEqual(re.test(data.url), true, 'data.url points to the result file, make sure it starts with http.');
                        dfd.resolve();
                    } catch (e) {
                        dfd.reject(e);
                    }
                });
            };

            // our dependency counter
            var count = 0;
            var readyWatch = function(evt) {
                count++;
                if (count === 2) { //number of deps
                    ready();
                }
            };

            // assign each dependency to call our ready watcher when loaded
            map.on('load', readyWatch);
            printWidget.on('load', readyWatch);
        }
    });
});