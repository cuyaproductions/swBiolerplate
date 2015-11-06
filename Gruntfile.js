module.exports = function (grunt) {
    grunt.initConfig({
        source: {
            dir: 'src'
        },
        build: {
            dir: 'build'
        },
        jade: {
            options: {
                pretty: true
            },
            files: {
                expand: true,     // Enable dynamic expansion.
                cwd: '<%= source.dir %>/',      // Src matches are relative to this path.
                src: ['*.jade'], // Actual pattern(s) to match.
                dest: '<%= build.dir %>/',   // Destination path prefix.
                ext: '.html'
            }
        },
        sass: {
            options: {
                sourcemap: 'none',
                style: 'compressed',
                loadPath: require('node-bourbon').includePaths
            },
            files: {
                expand: true,     // Enable dynamic expansion.
                cwd: '<%= source.dir %>/style',      // Src matches are relative to this path.
                src: ['*.sass', '**/*.sass'], // Actual pattern(s) to match.
                dest: '<%= build.dir %>/style',   // Destination path prefix.
                ext: '.css'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['<%= source.dir %>/*.jade'],
                tasks: ['jade']
            },
            css: {
                files: ['<%= source.dir %>/style/*.sass', '<%= source.dir %>/style/**/*.sass'],
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
