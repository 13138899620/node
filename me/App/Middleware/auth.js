function Auth (req, res, next) {
  console.log('Auth start')
  next(req, res)
  console.log(' Auth end ')
}

exports.Auth = Auth
