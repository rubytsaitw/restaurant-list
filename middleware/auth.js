module.exports = {
  authenticator: (req, res, next) => {
    if (req.gitisAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
  }
}