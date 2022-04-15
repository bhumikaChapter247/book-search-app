const UserModel = require('../models').User;
const SearchTitleModel = require('../models').SearchTitle;
const ObjectId = require('mongodb').ObjectID;

// ============ API for social signup =========================
const socialSignup = async (req, res) => {
  const { first_name, last_name, email, token, imageUrl } = req.body;
  try {
    let users = await UserModel.findOne({
      email: email,
    });
    if (!users) {
      let result = await UserModel.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        imageUrl: imageUrl,
      });
      users = result.dataValues;
      return res.json({
        code: 200,
        data: { token: token, users: users },
        message: 'Sign in sucessfully',
      });
    }
    return res.json({
      code: 200,
      data: { token: token, users: users },
      message: 'Sign in sucessfully',
    });
  } catch (error) {
    return res.json({ code: 500, error: 'Something went wrong' });
  }
};

// =============== API for saving searched titles =============
const saveSearchedTitles = async (req, res) => {
  const { title, id } = req.body;
  try {
    let getTitle = await SearchTitleModel.findOne({
      title: { $regex: title, $options: 'i' },
    });
    if (getTitle) {
      throw {
        code: 400,
        message: 'Title already exist',
        success: false,
      };
    } else {
      let result = await SearchTitleModel.create({
        title: title,
        user_id: ObjectId(id),
      });
      return res.json({
        code: 200,
        data: { token: token, title: result },
        message: 'Title saved',
      });
    }
  } catch (error) {
    return res.json({ code: 500, error: 'Something went wrong' });
  }
};

// =============== API to get searched titles ================
const getSavedSearch = async (req, res) => {
  try {
    let result = await SearchTitleModel.find({
      user_id: req.query.id,
    });
    return res.json({
      code: 200,
      data: result,
      message: 'Searched titles',
    });
  } catch (error) {
    return res.json({ code: 500, error: 'Something went wrong' });
  }
};
module.exports = { socialSignup, saveSearchedTitles, getSavedSearch };
