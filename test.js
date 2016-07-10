var Jasmine = require('jasmine');
var jasmine = new Jasmine();
var Reporter = require('jasmine-spec-reporter');

var reporter = new Reporter({
    displaySpecDuration: true,
});

jasmine.addReporter(reporter);

jasmine.loadConfig({
    spec_dir: 'test',
    spec_files: [
        '**/*[sS]pec.js',
    ]
});

jasmine.execute();
