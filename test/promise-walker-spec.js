const fs = require('fs');
const cp = require('child_process');
const mock = require('mock-require');
let walker = require('../');

describe('promise-walker', function() {

  beforeAll(function() {
    fs.writeFileSync('test/foo.js', '[]');
    fs.writeFileSync('test/bar.js', '{}');
    fs.writeFileSync('test/bax.js', '["123"]');
  });

  afterAll(function() {
    fs.unlinkSync('test/foo.js');
    fs.unlinkSync('test/bar.js');
    fs.unlinkSync('test/bax.js');
  });

  it('should list files and dirs with stats', function(done) {
    walker('./').then(function(res) {
      expect(res.length).toBeGreaterThan(0);
      res.forEach(function(item) {
        expect(item.path.length).toBeGreaterThan(0);
        expect(item.stat).not.toBeNull();
        expect(item.error).toBeNull();
      });
      done();
    });
  });

  it('should tolerate busy files', function(done) {

    let busyCount = 0;
    mock('fs', {
      readdir: fs.readdir.bind(fs),
      stat: function(filepath, cb) {
        process.nextTick(function() {
          if (Math.random() > 0.5) {
            busyCount++;
            cb({ code: 'EBUSY' }); // emulate error
          } else {
            cb(null, {});  // emulate sucess
          }
        });
      }
    });

    walker = mock.reRequire('../index');

    walker('./test').then(function(res) {

      expect(res.length).toBeGreaterThan(0);
      const locked = res.filter(function(item) {
        return item.stat === null;
      });
      expect(locked.length).toBe(busyCount);

      locked.forEach(function(item) {
        expect(item.path.length).toBeGreaterThan(0);
        expect(item.stat).toBeNull();
        expect(item.error).not.toBeNull();
      });

      done();
    });
  });
});
