const {models} = require('./seed')

async function addUser(userObj){
  const {email, passwordHash} = userObj
  const user = await models.User.build({
    email,
    passwordHash
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