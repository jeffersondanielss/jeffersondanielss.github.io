module.exports = function( grunt ) {

  "use strict";

  grunt.initConfig({
    uglify: {
      options: {
        mangle: true
      },
      my_target: {
        files: {
          'src/zipcode.min.js': ['zipcode.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);
}

module.exports = function( grunt ) {

  "use strict";

  grunt.initConfig({

    uglify: {
      options: {
        mangle: true
      },
      main: {
        files: {
          'assets/scripts/main.min.js': [
            'assets/scripts/app.js',
            'assets/scripts/disqus.js',
            'assets/scripts/smoth-scroll.js',
            'assets/scripts/toggleClass.js',
            'assets/scripts/menu.js'
          ]
        }
      },

      vendor: {
        files: {
          'assets/scripts/vendor.min.js': [
            'assets/scripts/vendor/jquery.js',
            'assets/scripts/vendor/scroll.min.js',
            'assets/scripts/vendor/tweetMax.min.js',
            'assets/scripts/vendor/anchor.js',
            'assets/scripts/vendor/prism.js'
          ]
        }
      }
    },

    sass: {
      dist: {
        files: {
          'assets/css/main.css': '_sass/main.scss'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify', 'sass']);
}