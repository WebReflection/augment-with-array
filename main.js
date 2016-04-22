/**
  Copyright (C) 2016 by Andrea Giammarchi - @WebReflection

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
var augmentWithArray = [
  Array,
  {
    list: ['filter', 'map', 'slice', 'splice'],
    wrap: function (descriptor, Constructor) {
      var method = descriptor.value;
      descriptor.value = function () {
        return new Constructor(
          method.apply(this, arguments)
        );
      };
      return descriptor;
    }
  },
  {
    list: ['concat'],
    wrap: function (descriptor, Constructor) {
      var method = descriptor.value;
      var slice = Array.prototype.slice;
      descriptor.value = function () {
        return new Constructor(
          method.apply(slice.call(this, 0), arguments)
        );
      };
      return descriptor;
    }
  }
];

if (typeof augmentWith === 'function')
  augmentWith.Array = augmentWithArray;

try { module.exports = augmentWithArray; }
catch(meh) { this.augmentWithArray = augmentWithArray; }