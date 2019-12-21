const moment = require("moment");

//first add moment nom module
let someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

let date = moment();
// console.log(date.format('MMM Do, YYYY'));//MMM SHOW UP THE SHORT NAME OF MONTH , ad YYYY show up the year => DOC : momentjs.com
console.log(date.format('h:mm a'));