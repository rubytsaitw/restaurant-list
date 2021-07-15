const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


// Create
router.get('/new', (req, res) => {
  return res.render('new')
})

// Search: 必須要放在'/:id' 前面，否則會被當成某種id
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  Restaurant.find(
    {
      $or: [{ name: { $regex: keyword, $options: 'i' } }, { category: { $regex: keyword, $options: 'i' } }]
    }
  )
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.error(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// Update
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// Read
router.post('/', (req, res) => {
  const { name, image, category, rating, location, google_map, phone, description } = req.body
  return Restaurant.create({
    name, image, category, rating, location, google_map, phone, description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.image = req.body.image
      restaurant.category = req.body.category
      restaurant.rating = req.body.rating
      restaurant.location = req.body.location
      restaurant.google_map = req.body.google_map
      restaurant.phone = req.body.phone
      restaurant.description = req.body.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// Delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router 