const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('../../restaurant.json').results // 載入 restaurant.json
const db = require('../../config/mongoose')

const SEED_USERS = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  hasRestaurantId: [1, 2, 3]
},
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678',
  hasRestaurantId: [4, 5, 6]
}]

db.once('open', () => {
  Promise.all(Array.from(SEED_USERS, (SEED_USER, i) => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      .then(hash =>
        User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash
        }))
      .then(user => {
        const userId = user._id
        const restaurants = restaurantList.filter(restaurant => SEED_USER.hasRestaurantId.includes(restaurant.id))
        restaurants.forEach(restaurant => { restaurant.userId = userId })
        return Restaurant.create(restaurants)
      })
  }))
    .then(() => {
      console.log('seeder done.')
      process.exit()
    })
    .catch(error => console.log(error))
})

// 參考Linus同學的作業
// https://github.com/Linus-Peng1/AC_restaurant-list-A6/blob/main/models/seeds/restaurantSeeder.js