module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concurrent:{
            target: {
                tasks: ['jshint', 'uglify'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'public/css/main.min.css': 'public/scss/main.scss'
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({overrideBrowserslist: ['>0%']})
                ]
            },
            dist: {
                src: 'public/css/main.min.css',
                dest: 'public/css/main.min.css'
            }
        },
        uglify: {
            options: {
                mangle: true,
                sourceMap: true
            },
            target: {
                files: {
                    'public/scripts/main.min.js': ['public/scripts/src/**/*.js']
                }
            }
        },
        jshint: {
            options: {
                "bitwise": true,
                "camelcase": true,
                "curly": true,
                "latedef": true,
                "newcap": true,
                "nonew": true,
                "esnext": true,
                "browser": true,
                "node": true,
                "jquery": true,
                "devel": true,
                "strict": true
            },
            target: {
                src: ['public/scripts/src/**/*.js']
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'public/images/src',
                    src: ['**/*.{png,jpg,JPG,gif,svg}'],
                    dest: 'public/images/dest'
                }]
            }

        },
        watch: {
            styles: {
                files: ['public/scss/**'],
                tasks: ['sass', 'postcss']
            },
            scripts: {
                files: ['public/scripts/src/**/*.js'],
                tasks: ['uglify']
            },
            jshint: {
                files: ['public/scripts/src/**/*.js'],
                tasks: ['jshint']
            },
            images: {
                files: ['public/images/src/**/*.{png,jpg,JPG,gif,svg}'],
                tasks: ['compressNewImages']
            }
        }
    });

    grunt.registerTask("compressNewImages", ["newer:imagemin"]);
    grunt.registerTask('default', ['sass', 'postcss', 'uglify', 'watch']);

};
