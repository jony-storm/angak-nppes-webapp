const fetch_rec = require('./fetch_rec.js')

// console.log(fetch_rec);

(async () => {
    try {const records = await fetch_rec.fetch_rec( process.argv[2] || "" , process.argv[3] || "")
    console.log(records);
    }catch(err) {
        console.log("error");
    }
})()