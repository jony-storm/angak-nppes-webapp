// import fetch from 'node-fetch';
// const fs = require('fs')
// const fetch = require('node-fetch')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const fetchWithFirstNameAndLastName = async (firstName, lastName) => {
  const response = await fetch(`https://npiregistry.cms.hhs.gov/api/?version=2.1&first_name=${firstName}&last_name=${lastName}`, {
    headers: {
      'Accept': 'application/json',
    }
  });
  console.log("checking status: " + response.status !== 200);
  return await response.json();
}

const fetchWithFirstName = async (firstName) => {
  const response = await fetch(`https://npiregistry.cms.hhs.gov/api/?version=2.1&first_name=${firstName}`, {
    headers: {
      'Accept': 'application/json',
    }
  });
  return await response.json();
}

const fetchWithLastName = async (lastName) => {
  const response = await fetch(`https://npiregistry.cms.hhs.gov/api/?version=2.1&last_name=${lastName}`, {
    headers: {
      'Accept': 'application/json',
    }
  });
  
  const result = await response.json();  
  return result
}

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
      
      // if (first && !(record.first_name + record.lastname).toLowerCase().includes(first.toLowerCase())) return;
      // if (first && !(record.first_name + record.lastname).toLowerCase().includes(first.toLowerCase())) return;

      if (
        (first && fullname.toLowerCase().includes(first.toLowerCase()) )
      ||  
        (last && fullname.toLowerCase().includes(last.toLowerCase()))
      ) {
        console.log(fullname);
        results.push(record);
      }
    });
  }

  if (first || last) {
    console.log("first and last here");
    const result1 = await fetchWithFirstNameAndLastName(first, last);  
    const result2 = await fetchWithFirstNameAndLastName(last, first);
    addResults(result1.results)
    addResults(result2.results)
  } 
  // else {
  //   console.log("first and no last here");
  //   const result1 = await fetchWithFirstName(first);
  //   const result2 = await fetchWithLastName(first);
  //   addResults(result1.results)
  //   addResults(result2.results)
  // }
  return (results);
}



if (require.main === module) {
  (async () => {
    console.log("First name: " + process.argv[2]+ " and last name: " + process.argv[3]);
    const rec_list = await fetch_rec("rebecca", "aarts")
    // await fetch_rec("john", "")
    // await fetch_rec("", "aarts")
    console.log(rec_list);
    // console.log(rec_list.results[0].basic)
    // console.log(rec_list.results[0].address)

    // const rec_list2 = await fetchWithFirstName("john")
    // const rec_list2 = await fetchWithFirstNameAndLastName("", "aarts")
    // const rec_list3 = await fetchWithFirstNameAndLastName("john", "")
    // console.log(rec_list2)
    // console.log(rec_list3)

  })()
}
module.exports.fetch_rec = {fetch_rec, fetchWithFirstName, fetchWithLastName, fetchWithFirstNameAndLastName}