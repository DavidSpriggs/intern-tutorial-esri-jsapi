module.exports = function(grunt) {
    grunt.initConfig({
        intern: {
            dev: {
                options: {
                    runType: 'runner',
                    config: 'tests/intern'
                }
            }
        },
        esri_slurp: {
			options: {
                version: '3.13'
            },
            dev: {
                options: {
                    beautify: true
                },
                dest: 'esri'
            }
        },
        watch: {
            all: {
                options: { livereload: true },
                files: ['app/*.js', 'gis/**/*.js', 'gis/**/**/*.js']
            }
        }
    });

    // Loading using a local copy
    grunt.loadNpmTasks('intern');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-esri-slurp');

    // download Esri JSAPI
    grunt.registerTask('slurp', ['esri_slurp']);

    // Register a test task
    grunt.registerTask('test', ['intern']);

    // By default we just test
    grunt.registerTask('default', ['test']);
};
