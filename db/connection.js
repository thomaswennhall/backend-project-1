const sqlite = require('sqlite3')

const db = new sqlite.Database('fuskeluring.db')

module.exports = db