require("dotenv").config();
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const Token = require("../models/Token");

class UserController {
  static async register(req, res) {
    try {
      const data = req.body;
      const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

      const salt = await bcrypt.genSalt(rounds);
      data["password"] = await bcrypt.hash(data["password"], salt);
      const user = await Users.register(data);
      res.status(201).send(user);
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }

  static async getUserByToken(req, res) {
    try {
      const { token } = req.body;
      const user = await Users.getUserByToken(token);
      const { password, ...userInfo } = user;
      res.status(200).send(userInfo);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  static async login(req, res) {
    try {
      const data = req.body;
      const user = await Users.getByUsername(data.username);
      const authenticated = bcrypt.compare(data["password"], user["password"]);
      if (!authenticated) {
        throw new Error("Wrong username or password");
      } else {
        const token = await Token.create(user["username"]);
        res.status(201).json({
          authenticated: true,
          user: {
            firstName: user.first_name,
            lastName: user.last_name,
            role: user.role,
            username: user.username,
          },
          token: token.token,
        });
      }
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }

  static async updateDetails(req, res) {
    try {
      const data = req.body;
      const resp = await Users.updateDetails(data);
      res.status(200).send(resp);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async logout(req, res) {
    try {
      const tokenObj = req.tokenObj;
      const resp = await tokenObj.deleteToken();
      res.status(202).json({ message: resp });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }
}

module.exports = UserController;
