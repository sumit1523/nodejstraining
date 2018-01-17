const csvFilePath = 'customer-data.csv'
const fs = require('fs')
const csv = require('csvtojson')
let data = []

csv()
  .fromFile(csvFilePath)
  .on('json',(jsonObj)=>{
    data.push(jsonObj)
  })
  .on('done',(error)=>{
    if (error) return process.exit(1)
    console.log(data)
    fs.writeFile('customer-data.json', JSON.stringify(data, null,4), (error)=>{
      if (error) return process.exit(1)
      console.log('coverted csv data into json')
      process.exit(0)
    })
  }
)