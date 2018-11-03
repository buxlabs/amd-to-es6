define("crypto", ["md5"], function (md5) {
  "use strict";

  return {
    createCipher: function (value, key) {
      return md5(value, key);
    }
  };

});
