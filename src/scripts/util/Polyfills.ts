declare function require(name: string);
export class Polyfills {
  // utility to check browser compatibility with Promise, Array.from, Symbol

  public static check() {
    // check Promise
    const windowToCheck = window as any;
    if (!windowToCheck.Promise) {
      // not found, load promise polyfill (es6-promise)
      console.log('T1C-JS Lib: applying polyfill for ES6 Promise');
      require('es6-promise').polyfill();
    }

    // check Array.from
    if (!Array.from) {
      // not found, load array.from polyfill (core-js)
      console.log('T1C-JS Lib: applying polyfill for ES6 Array');
      require('core-js/es6/array');
      require('core-js/es6/typed');
    }

    // check Symbol
    if (!windowToCheck.Symbol) {
      console.log('T1C-JS Lib: applying polyfill for ES6 Symbol');
      require('core-js/es6/symbol');
    }

    if (typeof Object.assign !== 'function') {
      console.log('T1C-JS Lib: applying polyfill for ES6 Object Assign');
      require('es6-object-assign').polyfill();
    }

    if (!String.prototype.startsWith) {
      console.log('T1C-JS Lib: applying polyfill for IE11 String.startsWith');
      String.prototype.startsWith = function (search, pos) {
        return (
          this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search
        );
      };
    }

    if (!String.prototype.endsWith) {
      console.log('T1C-JS Lib: applying polyfill for IE11 String.endsWith');
      String.prototype.endsWith = function (search, this_len) {
        if (this_len === undefined || this_len > this.length) {
          this_len = this.length;
        }
        return this.substring(this_len - search.length, this_len) === search;
      };
    }

    // filter polyfill
    if (!Array.prototype.filter) {
      Array.prototype.filter = function (fun) {
        'use strict';
        if (this === void 0 || this === null) {
          throw new TypeError();
        }
        const t = Object(this);
        const len = t.length >>> 0;
        if (typeof fun !== 'function') {
          throw new TypeError();
        }
        const res = [];
        const thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (let i = 0; i < len; i++) {
          if (i in t) {
            const val = t[i];
            if (fun.call(thisArg, val, i, t)) {
              // @ts-ignore
              res.push(val);
            }
          }
        }
        return res;
      };
    }

    // array.find polyfill
    if (!Array.prototype.find) {
      Object.defineProperty(Array.prototype, 'find', {
        value(predicate) {
          if (this == null) {
            throw new TypeError('"this" is null or not defined');
          }

          const o = Object(this);
          const len = o.length >>> 0;
          if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
          }
          const thisArg = arguments[1];
          let k = 0;
          while (k < len) {
            const kValue = o[k];
            if (predicate.call(thisArg, kValue, k, o)) {
              return kValue;
            }
            k++;
          }
          return undefined;
        },
        configurable: true,
        writable: true,
      });
    }

    // foreach polyfill
    if (!Array.prototype.forEach) {
      Array.prototype.forEach = function (callback) {
        let T, k;
        if (this == null) {
          throw new TypeError('this is null or not defined');
        }
        const O = Object(this);
        const len = O.length >>> 0;
        if (typeof callback !== 'function') {
          throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
          T = arguments[1];
        }
        k = 0;
        while (k < len) {
          let kValue;
          if (k in O) {
            kValue = O[k];
            callback.call(T, kValue, k, O);
          }
          k++;
        }
      };
    }
  }
}
