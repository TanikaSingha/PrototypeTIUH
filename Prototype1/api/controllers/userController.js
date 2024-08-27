const { StatusCodes } = require("http-status-codes");
const User = require("../models/userSchema");
const { BadRequest, NotFound } = require("../errors");

const getUser = async (req, res) => {
  const { userId } = req.params;
  const { id } = req.user;

  if (id !== userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Not Authenticated!" });
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new NotFound(`User with id:${userId} not found!`);
  }

  res
    .status(StatusCodes.OK)
    .json({ data: user, message: "Successful in getting user!" });
};

const uploadAvatar = async (req, res) => {
  const { id } = req.user;
  const { avatar } = req.body;
  if (!avatar) {
    throw new BadRequest("Avatar should be selected!");
  }
  const user = await User.findById(id);
  if (!user) {
    throw new NotFound(`User with ${id} not found!`);
  }
  user.avatar = avatar;
  await user.save();
  return res.status(200).json({
    message: "Avatar uploaded successfully",
  });
};

module.exports = { getUser, uploadAvatar };
