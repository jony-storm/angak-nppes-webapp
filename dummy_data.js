const XLSX = require('xlsx');
const dummy_data = [
  {
    'PI Last Name': 'Rha',
    'PI First Name': 'Seung-Woon',
    Addrss: '148, Gurodong-ro, Guro-gu,',
    City: 'Seoul',
    'State/Province': 'Not Applicable',
    Country: 'Korea, Republic of',
    'PI Phone #': '+82226263020',
    'PI Fax #': '+8228643062',
    'PI Email': 'swrha617@yahoo.co.kr'
  },
  {
    'PI Last Name': 'Hyon',
    'PI First Name': 'Min-Su',
    Addrss: '59, Daesagwan-ro, Yongsan-gu,',
    City: 'Seoul',
    'State/Province': 'Not Applicable',
    Country: 'Korea, Republic of',
    'PI Phone #': '+8227099481',
    'PI Fax #': '+8227099194',
    'PI Email': 'mshyon@yahoo.com'
  },
  {
    'PI Last Name': 'Jo',
    'PI First Name': 'Sang-Ho',
    Addrss: '22, Gwanpyeong-ro 170beon-gil',
    City: 'Anyang-si',
    'State/Province': 'Gyeonggi-do',
    Country: 'Korea, Republic of',
    'PI Phone #': '+82313803722',
    'PI Fax #': '+82313862269',
    'PI Email': 'sophi5@medimail.co.kr'
  },
  {
    'PI Last Name': 'Park',
    'PI First Name': 'Hyung-Wook',
    Addrss: '42, Jebong-ro, Dong-gu',
    City: 'Gwangju',
    'State/Province': 'Not Applicable',
    Country: 'Korea, Republic of',
    'PI Phone #': '+82622206415',
    'PI Fax #': '+82622233105',
    'PI Email': 'mdhwp@chol.com'
  },
  {
    'PI Last Name': 'Stonkus',
    'PI First Name': 'Sigitas',
    Addrss: 'Kretingos g. 65',
    City: 'Klaipeda',
    'State/Province': '',
    Country: 'Lithuania',
    'PI Phone #': '+37046396539',
    'PI Fax #': '+37046402057',
    'PI Email': 'stonkus@navickopoliklinika.lt'
  },
  {
    'PI Last Name': 'Rosman',
    'PI First Name': 'Hj. Azhari',
    Addrss: '145 Jalan Tun Razak',
    City: 'Kuala Lumpur',
    'State/Province': 'Kuala Lumpur',
    Country: 'Malaysia',
    'PI Phone #': '+60326178434',
    'PI Fax #': '+60326928425',
    'PI Email': 'azhari@ijn.com.my'
  },
  {
    'PI Last Name': 'Chua',
    'PI First Name': 'Ernesto',
    Addrss: 'Room 411 Medical Arts Building',
    City: 'Manila',
    'State/Province': '',
    Country: 'Philippines',
    'PI Phone #': '+6327719000',
    'PI Fax #': '',
    'PI Email': 'echuamd@yahoo.com'
  },
  {
    'PI Last Name': 'Ganzon',
    'PI First Name': 'Marie Simonette',
    Addrss: '279 E. Rodriguez Sr. Blvd.',
    City: 'Quezon City',
    'State/Province': '',
    Country: 'Philippines',
    'PI Phone #': '+6327230101',
    'PI Fax #': '+6327230101',
    'PI Email': 'mariesimonette@yahoo.com'
  },
  {
    'PI Last Name': 'Lee',
    'PI First Name': 'Cheng-Han',
    Addrss: 'No. 138 Sheng-Li Road',
    City: 'Tainan',
    'State/Province': '',
    Country: 'Taiwan, Republic of China',
    'PI Phone #': '+8862353535X2389 0000000 00000',
    'PI Fax #': '+88662095387',
    'PI Email': 'appollolee@hotmail.com'
  },
  {
    'PI Last Name': 'Abernethy',
    'PI First Name': 'William',
    Addrss: '5 Vanderbilt Park Dr',
    City: 'Asheville',
    'State/Province': 'North Carolina',
    Country: 'United States',
    'PI Phone #': '828274600148463',
    'PI Fax #': '8282746010',
    'PI Email': 'abernethy@avlcard.com'
  }
];
// console.log(dummy_data);

// module.exports.dummy_data = dummy_data

const ws = XLSX.utils.json_to_sheet(dummy_data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "wakia");
XLSX.writeFile(wb, "sample_output.xlsx");
