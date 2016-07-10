const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const AccessError = function (e) {
  return e.code === 'EBUSY' || e.code === 'EPERM' || e.code === 'EACCES';
};

const maybeStat = function(itemPath) {
  return new Promise(function(resolve, reject) {
    fs.statAsync(itemPath).then(function(stat) {
      resolve({ path: itemPath, stat, error: null });
    }).catch(AccessError, function(e) {
      resolve({ path: itemPath, stat: null, error: e });
    }).catch(reject);
  });
};

const walk = function(dir, options) {
  return fs.readdirAsync(dir).then(function(items) {
    return items.map(function(item) {
      return path.join(dir, item);
    });
  }).then(function(items) {
    return Promise.map(items, maybeStat, {
      concurrency: options && options.concurrency || 16
    });
  });
};

module.exports = walk;
