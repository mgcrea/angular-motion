'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  // require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    pkg: require('./package.json'),
    bower: require('./bower.json'),
    yo: {
      src: 'src',
      dist: 'dist',
      docs: 'docs',
      pages: 'pages'
    },

    // Project meta
    meta: {
      banner: '/**\n' +
      ' * <%= pkg.name %>\n' +
      ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' * @author <%= pkg.author %>\n' +
      ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
      ' */\n'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {

      styles: {
        options: {
          spawn: false
        },
        files: ['src/{,*/}*.less', 'docs/styles/{,*/}*.less'],
        tasks: ['less:dev', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '{docs,.dev,.tmp,<%= yo.src %>}/{,*/}{,docs/}*.html',
          '{docs,.dev,.tmp,<%= yo.src %>}/{,*/}*.css',
          '{docs,.dev,.tmp,<%= yo.src %>}/{,*/}*.js',
          '{docs,<%= yo.src %>}/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: ['docs', '.dev', '.tmp', '<%= yo.src %>']
        }
      },
      test: {
        options: {
          port: 9001,
          base: ['.tmp',  'test', '<%= yo.src %>']
        }
      },
      dist: {
        options: {
          base: '<%= yo.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yo.src %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yo.dist %>/*',
            '!<%= yo.dist %>/.git*'
          ]
        }]
      },
      docs: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yo.pages %>/*',
            '!<%= yo.pages %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Compile less stylesheets
    less: {
      dev: {
        options: {
          // dumpLineNumbers: 'comments',
        },
        files: [{
          expand: true,
          cwd: '<%= yo.src %>/',
          src: '{,*/}*.less',
          dest: '.tmp/styles/modules/',
          ext: '.css'
        }, {
          src: '<%= yo.src %>/{,*/}*.less',
          dest: '.tmp/styles/<%= bower.name %>.css',
        }, {
          expand: true,
          cwd: '<%= yo.docs %>/styles/',
          src: '*.less',
          dest: '.tmp/styles/',
          ext: '.css'
        }]
      },
      dist: {
        options: {
          cleancss: true
        },
        files: [{
          expand: true,
          cwd: '<%= yo.src %>/',
          src: '{,*/}*.less',
          dest: '.tmp/styles/modules/',
          ext: '.min.css'
        }, {
          src: '<%= yo.src %>/{,*/}*.less',
          dest: '.tmp/styles/<%= bower.name %>.min.css',
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      all: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= yo.pages %>'
      },
      docs: {
        html: '<%= yo.docs %>/index.html'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: '<%= yo.pages %>/index.html',
      css: ['<%= yo.pages %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yo.pages %>', '<%= yo.pages %>/images']
      }
    },

    // Embed static ngincludes
    nginclude: {
      docs: {
        files: [{
          src: '<%= yo.docs %>/index.html',
          dest: '<%= yo.pages %>/index.html'
        }],
        options: {
          assetsDirs: ['<%= yo.src %>', '<%= yo.docs %>']
        }
      }
    },

    // Minify html files
    htmlmin: {
      options: {
        collapseWhitespace: true,
        removeComments: false
      },
      docs: {
        files: [{
          expand: true,
          cwd: '<%= yo.pages %>',
          src: ['*.html'],//, 'views/{,*/}*.html'],
          dest: '<%= yo.pages %>'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      static: {
        files: [{
          expand: true,
          cwd: '<%= yo.pages %>',
          dest: '<%= yo.pages %>/static',
          src: [
            'images/{,*/}*.png',
            'scripts/{,*/}*.js',
            'styles/{,*/}*.css'
          ]
        }]
      },
      docs: {
        files: [{
          expand: true,
          cwd: '<%= yo.docs %>/',
          dest: '<%= yo.pages %>',
          src: [
            'images/*',
            '1.0/**/*'
          ]
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      docs: [
        'less:docs',
        'uglify:generated',
        'cssmin:generated'
      ],
      server: [
        'less:dev'
      ],
      test: [
        'less:dev'
      ],
      dist: [
        'less:dist',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },

    concat: {
      // generated: {
      //   options: {
      //     banner: '(function(window, document, $, undefined) {\n\'use strict\';\n',
      //     footer: '\n})(window, document, window.jQuery);\n'
      //   }
      // },
      dist: {
        options: {
          // Replace all 'use strict' statements in the code with a single one at the top
          banner: '(function(window, document, undefined) {\n\'use strict\';\n',
          footer: '\n})(window, document);\n',
          process: function(src, filepath) {
            return '// Source: ' + filepath + '\n' +
              src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
          }
        },
        files: [{
          src: ['<%= yo.src %>/module.js', '<%= yo.src %>/{,*/}*.js'],
          dest: '<%= yo.dist %>/<%= pkg.name %>.js'
        }, {
          src: ['<%= yo.dist %>/modules/{,*/}*.tpl.js'],
          dest: '<%= yo.dist %>/<%= pkg.name %>.tpl.js'
        }]
      },
      banner: {
        options: {
          banner: '<%= meta.banner %>',
        },
        files: [{
          expand: true,
          cwd: '<%= yo.dist %>',
          src: '{,*/}*.js',
          dest: '<%= yo.dist %>'
        }]
      },
      docs: {
        options: {
          banner: '<%= meta.banner %>',
        },
        files: [{
          expand: true,
          cwd: '<%= yo.pages %>',
          src: ['scripts/{demo,docs,angular-strap}*', 'styles/{main}*'],
          dest: '<%= yo.pages %>'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          src: '<%= yo.dist %>/<%= pkg.name %>.js',
          dest: '<%= yo.dist %>/<%= pkg.name %>.js'
        }]
      },
      modules: {
        files: [{
          expand: true,
          flatten: true,
          cwd: '<%= yo.src %>',
          src: '{,*/}*.js',
          dest: '<%= yo.dist %>/modules'
        }]
      },
      docs: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Test settings
    karma: {
      options: {
        configFile: 'test/karma.conf.js',
        browsers: ['PhantomJS']
      },
      unit: {
        singleRun: true,
        options: {
          reporters: ['dots']
        }
      },
      server: {
        autoWatch: true
      }
    }

  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    // 'concurrent:test',
    // 'autoprefixer',
    'ngtemplates:test',
    'connect:test',
    'karma:unit'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'ngtemplates:dist',
    'concat:dist',
    'ngmin:dist',
    'ngmin:modules',
    'uglify:dist',
    'concat:banner'
  ]);

  grunt.registerTask('docs', [
    'clean:docs',
    'useminPrepare',
    // 'concurrent:docs',
    'less:docs',
    'autoprefixer',
    'nginclude:docs',
    'ngtemplates:test',
    'ngtemplates:docs',
    'concat:generated',
    'ngmin:docs',
    'copy:docs',
    'cssmin:generated',
    'uglify:generated',
    'concat:docs',
    'copy:static',
    'usemin',
    // 'htmlmin:docs' // breaks code preview
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

};
