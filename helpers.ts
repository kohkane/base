interface Array<T> {
  reverseIterate(callback);
  iterate(callback);
}

interface Date {
  yyyymmdd(seperator?: string): string;
  future(days: number): Date;
  addDays(days: number): Date;
}

interface Number {
  formatMoney(c, d, t): string;
}

interface String {
  replaceAll(value: any, replacementValue: string): string;
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

Date.prototype.future = function(days) {
  return new Date(Date.now() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * days));
};

Number.prototype.formatMoney = function(c, d, t) {
  let n = this;
  const s = n < 0 ? '-' : '';
  c = isNaN(c = Math.abs(c)) ? 2 : c;
  d = d === undefined ? '.' : d;
  t = t === undefined ? ',' : t;
  const i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c), 10));
  let j = i.length;
  j = (j) > 3 ? j % 3 : 0;
  if (i) {
    return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
      (c ? d + Math.abs(n - parseFloat(i)).toFixed(c).slice(2) : '');
  }
};

String.prototype.replaceAll = function(value: any, replacementValue: string) {
  return this.replace(new RegExp(value, 'g'), replacementValue);
};

Date.prototype.addDays = function(days: number) {
  return new Date(this.valueOf() + 864E5 * days);
};
/**
 * Generates a unique number Id
 *
 * @author jordanskomer
 */
const generateID = function(): string {
  return Math.random().toString(32).substr(2,9);
};
