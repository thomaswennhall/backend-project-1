const User = require('../models/User')

async function addUser(userObj){
  const {email, digest, role} = userObj
  const user = await User.build({
    email,
    digest,
    role
  })
  await user.save()
}

const {users} = require('./users.json')
for(user of users){
  try{
    addUser(user)
  }catch(error){
    console.log(error.message);
  }
}