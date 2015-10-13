# gobble-zip

Gobble plugin to zip files/directories into a `.zip` file.

## Installation

I assume you already know the basics of [Gobble](https://github.com/gobblejs/gobble).

```bash
npm i -D gobble-zip
```

## Usage

In your `gobblefile`, run the `zip` gobble transform with a `dest` option, like so:

```javascript
var gobble = require( 'gobble' );
module.exports = gobble( 'assets' ).transform( 'zip', {
  dest: 'assets.zip'
});
```

Aditionally, `gobble-zip` accepts the `files` and `sort` options, with the same
semantics as [`gobble-concat`](https://github.com/gobblejs/gobble-concat).

## License

```
"THE BEER-WARE LICENSE":
<ivan@sanchezortega.es> wrote this file. As long as you retain this notice you
can do whatever you want with this stuff. If we meet some day, and you think
this stuff is worth it, you can buy me a beer in return.
```
