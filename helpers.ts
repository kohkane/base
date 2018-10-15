interface Array<T> {
  reverseIterate(callback);
  iterate(callback);
}

interface Date {
  yyyymmdd(seperator?: string): string;
  getTimeReversed(): number;
}

interface String {
  sanatize(): string;
}

Array.prototype.iterate = function(callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i);
  }
};

Array.prototype.reverseIterate = function(callback) {
  for (let i = this.length - 1; i >= 0; i--) {
    callback(this[i], i);
  }
};

Date.prototype.yyyymmdd = function(seperator?: string) {
  if (typeof seperator === 'undefined') { seperator = '/'; }
  return this.getUTCFullYear() + seperator
    + ('0' + (this.getUTCMonth() + 1)).slice(-2) + seperator
    + ('0' + this.getUTCDate()).slice(-2);
};
/**
 * Returns the dates timestamp in reverse order
 *
 * @author jordanskomer
 */
Date.prototype.getTimeReversed = function() {
  return parseInt(this.getTime().toString().split('').reverse().join(''), 10);
};

String.prototype.sanatize = function() {
  return this.toLowerCase().replace(/ /g, '_').replace(/-/g, '').replace(/\./g, '');
};

/**
 * Generates a unique number Id
 *
 * @author jordanskomer
 */
const generateID = () => {
  return Math.random().toString(32).substr(2, 9);
};
