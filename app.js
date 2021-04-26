const express = require('express')
require('dotenv').config()

const errorHandler = require('./middleware/errorHandler')
const logger = require('./middleware/logger')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(logger)

const userRoutes = require('./routes/userRoutes')
const fakeProfileRoutes = require('./routes/fakeProfileRoutes')

app.use('/v1', userRoutes)
app.use('/v1', fakeProfileRoutes)

app.use( errorHandler )

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
})