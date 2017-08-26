/**
 * Created by UserB on 6/26/2017.
 */

'use strict';

/**
 * Copyright 2014 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ngrok = require('ngrok');

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        /** Setup tasks **/

        clean: {
            dist: ["dist/"],
            concatenatedjsfile: ["src/static/scripts/cds.concat.js"]
        },

        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: [
                        '**',
                        '!static/scripts/**',
                        '!static/scripts/**/*.js',
                        '!static/styles/**/*.scss'
                    ],
                    dest: 'dist/'
                }]
            },

            serviceWorker: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: [
                        'static/scripts/third_party/serviceworker-cache-polyfill.js',
                        'static/scripts/sw.js'
                    ],
                    dest: 'dist/'
                }]
            },

            html: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: [
                        '**/*.html'
                    ],
                    dest: 'dist/'
                }]
            },

            license: {
                files: [{
                    expand: false,
                    src: [
                        './LICENSE'
                    ],
                    dest: 'dist/'
                }]
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            build: {
                tasks: ['watch:notjsorcss', 'watch:js', 'watch:scss']
            }
        },

        watch: {
            notjsorcss: {
                files: [
                    'src/**/*.*',
                    '!src/scripts/*.*',
                    '!src/styles/*.*'
                ],
                tasks: ['copy:html']
            },
            js: {
                files: [
                    'src/static/scripts/**/*.js',
                    '!src/static/scripts/cds.concat.js'
                ],
                tasks: ['codekit', 'uglify', 'copy:serviceWorker']
            },
            scss: {
                files: ['src/static/styles/**/*.scss'],
                tasks: ['sass']
            }
        },

        /** JavaScript **/

        codekit: {
            build: {
                files: {
                    'src/static/scripts/cds.concat.js':
                        'src/static/scripts/cds.js'
                }
            }
        },

        uglify: {
            options: {
                sourceMap: false,
            },
            build: {
                src: 'src/static/scripts/cds.concat.js',
                dest: 'dist/static/scripts/cds.min.js'
            }
        },

        /** CSS **/
        sass: {
            build: {
                options: {
                    outputStyle: 'compressed',
                    sourceMap: false
                },
                files: [{
                    expand: true,
                    cwd: 'src/static/styles/',
                    src: ['cds.scss', 'reg-form.scss'],
                    dest: 'dist/static/styles/',
                    ext: '.min.css'
                }]
            }
        },

        cssmin: {
            target: {
                options: {
                    sourceMap: false,
                    overwrite: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['src/css/*.css', '!src/css/*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },

        /** Images **/

        imageoptim: {
            options: {
                jpegMini: false,
                imageAlpha: false,
                imageOptim: true,
                quitAfter: true
            },
            build: {
                src: [
                    'dist/**/*.png',
                    'dist/**/*.jpg',
                    'dist/**/*.gif'
                ]
            }
        },

        /** Image Resizes **/

        image_resize: {
            resize: {
                options: {
                    width: 160,
                    height: 80,
                    overwrite: true
                },
                files: {
                    'img/cam_be_like.jpg': 'src/img/cam_be_like.jpg',
                    'views/images/pizzeria.jpg': 'src/img/pizzeria.jpg',
                    'img/mobilewebdev.jpg': 'src/img/mobilewebdev.jpg'
                }
            }
        },

        /** Licensing **/

        usebanner: {
            js: {
                options: {
                    banner: [
                        '/**\n',
                        '<%= grunt.file.read("licenses/apache-2.txt") %>',
                        '<%= grunt.file.read("licenses/signals.txt") %>',
                        '<%= grunt.file.read("licenses/requestanimationframe.txt") %>',
                        '<%= grunt.file.read("licenses/serviceworker.txt") %>',
                        '*/'].join('\n---\n')

                },
                files: {
                    src: ['dist/static/scripts/cds.min.js']
                }
            },

            css: {
                options: {
                    banner: '/** \n<%= grunt.file.read("licenses/apache-2.txt") %>\n*/'
                },
                files: {
                    src: ['dist/static/styles/cds.min.css']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-codekit');
    grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-image-resize');

    grunt.registerTask('dev', [
        'clean:dist',
        'copy',
        'codekit',
        'uglify',
        'clean:concatenatedjsfile',
        'sass',
        'concurrent']);

    grunt.registerTask('full', [
        'clean:dist',
        'copy',
        'codekit',
        'uglify',
        'clean:concatenatedjsfile',
        'sass',
        'imageoptim',
        'usebanner']);

    grunt.registerTask('default', [
        'clean:dist',
        'copy',
        'codekit',
        'uglify',
        'clean:concatenatedjsfile',
        'sass',
        'usebanner']);
};




