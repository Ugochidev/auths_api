import mongoose from "mongoose";
import Profile from "./Profile";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
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
    role: {
      type: String,
      required: true,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// create a profile for the user when the user is created
UserSchema.pre("save", async function (next) {
  if (!this.profile) {
    const profile = await Profile.create({});
    this.profile = profile._id;
  }
  next();
});

// delete the profile when the user is deleted
UserSchema.pre("remove", async function (next) {
  await Profile.findByIdAndDelete(this.profile);
  next();
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  delete user.profile.__v;
  return user;
};

export default mongoose.model("User", UserSchema);
