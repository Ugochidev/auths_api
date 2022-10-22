import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      default: " ",
    },
    lastName: {
      type: String,
      required: true,
      default: " ",
    },
    avatar: {
      type: String,
      required: true,
      default:
        "https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg",
    },
    phone: {
      type: String,
      required: true,
      default: " ",
    },
    country: {
      type: String,
      required: true,
      default: " ",
    },
  },
  { timestamps: true }
);

ProfileSchema.methods.toJSON = function () {
  const profile = this.toObject();
  delete profile.__v;
  return profile;
};

export default mongoose.model("Profile", ProfileSchema);
