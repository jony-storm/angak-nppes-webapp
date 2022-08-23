const reader = require('xlsx');
const file = reader.readFile('./Book1.xlsx');
let records = [];
// const sheets = file.SheetNames
const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]], {header : []});
temp.forEach((res) => {
    const record = {
        'PI Last Name': res['PI Last Name'] || "",
        'PI First Name': res['PI First Name'] || "",
        'Addrss': res['Address'] || "",
        'City': res['City'] || "",
        'State/Province': res['State/Province'] || "",
        'Country': res['Country'] || "",
        'PI Phone #': res['PI Phone #'] || "",
        'PI Fax #': res['PI Fax #'] || "",
        'PI Email': res['PI Email'] || "",
    }
   records.push(record);
})
// Printing data
console.log(records.slice(50, 60));
