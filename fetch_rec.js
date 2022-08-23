const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const fetchWithFirstNameAndLastName = async (firstName, lastName) => {
  try {
    const response = await fetch(
      `https://npiregistry.cms.hhs.gov/api/?version=2.1&first_name=${firstName}&last_name=${lastName}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!response.error) {
      return await response.json();
    } else {
      return null;
    }
  } catch (err) {
    console.log("fetching error");
    return null;
  }
};

async function fetch_rec(first, last)  {
  const results = [];

  const addResults = (items) => {
    items.forEach(item => {
      const record = {
        number: item.number,
        first_name: item.basic.first_name || "",
        last_name: item.basic.last_name || "",
        // address: `${item.addresses[0].address_1}, ${item.addresses[0].address_2}, ${item.addresses[0].city}, ${item.addresses[0].state} ${item.addresses[0].country_name}`,
        address: item.addresses[0].address_1 || "",
        city: item.addresses[0].city || "",
        state: item.addresses[0].state || "",
        country:item.addresses[0].country_name || "",
        phone: item.addresses[0].telephone_number || "",
        fax: item.addresses[0].fax_number || "",
      }
      if (results.findIndex(a => a.number === item.number) !== -1) return;
      let fullname = record.first_name + " " +  record.last_name      
      
      if (
        (first && fullname.toLowerCase().includes(first.toLowerCase()) )
      ||  
        (last && fullname.toLowerCase().includes(last.toLowerCase()))
      ) {
        results.push(record);
      }
    });
  }

  if (first || last) {
    const result1 = await fetchWithFirstNameAndLastName(first, last);  
    const result2 = await fetchWithFirstNameAndLastName(last, first);
    result1 && addResults(result1.results)
    result2 && addResults(result2.results)
  } 
  return (results);
}



if (require.main === module) {
  (async () => {
    console.log("First name: " + process.argv[2]+ " and last name: " + process.argv[3]);
    const rec_list = await fetch_rec("james", "aarts")
    console.log(rec_list);
  })()
}
module.exports.fetch_rec = fetch_rec