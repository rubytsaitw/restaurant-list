const express = require('express')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email) {
    errors.push({ message: 'Please fill email.' })
  }
  if (!password || !confirmPassword) {
    errors.push({ message: 'Please fill password & confirm password.' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Passwords do not match.' })
  }
  if (errors.length) {
    return res.render('register', {
      errors, name, email, password, confirmPassword
    })
  }
  // User.findOne({ email })
  //   .then(user => {
  //     if (user) {
  //       errors.push({ message: 'This email already exists.' })
  //       return res.render('register', { errors, name, email, password, confirmPassword })
  //     }
  //     return bcrypt
  //       .genSalt(10)
  //       .then(salt => bcrypt.hash(password, salt))
  //       .then(hash => User.create({
  //         name,
  //         email,
  //         password: hash
  //       }))
  //       .then(() => res.redirect('/'))
  //       .catch(error => console.log(error))
  //   })
})

module.exports = router