const match = require('./matching_functions')
const ori_rec1 = {
    'PI Last Name': 'FOLEY',
    'PI First Name': 'PAUL',
    'Address': '599 W STATE ST STE 302',
    'City': 'LAFAYETTE',
    'State/Province': 'PA',
    'Country': 'United States',
    'PI Phone #': '215-230-6982',
    'PI Fax #': '215-230-6983',
    'PI Email': 'i@nothing.com',
}
const ori_rec2 = {
    'PI Last Name': 'FOLEY',
    'PI First Name': 'PAUL',
    'Address': '599 W STATE ST STE 302',
    'City': 'LAFAYETTE',
    'State/Province': 'LA',
    'Country': 'United States',
    'PI Phone #': '345-230-6982',
    'PI Fax #': '215-230-6983',
    'PI Email': 'i@nothing.com',
}

const resps = [
    {
        number: 243349805,
        last_name: 'FOLEY',
        first_name: 'PAUL',
        address: '599 W STATE ST STE 302',
        city: 'LAFAYETTE',
        state: '',
        country: 'United States',
        phone: '215-230-6982',
        fax: '215-230-6983',
    },
    {
        number: 243349805,
        last_name: 'FOLEY',
        first_name: 'PAUL',
        address: '599 W STATE ST STE 302',
        city: 'LAFAYETTE',
        state: 'PA',
        country: 'United States',
        phone: '215-230-6982',
        fax: '215-230-6983',
    },
    {
        number: 242239805,
        last_name: 'FOLEY',
        first_name: 'PAUL',
        address: '599 W STATE ST STE 302',
        city: 'LAFAYETTE',
        state: 'SA',
        country: 'United States',
        phone: '215-230-6982',
        fax: '333-230-6983',
    }
  ]

function match_record(excel_rec, api_res) {
    const matched = {
        last_name: excel_rec['PI Last Name'].toLowerCase() === api_res.last_name.toLowerCase(),
        first_name: excel_rec['PI First Name'].toLowerCase() === api_res.first_name.toLowerCase(),
        address: excel_rec['Address'].toLowerCase() === api_res.address.toLowerCase(),
        city: excel_rec['City'].toLowerCase() === api_res.city.toLowerCase(),
        state: excel_rec['State/Province'].toLowerCase() === api_res.state.toLowerCase(),
        country: excel_rec['Country'].toLowerCase() === api_res.country.toLowerCase(),
        phone: match.phone(excel_rec['PI Phone #'], api_res.phone),
        fax: match.fax(excel_rec['PI Fax #'], api_res.fax),
    };
    api_res.surity = surity(matched);
}


function add_suggestion(prec, lrec) {
    const newrec = {}
    newrec['PI Last Name'] = prec['PI Last Name'];
    newrec['Suggested PI Last Name'] = lrec.last_name;
    newrec['PI First Name'] = prec['PI First Name'];
    newrec['Suggested PI First Name'] = lrec.first_name;
    newrec['Address'] = prec['Address'];
    newrec['Suggested Address'] = lrec.address;
    newrec['City'] = prec['City'];
    newrec['Suggested City'] = lrec.city;
    newrec['State/Province'] = prec['State/Province'];
    newrec['Suggested State/Province'] = lrec.state;
    newrec['Country'] = prec['Country'];
    newrec['Suggested Country'] = lrec.country;
    newrec['PI Phone #'] = prec['PI Phone #'];
    newrec['Suggested PI Phone #'] = lrec.phone;
    newrec['PI Fax #'] = prec['PI Fax #'];
    newrec['Suggested PI Fax #'] = lrec.fax;
    newrec['PI Email'] = prec['PI Email'];
    newrec['Suggested PI Email'] = "";
    newrec['Surity Percentage'] = lrec.surity;
    return newrec
}

function greatest_match(recs) {
    let score = 0
    let index = 0
    recs.forEach((rec, i) => {
        if(rec.surity > score) {
            score = rec.surity
            index = i
        }
    })
    return index
}

function surity(mch) {
    let percent = 0;
    percent += mch.last_name ? 10: 0;
    percent += mch.first_name ? 10: 0;
    percent += mch.address ? 5: 0;
    percent += mch.city ? 5: 0;
    percent += mch.state ? 5: 0;
    percent += mch.country ? 5: 0;
    percent += mch.phone ? 40: 0;
    percent += mch.fax ? 20: 0;    
    return percent;
}

function exc_gen_output(ori_rec, resps) {
    resps.forEach((res) => {
        match_record(ori_rec1, res);
    })
    const index = greatest_match(resps);
    const new_rec = add_suggestion(ori_rec, resps[index])
    return new_rec;
}

// const new_rec = exc_gen_output(ori_rec1, resps)
// console.log(new_rec)
module.exports.exc_gen_output = exc_gen_output