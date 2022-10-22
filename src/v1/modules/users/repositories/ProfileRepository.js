import Profile from "../models/Profile";

class ProfileRepository {
  constructor() {
    this.profile = Profile;
  }

  async save() {
    await this.profile.save();
  }

  async update(id, data) {
    const profile = await this.profile.findByIdAndUpdate(id, data, {
      new: true,
    });
    return profile;
  }

  async delete(id) {
    const profile = await this.profile.findByIdAndDelete(id);
    return profile;
  }
}

export default new ProfileRepository();
