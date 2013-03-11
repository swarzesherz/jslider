module.exports = function(grunt) {

  var cssMin = {
      src: 'dist/<%= pkg.name %>.css',
      dest: 'dist/<%= pkg.name %>.min.css'
    };

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    build: {main: {}, amd: {}, css: {}},
    concat: {
      amd: {
        src: ['templates/amd_top.js', 'js/*.js', 'templates/amd_bottom.js'],
        dest: 'dist/<%= pkg.name %>.amd.js'
      },
      main: {
        src: ['js/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      css: {
        src: ['css/jslider.css', 'css/*.css'],
        dest: 'dist/<%= pkg.name %>.css'
      }
    },
    min: {
      amd: {
        src: ['<banner:meta.banner>', '<config:concat.amd.dest>'],
        dest: 'dist/<%= pkg.name %>.amd.min.js'
      },
      main: {
        src: ['<banner:meta.banner>', '<config:concat.main.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    'min-css': {
      main: cssMin,
      amd: cssMin
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', function() {
      grunt.task.run(['build:main', 'build:amd']);
    });
  grunt.registerMultiTask('min-css', 'Minify CSS', function() {
    var compressor = require('yuicompressor');
    compressor.compress(this.data.src, {
      //Compressor Options:
      charset: 'utf8',
      type: 'css',
      'line-break': 80,
      outfile: this.data.dest
    }, function(err, data, extra) {
      //err   If compressor encounters an error, it's stderr will be here
      //data  The compressed string, you write it out where you want it
      //extra The stderr (warnings are printed here in case you want to echo them
      print(extra);
      throw err;
    });
  });
  grunt.registerMultiTask('build', '',
     function() {
        var parts = ['concat', 'min', 'min-css'], i;
        for (i=0; i<parts.length; i+=1) {
            parts[i] = parts[i] + ':' + this.target;
        }
        grunt.task.run(parts);
     });

};
