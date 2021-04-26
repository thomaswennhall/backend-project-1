const express = require('express')
require('dotenv').config()

const errorHandler = require('./middleware/errorHandler')
const logger = require('./middleware/logger')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(logger)

// import custom routes
const logInRoutes = require('./routes/logInRoutes')
const userRoutes = require('./routes/userRoutes')
const fakeProfileRoutes = require('./routes/fakeProfileRoutes')

app.use('/v1', logInRoutes)
app.use('/v1/me', userRoutes)
app.use('/v1', fakeProfileRoutes)

app.use( errorHandler )

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
})