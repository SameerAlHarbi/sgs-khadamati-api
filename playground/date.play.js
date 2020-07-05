const date = require('../src/util/date');

const dt = new Date();

console.log(dt);
console.log(dt.toISOString());
console.log(dt.toUTCString());

const formatedDate1 = date.formatDate(dt, date.defaultTextDateFormat);
console.log(formatedDate1);

const d = '917';

console.log(typeof(d));
console.log(Number(d));
console.log(isNaN(Number(d)));