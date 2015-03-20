module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jison: {
      parser: {
        options: {
          moduleType: 'amd',
        },
        src: ["src/relalg.jison"],
        dest: "lib/parser.js",
      }
    },
    jshint: {
      options: {
        ignores: 'lib/relalg/parser.js', 
        asi: true, 
        laxcomma: true 
      },
      lib: ['lib/**/*.js'],
      test: {
        options: {
          loopfunc: true 
        },
        src: ['test/**/*.js']
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'dot'
        },
        src: ['test/*_test.js', 'test/util/*_test.js']
      }
    },
    karma: {
      options: {
        basePath: '',
        frameworks: ['mocha', 'requirejs', 'sinon'],
        files: [
          {pattern: 'bower_components/es5-shim/es5-shim.js', included: false},
          {pattern: 'bower_components/chai/**/*.js', included: false},
          {pattern: 'bower_components/flight/lib/**/*.js', included: false},
          {pattern: 'bower_components/mocha-flight/lib/**/*.js', included: false},
          {pattern: 'bower_components/jquery/**/*.js', included: false},
          {pattern: 'bower_components/jquery-ui/**/*.js', included: false},
          {pattern: 'bower_components/deep-equal/**/*.js', included: false},
          {pattern: 'bower_components/ace/lib/**/*.js', included: false},
          {pattern: 'bower_components/ace/lib/**/*.css', included: false},
          {pattern: 'lib/relalg/**/*.js', included: false},
          {pattern: 'test/**/*_test.js', included: false},
          'test/karma-setup.js'
        ],
        exclude: [
          'bower_components/ace/lib/test/**/*.js',
          'bower_components/ace/lib/**/*_test.js',
        ],
        reporters: ['dots'],
      },
      chrome: {
        browsers: ['Chrome'],
        autoWatch: true
      },
      test: {
        browsers: ['PhantomJS'],
        singleRun: true
      }
    }
  })
  
  // Load extra Grunt tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jison');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-karma');
  
  // Set up aliases
  grunt.registerTask('build', ['jison']);
}
