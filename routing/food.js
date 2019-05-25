const router = require('express').Router()
const { connection } = require('../connect/db')
const { queries } = require('../connect/queries')
const { response } = require('../connect/response')

const apiPath = '/api/v1'

router.get(`${apiPath}/food/id/:id`, (req, res) => {
  connection(req, res, queries.foodById(req.params.id))
})

router.get(`${apiPath}/food/name/:name`, (req, res) => {
  connection(req, res, queries.foodByName(req.params.name))
})

router.get(`${apiPath}/food`, (req, res) => {
  if (req.query.id) {
    connection(req, res, queries.foodById(req.query.id))
  } else if (req.query.name) {
    connection(req, res, queries.foodByName(req.query.name))
  } else {
    response(
      res,
      400,
      apiPath +
        '/food endpoint requires one query string parameter (id, name)'
    )
  }
})

router.get(`${apiPath}/foods`, (req, res) => {
  connection(req, res, queries.foods)
})

module.exports = router
