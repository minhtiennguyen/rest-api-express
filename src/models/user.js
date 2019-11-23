import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  }
});

// login by username or password
userSchema.statics.findbyLogin = async function(login) {
  let user  = await this.findOne({ username : login });

  if(!user) {
    user  = await this.findOne({ email : login });
  }

  return user;
}

// delete related messages
userSchema.pre('remove', function(next){
  this.model('Message').deleteMany({ user: this._id }, next);
});

const User = mongoose.model('User', userSchema);

export default User;