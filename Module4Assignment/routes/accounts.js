const {Account} = require('../models/account')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
	getAll(req, res) {
		Account.find({}, (error, accounts) => {
			if (error) return res.status(500).send({error})
			res.status(200).send(accounts)
		})
	},
	getById(req, res) {
		if (!ObjectId.isValid(req.params.id)) return res.status(404).send({msg: 'ObjectId invalid'})
		Account.find({_id: req.params.id}, (error, account) => {
			if (error) return res.status(500).send({error})
			res.status(200).send(account)
		})
	},
	add(req, res) {
		let newAccount = new Account(req.body)
		newAccount.save((error, account) => {
			if (error) return res.status(500).send({error})
			res.status(201).send({account, msg:'Account added'})
		})
	},
	update(req, res) {
		if (!ObjectId.isValid(req.params.id)) return res.status(404).send({msg: 'ObjectId invalid'})
		Account.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, account) => {
			if (error) return res.status(500).send({error})
			res.status(200).send({account, msg:'Account updated'})
		})
	},
	delete(req, res) {
		if (!ObjectId.isValid(req.params.id)) return res.status(404).send({msg: 'ObjectId invalid'})
		Account.findByIdAndRemove(req.params.id, (error, account) => {
			if (error) return res.status(500).send({error})
			res.status(204).send()
		})
	}
}
