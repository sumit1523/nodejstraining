module.exports = {
	notFound(req, res) {
		res.status(404).send({msg: 'Resource not found'})
	}
}
