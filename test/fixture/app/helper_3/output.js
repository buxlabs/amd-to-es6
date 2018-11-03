import md5 from "md5";

export default {
  createCipher: function (value, key) {
    return md5(value, key);
  }
};
