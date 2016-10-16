module.exports = function(grunt) {

  // Project configuration.
  // grunt.initConfig({
    // pkg: grunt.file.readJSON('package.json'),
    // uglify: {
    //   build: {
    //     src: 'src/<%= pkg.name %>.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // }
  //   jshint: {
  //       options: {
  //         curly: true,
  //         eqeqeq: true,
  //         eqnull: true,
  //         browser: true,
  //         globals: {
  //           jQuery: true
  //         },
  //       }
  //   }
  // });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.config('jshint', {
  //   options: {
  //       jshintrc: true
  //   },
  //   gruntfile: {
  //       src: ['Gruntfile.js']
  //   },
  // });

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
  // Default task(s).
    grunt.registerTask('default', ['connect']);

};