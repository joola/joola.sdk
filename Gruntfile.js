module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['bin/vendor.js'],

    browserify: {
      vendor: {
        src: [],
        dest: 'bin/vendor.js',
        options: {
          require: ['jquery'],
          alias: ['./lib/3rd/sorttable.js:sorttableWrapper']
        }
      },
      client: {
        src: ['index.js', 'lib/**/*.js'],
        dest: 'bin/joola.io.js',
        options: {
          external: ['jQuery', 'sorttableWrapper']
        }
      }
    },

    jshint: {
      all: ['index.js', 'lib/**/*.js']
    },

    concat: {
      'bin/joola.io.js': ['bin/vendor', 'bin/joola.io.js']
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: true,
        compress: true,
        sourceMap: true,
        sourceMapName: 'bin/joola.io.min.js.map'
      },
      build: {
        src: 'bin/joola.io.js',
        dest: 'bin/joola.io.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default', ['clean', 'jshint', 'browserify', 'concat', 'uglify', 'clean']);
};