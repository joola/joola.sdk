module.exports = function (grunt) {
  var browsers = [
    {
      browserName: 'firefox',
      version: '19',
      platform: 'XP'
    },
    {
      browserName: 'googlechrome',
      platform: 'XP'
    },
    {
      browserName: 'googlechrome',
      platform: 'linux'
    },
    {
      browserName: 'internet explorer',
      platform: 'WIN8',
      version: '10'
    },
    {
      browserName: 'internet explorer',
      platform: 'VISTA',
      version: '9'
    }
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['build/temp/*.js', 'build/temp/*.css'],

    browserify: {
      vendor: {
        src: [],
        dest: 'build/temp/vendor.js',
        options: {
          require: [],
          alias: ['src/vendor/sorttable.js:sorttableWrapper']
        }
      },
      client: {
        src: ['src/lib/index.js'],
        dest: 'build/temp/joola.io.js',
        options: {
          external: []
        }
      }
    },

    watchify: {
      options: {
        keepalive: true
      },
      all: {
        src: ['./src/lib/index.js'],
        dest: 'build/release/joola.io.js'
      }
    },

    jshint: {
      all: ['src/lib/**/*.js']
    },

    csslint: {
      base_theme: {
        src: 'src/css/**/*.css',
        rules: {
          "import": false,
          "overqualified-elements": 2
        }
      }
    },

    concat: {
      'build/release/joola.io.js': [ 'build/temp/joola.io.js', 'build/temp/vendor.js'],
      'build/temp/joola.io.css': ['src/css/**/*.css']
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: true,
        compress: true,
        sourceMap: true,
        sourceMapName: 'build/release/joola.io.min.js.map'
      },
      build: {
        src: 'build/release/joola.io.js',
        dest: 'build/release/joola.io.min.js'
      }
    },

    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
        keepSpecialComments: 0
      },
      my_target: {
        options: {
          keepSpecialComments: 1
        },
        src: 'build/temp/joola.io.css',
        dest: 'build/release/joola.io.min.css'
      }
    },

    copy: {
      main: {
        src: 'build/temp/joola.io.css',
        dest: 'build/release/joola.io.css'
      }
    },


    connect: {
      server: {
        options: {
          protocol: 'http',
          base: '',
          port: 9999,
          debug: true,
          log: true
        }
      }
    },

    mocha: {
      all: {
        options: {
          urls: [
            'http://localhost:9999/test/browser/common.spec.html',
            'http://localhost:9999/test/browser/viz/datepicker.spec.html'
          ],
          run: false,
          log: true,
          debug: true,
          timeout: 5000
        }
      }
    },

    'saucelabs-mocha': {
      all: {
        options: {
          urls: [
            'http://127.0.0.1:9999/test/browser/common.spec.html',
            'http://localhost:9999/test/browser/viz/datepicker.spec.html'
          ],
          tunnelTimeout: 5,
          identifier: process.env.TRAVIS_JOB_ID || Math.floor((new Date).getTime() / 1000 - 1230768000).toString(),
          build: process.env.TRAVIS_JOB_ID || Math.floor((new Date).getTime() / 1000 - 1230768000).toString(),
          browsers: browsers,
          'tunnel-identifier': process.env.TRAVIS_JOB_ID || Math.floor((new Date).getTime() / 1000 - 1230768000).toString(),
          testname: process.env.TRAVIS_COMMIT ? 'joola.io.sdk, commit: ' + process.env.TRAVIS_COMMIT : "joola.io.sdk tests",
          tags: [process.env.TRAVIS_BRANCH || 'local']
        }
      }
    }
  });

  for (var key in grunt.file.readJSON("package.json").devDependencies) {
    if (key !== "grunt" && key.indexOf("grunt") === 0)
      grunt.loadNpmTasks(key);
  }

  grunt.registerTask('default', ['clean', 'jshint', 'browserify', 'uglify', 'concat', 'cssmin', 'copy', 'clean']); //'csslint',
  grunt.registerTask('dev', ['connect', 'watchify']);
  grunt.registerTask('test', ['default', 'connect', 'mocha']);
  grunt.registerTask('test:bare', ['connect', 'mocha']);
  grunt.registerTask('sauce', ['default', 'connect', 'saucelabs-mocha']);
}
;