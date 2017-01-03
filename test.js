var Jasmine = require('jasmine');
var jasmine = new Jasmine();
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

var reporter = new SpecReporter({
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
