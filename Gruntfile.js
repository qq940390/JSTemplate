module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                spawn: false
            },
            html: {
                files: [  //下面文件的改变就会实时刷新网页
                    'index.html',
                    'src/{,*/}*.js'
                ],
                tasks: ['bsReload:all']
            }

        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.js': 'src/<%= pkg.name %>.js'
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'index.html',
                        'src/{,*/}*.js'
                    ]
                },
                options: {
                    background: true,
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
        },
        bsReload: {
            all: {
                reload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('browser', [
        'browserSync',
        'watch'
    ]);

    grunt.registerTask('default', [
        'babel',
        'uglify'
    ]);

};
