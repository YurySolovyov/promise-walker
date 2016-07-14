# promise-walker
[![Codeship CI status](https://img.shields.io/codeship/9c3f1e20-28f2-0134-2981-5a347c0ad183.svg)](https://codeship.com/projects/162493)
[![Deps](https://david-dm.org/YurySolovyov/promise-walker.svg)](https://david-dm.org/YurySolovyov/promise-walker)
[![license:mit](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

> Reads directory tolerating possible `EBUSY`, `EPERM`, `EACCES` errors

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
