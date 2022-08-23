const match = require('./matching_functions')
console.log(match.phone("+880176", "017-6"));
console.log(match.phone("017-6", "+880176", ));
console.log(match.phone("+880196", "017-6"));
console.log(match.phone("+880196", ""));
console.log(match.phone("","+880196", ""));
console.log(match.phone("", "", ""));

