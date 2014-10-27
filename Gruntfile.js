/*
 * Generated on 2014-04-03
 * generator-assemble v0.4.11
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      sass: {
        files: ['src/assets/sass/{,*/}*.{scss,sass}'],
        options: {
          spawn: false
        },
        tasks: ['sass', 'cssmin']
      },
      concat: {
        files: ['src/assets/js/**/*.js'],
        options: {
          spawn: false
        },
        tasks: ['concat']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          production: false,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs',
          plugins: ['assemble-contrib-sitemap'],
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    //sass: {
    //  main: {
    //    files: {
    //      'dist/assets/css/main.css': 'src/assets/sass/app/main.scss',
    //    },
    //  },
    //},

    sass: {
      dev: {
          options: {
              outputStyle: 'nested',
              sourceComments: 'normal'
          },
          files: {
              'dist/assets/css/main.css': 'src/assets/sass/app/main.scss',
          }
      },
      prod: {
          options: {
              outputStyle: 'compressed'
          },
          files: {
              'dist/assets/css/main.min.css': 'src/assets/sass/app/main.scss',
          }
      }
    },

    cssmin: {
      minify: {
        options: {},
        expand: true,
        cwd: 'dist/assets/css/',
        src: [ '*.css', '!*.min.css' ],
        dest: 'dist/assets/css/',
        ext: '.min.css',
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      jsmod: {
        src: ['src/assets/js/vendor/modernizer.js'],
        dest: 'dist/assets/js/modernizer.js',
      },
      jsvend: {
        src: ['src/assets/js/vendor/jquery.js'],
        dest: 'dist/assets/js/jquery.js',
      },
      jspicture: {
        src: ['src/assets/js/vendor/picturefill.min.js'],
        dest: 'dist/assets/js/picturefill.min.js',
      },
      jsfancybox: {
        src: ['src/assets/js/vendor/jquery.fancybox.pack.js'],
        dest: 'dist/assets/js/jquery.fancybox.pack.js',
      },
      jsapp: {
        src: [
          'src/assets/js/foundation/foundation.js',
          'src/assets/js/foundation/{,*/,!foundation.js}*.js',
          'src/assets/js/app/{,*/}*.js'],
        dest: 'dist/assets/js/main.js',
      },
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
        },
      },
      beforeconcat: ['src/assets/js/app/app.js']
    },

    copy: {
      img: {
        files: [
          { expand: true, cwd: 'src/assets/img/', src: '**/*', dest: 'dist/assets/img/' },
        ],
      },
      css: {
        files: [
          { expand: true, cwd: 'src/assets/css/', src: '**/*', dest: 'dist/assets/css/' },
        ]
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}'],

    // Deploy with FTPush
    ftpush: {
      build: {
        auth: {
          host: 'bokamontenegro.com',
          port: 21,
          authKey: 'key1'
        },
        src: '<%= config.dist %>',
        dest: '/kitesurfingmontenegro.com',
        simple: false,
        useList: true
      }
    }

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-ftpush');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('server', [
    'clean',
    'sass:dev',
    'cssmin',
    'concat',
    'jshint',
    'assemble',
    'copy',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'sass:prod',
    'cssmin',
    'concat',
    'jshint',
    'copy',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'ftpush'
  ]);

};
