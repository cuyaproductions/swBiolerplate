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
                style: 'compressed',
                sourcemap: 'none'
            },
            files: {
                expand: true,
                cwd: '<%= source.dir %>/sass/',
                src: ['*.s?(a|c)ss', '**/*.s?(a|c)ss'],
                dest: '<%= source.dir %>/css',
                ext: '.css'
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            files: {
                expand: true,
                cwd: '<%= source.dir %>/css/',
                src: '*.css',
                dest: '<%= build.dir %>/css/',
                extDot: '.min.css'
            }
        },

        connect: {
            server: {
                options: {
                    livereload: true,
                    base: '<%= build.dir %>',
                    port: 9000
                }
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
                files: ['<%= source.dir %>/sass/*.s?(a|c)ss', '<%= source.dir %>/sass/**/*.s?(a|c)ss'],
                tasks: ['sass', 'autoprefixer']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('serve', ['connect', 'watch']);
}
