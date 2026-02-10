const User = require("../model/userModel")

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("name email role createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};



const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    console.log(user);
    

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "Admin") {
      return res.status(400).json({ message: "Cannot delete admin user" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
    console.log(error.message);
    
  }
};


module.exports = {
    getAllUsers,
    deleteUser
}