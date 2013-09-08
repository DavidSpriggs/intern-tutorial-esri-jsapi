define([
    'intern!object',
    'intern/chai!assert',
    'esri/geometry/Extent',
    'esri/SpatialReference',
    'esri/geometry/Point'
], function(registerSuite, assert, Extent, SpatialReference, Point) {
    registerSuite({
        name: 'Extent operations',
        // before the suite starts
        setup: function() {
            // creat some objects for our tests
            largeExtent = new Extent(10, 10, 100, 100, new SpatialReference({
                wkid: 4326
            }));
            smallExtent = new Extent(20, 10, 80, 80, new SpatialReference({
                wkid: 4326
            }));
            point = new Point(20, 20);
        },

        // before each test executes
        beforeEach: function() {
            // do noting
        },

        // after the suite is done (all tests)
        teardown: function() {
            delete window.largeExtent;
            delete window.smallExtent;
            delete window.point;
        },

        // The tests, each function is a test
        'Extent contains point': function() {
            assert.isTrue(largeExtent.contains(point), 'A Point is inside the extent');
        },

        'Extent contains extent': function() {
            assert.isTrue(largeExtent.contains(smallExtent), 'Smaller extent is inside the larger extent');
        }
    });
});