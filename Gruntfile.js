module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 9000,
                    keepalive: true
                }
            }
        }
    });
    
    grunt.registerTask('default', ['connect']);

};