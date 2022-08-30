## How to run the app

Install the modules:

```
npm install
```

Run the app with 

```
npm start 
go to the localhost:3000
```

Couldn't implement multiprocessing for lack of time

## surity percentage
I used very simple approach for surity it returns integers based on fields matched.
for phone num match it give a score 40
for fax num match it give a score 20
all of this are defined in match_rec.js file
these are highly tweakable

In backend it will show debugging info
For queries where no records found from api requests in the  output file suggestion fields are kept blank

Email and facility are not found in the api result so are not implemented

## input file
this is a simple version of the sample excel file provided in the challenge
in source folder the 'input.xlsx' is used for testing
i just implemented for xlsx format




## Note
For each record two api requests are sent
phone num were given more priority in my implementation
for now first name and last name are used for queries
but other fields will be easily added
didn't implement parallelism but could be implemented easily
this app could  be more robust
like resent failed request
making matching functions more robust

## output file
For the sample input file the output file is provinded in the public/downloads folder