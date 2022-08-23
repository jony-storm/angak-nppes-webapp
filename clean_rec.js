const fs = require('fs')
try {
    const jsonString = fs.readFileSync("./data_sample.json");
    const result = JSON.parse(jsonString);
    const new_results = [];
    function addResults(items) {
        items.forEach(item => {
          const record = {
            number: item.numer || "",
            last_name: item.basic.last_name || "",
            first_name: item.basic.first_name || "",
            address: item.addresses[0].address_1 || "",
            city: item.addresses[0].city || "",
            state: item.addresses[0].state || "",
            country: item.addresses[0].country_name || "",
            phone: item.addresses[0].telephone_number || "",
            fax: item.addresses[0].fax_number || "",
            fax: item.addresses[0].email || "",
          }
          new_results.push(record);
        });
    }
    addResults(result.results);
    console.log(new_results);
  } catch (err) {
    console.log(err);
  }