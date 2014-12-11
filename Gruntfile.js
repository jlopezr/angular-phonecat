'use strict';
var path = require('path');

module.exports = function(grunt) {
    require('time-grunt')(grunt);

    var buildProperties = {
        appName: 'app.phonecat',
        frontSrcBasePath: 'app/',
        src: '<%= config.frontSrcBasePath %>js/',
        dist: '<%= config.frontSrcBasePath %>dist/'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        config: buildProperties,
        jshint: {
            options: {
                force: true,
                curly: true, // Require {} for every new block or scope.
                eqeqeq: false, // Require triple equals i.e. `===`.
                eqnull: true,
                latedef: false, // Prohibit variable use before definition.
                unused: false, // Warn unused variables.
                undef: true, // Require all non-global variables be declared before they are used.
                maxparams: 15,
                browser: true, // Standard browser globals e.g. `window`, `document`.
                globals: {
                    jQuery: true,
                    $: true,
                    angular: true,
                    alert: true,
                    console: true,
                    _: true,
                    NotificationFx: true,
                    Modernizr: true,
                    popup: true,
                    showNotAddedCartNotification: true,
                    showNotification: true,
                    self:true,
                    FB: true,
                    IosSlider: true
                },
                ignores: ['<%= config.src %>plugins.js']
            },
            uses_defaults: ['<%= config.src %>*.js']
        },
        clean: {
            initclean: {
                src: ['<%= config.dist %>*.js']
            },
            postmin: {
                src: ['<%= config.dist %>*.js', '!<%= config.dist %>*.min.js']
            }
        },
        ngAnnotate: {
            options: {
                ngAnnotateOptions: {},
                singleQuotes: true
            },
            addRemove: {
                options: {
                    add: true,
                    remove: true
                },
                files: [
                    {
                        src: [
                            '<%= config.src %>app.js',
                            '<%= config.src %>animations.js',
                            '<%= config.src %>controllers.js',
                            '<%= config.src %>filters.js',
                            '<%= config.src %>services.js'
                        ],
                        dest: '<%= config.dist %><%= config.appName %>.js'
                    }
                ]
            },
            addRemoveLibs: {
                options: {
                    add: true,
                    remove: true
                },
                files: [
                    {
                        src: [
//                            '<%= config.src %>lib/angular-mailchimp.js',
//                            '<%= config.src %>lib/angular-capitalize-filter.js',
//                            '<%= config.src %>lib/angular-responsive-images.js',
//                            '<%= config.src %>lib/angular-router-advanced.js',
//                            '<%= config.src %>lib/pmkr-components.js',
//                            '<%= config.src %>lib/angular-ny-logger.js',
//                            '<%= config.src %>lib/angular-loading-bar/loading-bar.js'
                        ],
                        dest: '<%= config.dist %><%= config.appName %>-angular-libs.js'
                    }
                ]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= config.appName %> <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false
            },
            lib_build: {
                files: [
                    {
                        src: '<%= config.dist %><%= config.appName %>-angular-libs.js',
                        dest: '<%= config.dist %><%= config.appName %>-angular-libs.min.temp.js'
                    }
                ]
            },
            build: {
                files: [
                    {
                        src: '<%= config.dist %><%= config.appName %>.js',
                        dest: '<%= config.dist %><%= config.appName %>.min.js'
                    }
                ]
            }
        },
        concat: {
            options: {
                separator: '\n/* concat */'
            },
            dist: {
                src: [
//                    '<%= config.src %>lib/angular-translate.min.js',
//                    '<%= config.src %>lib/angular-translate-loader-url.min.js',
//                    '<%= config.src %>lib/angular-webstorage.min.js',
//                    '<%= config.src %>lib/angular-spinner.min.js',
//                    '<%= config.src %>lib/bootstrap.min.js',
//                    '<%= config.src %>lib/plugins.min.js',
//                    '<%= config.dist %><%= config.appName %>-angular-libs.min.temp.js'
                ],
                dest: '<%= config.dist %><%= config.appName %>-angular-libs.min.js'
            }
        },
        preprocess : {
            options: {
                inline: true,
                context : {
                    DEBUG: false
                }
            },
            html : {
                src : [
                    '<%= config.frontSrcBasePath %>**/*.html'
                ]
            },
            js : {
                src: '<%= config.dist %><%= config.appName %>.min.js'
            }
        },
        watch: {
            scripts: {
                files: [
                    '<%= config.frontSrcBasePath %>**/*.js',
                    '<%= config.frontSrcBasePath %>**/*.html',
                    '<%= config.frontSrcBasePath %>**/*.json',
                    '!<%= config.dist %>*.js'
                ],
                tasks: ['default'],
                options: {
                    interrupt: true, // The default behavior will only spawn a new child process per target when the previous process has finished. Set the interrupt option to true to terminate the previous process and spawn a new one upon later changes.
                    livereload: true
                }
            }
        },
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5, // maximum number of notifications from jshint output
                title: "<%= config.appName %> Project msg:"
            }
        }
    });

//    var cwd = process.cwd();
//    console.log("CWD: ",cwd);
//    console.log("dirname: ",path.resolve('../../'));
//    process.chdir(path.resolve('../../'));

    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    // This is required if you use any options.
    grunt.task.run('notify_hooks');

//    process.chdir(cwd);

    //grunt.registerTask('default', ['clean:initclean', 'ngAnnotate:addRemove']);
    grunt.registerTask('default', [ 'clean:initclean', 'ngAnnotate:addRemoveLibs', 'ngAnnotate:addRemove', 'jshint:uses_defaults', 'uglify:lib_build', 'concat:dist' ]);

    grunt.registerTask('dist', ['clean:initclean', 'ngAnnotate:addRemoveLibs', 'ngAnnotate:addRemove', 'jshint:uses_defaults', 'uglify:build', 'uglify:lib_build', 'concat:dist', 'clean:postmin', 'preprocess:js', 'preprocess:html']);

};
