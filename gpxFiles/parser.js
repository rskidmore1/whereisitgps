// const xml2js = require('xml2js');
// const fs = require('fs');
// const parser = new xml2js.Parser({ attrkey: 'ATTR' });

// // this example reads the file synchronously
// // you can read it asynchronously also
// const xml_string = fs.readFileSync('20210818-140208 - Track 3.gpx', 'utf8');

// let jsonContent;
// parser.parseString(xml_string, function (error, result) {
//   if (error === null) {
//     console.log(result);
//     jsonContent = JSON.stringify(result);
//   } else {
//     console.log(error);
//   }
// });

// fs.writeFile('./test.json', jsonContent, err => {
//   if (err) {
//     console.error(err);

//   }
//   // file written successfully
// });
