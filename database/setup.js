const db = require('./connection')
require('../models/User')
require('../models/FakeProfile')

db.sync()