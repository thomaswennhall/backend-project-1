const db = require('./connection')

db.serialize(() => {
  db.run('DROP TABLE IF EXISTS users')
  db.run('DROP TABLE IF EXISTS fake_profiles')
  db.run('CREATE TABLE users ("id" INTEGER NOT NULL, "email" TEXT NOT NULL, "password" TEXT NOT NULL, PRIMARY KEY("id" AUTOINCREMENT))')
  db.run('CREATE TABLE fake_profiles ("id" INTEGER NOT NULL, "name" TEXT NOT NULL, "birth_day" TEXT NOT NULL, "birth_city" TEXT NOT NULL, "address" TEXT NOT NULL, "occupation" TEXT NOT NULL, "characteristic" TEXT NOT NULL, "picture" BLOB NOT NULL, "user_id" INTEGER NOT NULL, PRIMARY KEY("id" AUTOINCREMENT), FOREIGN KEY("user_id") REFERENCES "users"("id"))')

  db.get('PRAGMA foreign_keys = ON')
})

