const User = require('../models').User;
console.log('User', User);
const socialSignup = async (req, res) => {
  const { first_name, last_name, email, token, imageUrl } = req.body;
  try {
    let users = await User.findOne({
      where: { email: email },
    });
    if (!users) {
      let result = await User.build({
        first_name: first_name,
        last_name: last_name,
        email: email,
        imageUrl: imageUrl,
      }).save();
      users = result.dataValues;
      res.json({ token: token, id: users.id });
    }
    res.json({ token: token, id: users.id });
  } catch (error) {
    res.json({ error: 'Something went wrong' });
  }
};
module.exports = { socialSignup };
