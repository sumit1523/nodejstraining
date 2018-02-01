const mongodb = require('mongodb')
const url = 'mongodb://localhost:27017'
const dbName = 'bitcoinExchange'

const async = require('async')

const customers = require('./data/customer-data.json')
const customerAddresses = require('./data/customer-address-data.json')

let tasks = []
const limit = parseInt(process.argv[2], 10) || 1000

mongodb.MongoClient.connect(url, (error, client) => {
	if (error) return process.exit(1)
	console.log('Connected to '+url+'/'+dbName)
	const db = client.db(dbName)

	customers.forEach((customer, index) => {
		customers[index] = Object.assign(customer, customerAddresses[index])
		if (index % limit == 0) {
			const start = index
			const end = (start + limit > customers.length) ? customers.length : start + limit
			tasks.push((done) => {
				console.log(`Processing items ${start + 1} - ${end} of ${customers.length}`)
				db.collection('customers').insert(customers.slice(start, end), (error, results) => {
					done(error, results)
				})
			})
		}
	})

	console.log('Processing '+tasks.length+' task'+((tasks.length > 1) ? 's' : ''))
	const startTime = Date.now()

	async.parallel(tasks, (error, results) => {
		if (error) console.error(error)
		const endTime = Date.now()
		console.log(`Execution time: ${endTime - startTime}`)
		client.close()
	})
})
