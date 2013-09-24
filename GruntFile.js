module.exports = function (grunt) {
    grunt.initConfig({
        intern: {
            dev: {
                options: {
                    runType: 'runner',
                    config: 'tests/intern'
                }
            }
        }
    });

    grunt.loadNpmTasks('intern-geezer');
};