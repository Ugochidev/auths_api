import User from "../../users/models/User";

class UserRepository {
  async create(data) {
    const user = await User.create(data);
    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async save(user) {
    await user.save();
  }

  async findById(id) {
    const user = await User.findById(id).populate("profile");
    return user;
  }

  async list({ page, limit, email, startDate, endDate, isLogin }) {
    const query = {};
    if (email) {
      query.email = email;
    }
    if (startDate && endDate && !isLogin) {
      query.createdAt = { $gte: startDate, $lte: endDate };
    }
    if (startDate && endDate && isLogin) {
      query.lastLogin = { $gte: startDate, $lte: endDate };
    }

    const users = await User.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("profile")
      .exec();

    const count = await User.countDocuments(query);

    return {
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      users,
    };
  }

  async update(id, data) {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return user;
  }

  async delete(id) {
    const user = await User.findByIdAndDelete(id);
    return user;
  }

  async isAdmin(id) {
    const user = await User.find({
      id
    });

    console.log(user);

    if (user.role === "ADMIN") {
      return true;
    }
    return false;
  }
}

export default new UserRepository();
