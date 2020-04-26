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
                ],
                tasks: ['copy:dev', 'bsReload:html']
            },
            js: {
                files: [  //下面文件的改变就会实时刷新网页
                    'src/js/*.js'
                ],
                tasks: ['babel', 'bsReload:js']
            }

        },
        clean: ['dist'],
        copy: {
            dev: {
                files: [{
                    expand: false,
                    flatten: false,
                    dest: 'dist/',
                    src: 'index.html'
                }]
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                expand: true,
                cwd: './src/js/', //js目录下
                src: ['**/*.js'], //所有js文件
                dest: 'dist/js/'  //输出到此目录下
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                expand: true,            //将占位符*展开 即使用占位符匹配文件名
                src: 'dist/**/*.js',       //压缩src目录及所有子目录下的js文件
                dest: './',             //压缩文件存放到dist目录下的同名目录
                ext: '.min.js',           //压缩文件的后缀名
                options: {
                    sourceMap: true
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'index.html',
                        'src/js/**/*.js'
                    ]
                },
                options: {
                    background: true,
                    watchTask: true,
                    server: {
                        baseDir: "./dist/"
                    }
                }
            }
        },
        bsReload: {
            html: {
                reload: "index.html"
            },
            js: {
                reload: ".js"
            },
            all: {
                reload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('browser', [
        'copy',
        'babel',
        'browserSync',
        'watch',
    ]);

    grunt.registerTask('default', [
        'clean',
        'babel',
        'uglify'
    ]);

};
