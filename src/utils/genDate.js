const persianDate = require('persian-date');
persianDate.toLocale('en');
let date = new persianDate().format('YYYY/MM/DD');

module.exports = { date };
