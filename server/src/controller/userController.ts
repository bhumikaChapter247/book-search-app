const UserModel = require('../models').User;
const SearchTitleModel = require('../models').SearchTitle;
const ObjectId = require('mongodb').ObjectID;

// ============ API for social signup =========================
/**
 * @api {post} user/signup  User Signup
 * @apiName User Signup
 * @apiGroup Frontend
 * @apiPermission none
 * @apiDescription Signup API for User
 * @apiParam {String} first_name First name of the User.
 * @apiParam {String} last_name Last name of the User.
 * @apiParam {String} email Email of the User.
 * @apiParam {String} token token of the User.
 * @apiParam {String} imageUrl Image of the User.
 * @apiParamExample {Object} Request-Example:
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
* {
 *   message: "Sign in sucessfully"
 *   code: 200,
 *   data: result,
 * }
 * @apiErrorExample {json} List error
 *  HTTP/1.1 422 Unprocessable Entity
 * {
 *  message: "Invalid request",
 *   success: false
 *}
 *    HTTP/1.1 500 Internal Server Error
 */
const socialSignup = async (req:any, res:any) => {
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
      return res.json({
        code: 200,
        data: { token: token, users: result },
        message: 'Sign in sucessfully',
      });
    }
    return res.json({
      code: 200,
      data: { token: token, users: users },
      message: 'Sign in sucessfully',
    });
  } catch (error) {
    return res.json({ code: 500, error: 'Something went wrong'});
  }
};

// =============== API for saving searched titles =============
/**
 * @api {post} user/savedsearch  Save Search
 * @apiName Save Search
 * @apiGroup Frontend
 * @apiPermission none
 * @apiDescription Save user searched titles
 * @apiParam {String} Title of the book.
 * @apiParam {Integer} id  Id of the User.
 * @apiParamExample {Object} Request-Example:
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
* {
 *   message: "Title saved"
 *   code: 200,
 *   data: result,
 * }
 * @apiErrorExample {json} List error
 *  HTTP/1.1 400 
 * {
 *   code: 400,
 *   message: 'Title already exist',
 *   success: false,
 * }
 *    HTTP/1.1 500 Internal Server Error
 */
const saveSearchedTitles = async (req:any, res:any) => {
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
        data: result,
        message: 'Title saved',
      });
    }
  } catch (error) {
    return res.json({ code: 500, error: 'Something went wrong'});
  }
};

// =============== API to get searched titles ================

/**
 * @api {get} savedtitles/  Get Saved titles of search list
 * @apiName getSavedSearch
 * @apiGroup Frontend
 * @apiPermission user
 * @apiParam {Integer} user_id Id of user.
 * @apiDescription To fetch user searched title details 
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
 *   code: 200,
     data: result,
     message: 'Searched titles'
 * }
 * @apiErrorExample {json}  error
 *    HTTP/1.1 500 Internal Server Error
 */
const getSavedSearch = async (req:any, res:any) => {
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
    return res.json({ code: 500, error: 'Something went wrong'});
  }
};
module.exports = { socialSignup, saveSearchedTitles, getSavedSearch };
