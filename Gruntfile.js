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
                expand: true,
                cwd: '<%= source.dir %>/',
                src: ['*.jade'],
                dest: '<%= build.dir %>/',
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
                expand: true,
                cwd: '<%= source.dir %>/style',
                src: ['*.sass', '**/*.sass'],
                dest: '<%= build.dir %>/style',
                ext: '.css'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['<%= source.dir %>/*.jade', '<%= source.dir %>/**/*.jade'],
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
