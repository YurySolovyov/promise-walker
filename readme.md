# promise-walker

[![license:mit](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

> Reads directory and tolerating possible `EBUSY`, `EPERM`, `EACCES` errors

## Install
```
npm i promise-walker --save
```

## Example

```js
const walk = require('promise-walker');

walk('./path').then(function(items) {
  // items -> [
  //   ...
  //   {
  //     path: './path/foo'
  //     stat: fs.Stat | null,
  //     error: null | Error('EBUSY') | Error('EPERM') | Error('EACCES')
  //   }
  //   ...
  // ];
});
```

## API

```js
walk(path, [options]); // -> Promise
```
`options`:
  - concurrency: `Number`: Default: 16. Limits concurrently inspected files;

### License

MIT © Yury Solovyov
