'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      sass: {
        files: ['stylesheets/**/*.scss'],
        tasks: ['sass:dev'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      js: {
        files: ['javascripts/**/*.js'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    sass: {
      dev: {
        files: {
          'stylesheets/main.css': 'stylesheets/main.scss'
        },
        options: {
          outputStyle: 'expanded',
          sourceComments: 'normal'
        }
      },
      dist: {
        files: {
          'dist/stylesheets/main.css': 'stylesheets/main.scss'
        },
        options: {
          outputStyle: 'compressed'
        }
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: 'dist/images/'
        }]
      }
    },
    modernizr: {
      devFile: 'remote',
      outputFile: 'dist/javascripts/modernizr.min.js',
      files: [
        'stylesheets/**/*.scss',
        'js/**/*.js',
        '*.html',
        'images/**/*.*',
        '!./dist/javascripts/modernizr.min.js'
      ],
      extra: {
        "shiv" : true,
        "printshiv" : false,
        "load" : true,
        "mq" : false,
        "cssclasses" : true
      },
      extensibility: {
        "addtest" : false,
        "prefixed" : false,
        "teststyles" : false,
        "testprops" : false,
        "testallprops" : false,
        "hasevents" : false,
        "prefixes" : false,
        "domprefixes" : false
      }
    },
    copy: {
      dist: {
        src: 'index.html',
        dest: 'dist/index.html',
      }
    },
    useminPrepare: {
      html: 'dist/index.html',
      options: {
        root: './'
      }
    },
    usemin: {
      html: 'dist/index.html'
    },
    connect: {
      dev: {
        options: {
          port: 3000,
          open: true,
          middleware: function(connect, opts) {
            return [
              require('connect-livereload')(),
              connect.static(require('path').resolve(__dirname))
            ];
          }
        }
      }
    },
  });

  grunt.registerTask('dev', ['sass:dev', 'connect', 'watch']);
  grunt.registerTask('build', [
    'sass:dist',
    'imagemin:dist',
    'copy:dist',
    'useminPrepare',
    'concat',
    'uglify',
    'usemin',
    'modernizr'
  ]);
  grunt.registerTask('default', ['dev']);
};
