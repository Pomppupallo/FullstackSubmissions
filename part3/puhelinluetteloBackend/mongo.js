const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const nameToAdd = process.argv[3]
const numberToAdd = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@phonebook-7xu8d.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((note) => {
      console.log(note.name, note.number)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: nameToAdd,
    number: numberToAdd,
  })

  person.save().then((response) => {
    console.log(
      `added ${response.name} number ${response.number} to phonebook`
    )
    mongoose.connection.close()
  })
}
