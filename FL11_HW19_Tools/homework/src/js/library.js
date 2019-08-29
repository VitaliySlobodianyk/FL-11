let lib = {
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },
  uppercaseFirstLetter(string) {
    if (string.length > 1 && typeof string === 'string') {
      return string[0].toUpperCase() + string.slice(1);
    } else if (string.length === 1) {
      return string.toUpperCase();
    }
  }
};
window.lib = lib;
