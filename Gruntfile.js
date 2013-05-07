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
          '<%= project.sources %>/images/{,*/}*.{png,jpg,jpeg,webp}'
        ],
        tasks: ['livereload']
      }
    },
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
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    }
  });


  grunt.registerTask('server', [
      'livereload-start',
      'connect:livereload',
      'open',
      'regarde'
    ]);

  /*grunt.registerTask('test', [
    'clean:server',
    'connect:test',
    'mocha'
  ]);

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