import mongoose from "mongoose";
import { Password } from "../services/password";

/**
 * An @interface that describes the properties
 * that are required to create a new User
 * @property email string
 * @property password string
 */
interface UserAttrs {
  email: string;
  password: string;
  userName: string;
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
}

/**
 * An @interface that describes the properties
 * that a User Model has
 * @method createUser
 */
interface UserModal extends mongoose.Model<UserDoc> {
  createUser(attr: UserAttrs): UserDoc;
}

/**
 * An @interface that describes the properties
 * that a User Document has
 * @method createUser
 */
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  userName: string;
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        delete ret.iat;
      },
    },
  }
);

userSchema.statics.createUser = (attr: UserAttrs) => new User(attr);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

const User = mongoose.model<UserDoc, UserModal>("User", userSchema);

export { User };
