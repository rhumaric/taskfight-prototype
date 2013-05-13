'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    project: {
      sources: 'app'
    },

    // Use watch and livereload to see the changes in the browser everytime
    // a file is saved
    regarde: {
      livereload: {
        files: [
          '<%= project.sources %>/*.html',
          '{.tmp,<%= project.sources %>}/styles/{,*/}*.css',
          '{.tmp,<%= project.sources %>}/scripts/**/*.js',
          '{.tmp,<%= project.sources %>}/test/**/*.js',
          '<%= project.sources %>/images/{,*/}*.{png,jpg,jpeg,webp}'
        ],
        tasks: ['livereload']
      }
    },

    // Serves the project
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, 'app')
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [mountFolder(connect, 'app')];
          }
        }
      }
    },

    // Opens the browser
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },

    // Runs UI tests with CasperJS
    casperjs: {
      files: ['test/ui/**/*.js']
    },

    // Runs code tests
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%= connect.options.port %>/test.html']
        }
      }
    }
  });


  grunt.registerTask('server', [
      'livereload-start',
      'connect:livereload',
      'open',
      'regarde'
    ]);

  grunt.registerTask('ui-test', [
      'connect:test',
      'casperjs'
    ]);

  grunt.registerTask('test', [
    'connect:test',
    'mocha'
  ]);

  /*
  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'requirejs',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);*/
};