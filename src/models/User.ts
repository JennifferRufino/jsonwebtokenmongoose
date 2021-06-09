import mongoose from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface todoModelInterface extends mongoose.Model<TodoDoc> {
  build(attr: IUser): TodoDoc
}

interface TodoDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.statics.build = (attr: IUser) => {
  return new User(attr)
}

const User = mongoose.model<TodoDoc, todoModelInterface>('UserData', userSchema)

export {User}