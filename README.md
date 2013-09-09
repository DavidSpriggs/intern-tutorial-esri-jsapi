# intern-tutorial-esri-jsapi

This is a tutorial on using intern to unit/functional test your esri JavaScript API apps.

First off big props to Colin Snover over at sitepen for the intern-tutorial found [here](https://github.com/theintern/intern-tutorial). Colins tutorial was my starting point and helped me get the feel for writing the tests themselves. I highly recomend you read his tutorial as well.

For a fast start, running my example tests, follow these steps:

### Step 1:
* clone or download this repo.
* We are going to run our tests with a 'head' (browser) so move or copy the tutorial to a web accessable folder. We will be using the browser test runner so intern needs to be server via a web server to avoid any cross domain errors.
* If you dont have node installed, [install](http://nodejs.org/) it.

### Step 2:
* install intern-geezer in the root of the project:

```bash
cd <path to the tutorial>
npm install intern-geezer
```

* thats it! your done!

### Step 3:
* Lets run the tests in the tutorial, open a browser and point it here:

```bash
http://<path to the tutorial>/intern-tutorial-esri-jsapi/node_modules/intern-geezer/client.html?config=tests/intern
```
* you will need to have your console open as this is where the output from intern tests are displayed.

## Important notes:

The key to making intern work with the eari jsapi is two fold:

1. You have to use intern-geezer due to a [bug](https://bugs.dojotoolkit.org/ticket/15616) in dojo 1.8.3 and below. The esri js api 3.6 is based on dojo 1.8.3. If your looking to support old IE (8 and below) you need to use intern-geezer anyway.

2. Defining the intern loader to work with the esri jsapi. Intern uses a local copy of dojo core as such you need to define where to find the esri jsapi in your intern config file:

```javascript
loader: {
        // Packages that should be registered with the loader in each testing environment
		packages: [{
			name: 'app',
			location: 'app'
		}, {
			name: 'gis',
			location: 'gis'
		}, {
			name: 'esri',
			location: 'http://js.arcgis.com/3.6/js/esri'
		}, {
			name: 'dojo',
			location: 'http://js.arcgis.com/3.6/js/dojo/dojo'
		}, {
			name: 'dojox',
			location: 'http://js.arcgis.com/3.6/js/dojo/dojox'
		}, {
			name: 'dijit',
			location: 'http://js.arcgis.com/3.6/js/dojo/dijit'
		}]
	}
```

You also need to add the locations to your custome modules you want to test. In the above example 'app' and 'gis.' is where we have some modules/app to test.