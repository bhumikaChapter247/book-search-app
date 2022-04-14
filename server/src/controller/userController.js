const UserModel = require('../models').User;
const socialSignup = async (req, res) => {
  const { first_name, last_name, email, token, imageUrl } = req.body;
  try {
    let users = await UserModel.findOne({
      where: { email: email },
    });
    if (!users) {
      let result = await UserModel.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        imageUrl: imageUrl,
      });
      users = result.dataValues;
      res.json({
        responseCode: 200,
        data: { token: token, users: users },
        message: 'Sign in sucessfully',
      });
    }
    res.json({
      responseCode: 200,
      data: { token: token, users: users },
      message: 'Sign in sucessfully',
    });
  } catch (error) {
    res.json({ responseCode: 500, error: 'Something went wrong' });
  }
};
module.exports = { socialSignup };
