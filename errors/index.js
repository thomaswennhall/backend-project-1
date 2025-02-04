class FuskeluringError extends Error {}

class WrongPassword extends FuskeluringError {
  constructor() {
    super()
    this.message = 'Wrong password, try again!'
    this.status = 403
  }
}
class NotNewPassword extends FuskeluringError {
  constructor() {
    super()
    this.message = 'You have to select a new password.'
    this.status = 403
  }
}
class InvalidBody extends FuskeluringError {
  constructor() {
    super()
    this.message = 'Invalid Body - enter correct email and password.'
    this.status = 403
  }
}
class InvalidCredentials extends FuskeluringError {
  constructor(credentials) {
    super()
    this.message = `Invalid Credentials - please enter correct ${credentials}`
    this.status = 403
  }
}
class Unauthorized extends FuskeluringError {
  constructor() {
    super()
    this.message = 'Unauthorized!'
    this.status = 401
  }
}
class TokenExpired extends FuskeluringError {
  constructor() {
    super()
    this.message = 'Request failed, Try logging in again.'
    this.status = 403
  }
}
class CallsExceeded extends FuskeluringError {
  constructor(timeLeft) {
    super()
    this.message = `Maximum amount of calls exceeded, try again in ${Math.round(timeLeft/1000)} seconds`
    this.status = 401
  }
}

module.exports = {
  FuskeluringError,
  WrongPassword,
  NotNewPassword,
  InvalidBody,
  InvalidCredentials,
  Unauthorized,
  TokenExpired,
  CallsExceeded
}