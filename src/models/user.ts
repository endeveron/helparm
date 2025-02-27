import {
  Document,
  InferSchemaType,
  Model,
  Schema,
  model,
  models,
} from 'mongoose';
import bcrypt from 'bcrypt';

import { Id, NumReq, StrReq } from 'types/db';
import { IUser } from 'types/user';

interface UserDocument extends IUser, Document<Id> {}

interface Methods {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, {}, Methods>(
  {
    account: {
      name: {
        minlength: 2,
        maxlength: 20,
        trim: true,
        ...StrReq,
      },
      email: {
        unique: true,
        ...StrReq,
      },
      password: {
        minlength: 6,
        ...StrReq,
      },
    },
    role: {
      index: NumReq,
      name: {
        type: String,
        enum: ['user', 'manager', 'admin'],
      },
    },
  },
  {
    versionKey: false,
  }
);

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.account.password = await bcrypt.hash(this.account.password, salt);
    next();
  } catch (err) {
    throw err;
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.account.password);
  } catch (err) {
    throw err;
  }
};

const UserModel: Model<UserDocument, {}, Methods> =
  models.User || model('User', userSchema);

export { UserModel };
