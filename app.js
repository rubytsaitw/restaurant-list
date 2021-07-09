// Require packages
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const Restaurant = require('./models/restaurant')
// const restaurantList = require('./restaurant.json')


// Status of connection with database
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// Express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set static files
app.use(express.static('public'))

// Routes setting
app.get('/', (req, res) => {
  console.log('done')
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const image = req.body.image
  const category = req.body.category
  const rating = req.body.rating
  const location = req.body.location
  const goole_map = req.body.goole_map
  const phone = req.body.phone
  const description = req.body.description

  return Restaurant.create({
    name, image, category, rating, location, goole_map, phone, description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// queryString
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) ||
      restaurant.category.toLowerCase().includes(keyword)
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// params
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(
    restaurantList => restaurantList.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant: restaurant })
})

// Start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})