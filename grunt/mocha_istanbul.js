module.exports = {
    coverage: {
        src: 'server', // a folder works nicely
        options: {
            mask: '*.spec.js'
        }
    }
    ,
    coverageSpecial: {
        src: ['testSpecial/*/*.js', 'testUnique/*/*.js'], // specifying file patterns works as well
        options: {
            coverageFolder: 'coverageSpecial',
            mask: '*.spec.js'
        }
    }
    ,
    coveralls: {
        src: ['test', 'testSpecial', 'testUnique'], // multiple folders also works
        options: {
            coverage: true,
            check: {
                lines: 75,
                statements: 75
            }
            ,
            root: './lib', // define where the cover task should consider the root of libraries that are covered by tests
            reportFormats: ['cobertura', 'lcovonly']
        }
    },
    istanbul_check_coverage: {
        default: {
            options: {
                coverageFolder: 'coverage*', // will check both coverage folders and merge the coverage results
                check: {
                    lines: 80,
                    statements: 80
                }
            }
        }
    }
};