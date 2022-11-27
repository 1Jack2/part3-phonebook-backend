const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://jack:${password}@cluster0.ghmzqu5.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const generateId = () => {
  return Math.floor(10000 * Math.random())
}

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')
    if (process.argv.length > 3) {
      const person = new Person({
        id: generateId(),
        name: process.argv[3],
        number: process.argv[4]
      })
      person.save().then(() => {
        console.log('person saved!')
        mongoose.connection.close()
      })
    } else {
      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
    }
  })
  .catch((err) => console.log(err))

