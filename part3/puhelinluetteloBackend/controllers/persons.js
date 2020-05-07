const personRouter = require('express').Router()
const Person = require('../models/person')

personRouter.get('/', (req, res) => {
  Person.find({})
    .then((persons) => {
      res.json(persons.map((person) => person.toJSON()))
    })
    .catch((error) => {
      console.log(error)
      res.status(404).end()
    })
})

personRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

personRouter.get('/info', (req, res) => {
  const date = new Date()
  Person.estimatedDocumentCount().then((response) => {
    const html = `<p>Puhelinnumerotietokannassa on ${response} yhteystietoa</p>
                    <p>${date}</p>`
    res.send(html)
  })
})

personRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((person) => {
      res.json(person.toJSON())
    })
    .catch((error) => {
      console.log(error)
      next(error)
    })
})

personRouter.post('/', (req, res, next) => {
  const body = req.body
  console.log(body)

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((response) => {
      res.json(response.toJSON())
    })
    .catch((error) => next(error))
})

personRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, useFindAndModify: false })
    .then((updatedNote) => {
      response.json(updatedNote.toJSON())
    })
    .catch((error) => next(error))
})

module.exports = personRouter
