const express = require('express')
require('dotenv').config()

const {userAuth} = require('./middleware/auth')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

// import custom routes
const logInRoutes = require('./routes/logInRoutes')
const userRoutes = require('./routes/userRoutes')
const fakeProfileRoutes = require('./routes/fakeProfileRoutes')

app.use('/v1', logInRoutes)
app.use('/v1/me', userAuth, userRoutes)
app.use('/v1', userAuth, fakeProfileRoutes)

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
})