define([
    'intern!object',
    'intern/chai!assert',
    'app/hello'
], function(registerSuite, assert, hello) {
    registerSuite({
        name: 'Simple module test',
        'Test greet function': function() {
            assert.strictEqual(hello.greet('Murray'), 'Hello, Murray!', 'hello.greet should return a greeting for the person named in the first argument');
            assert.strictEqual(hello.greet(), 'Hello, world!', 'hello.greet with no arguments should return a greeting to "world"');
        }
    });
});