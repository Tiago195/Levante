const jwt = require("jsonwebtoken");

const secret = process.env.SECRET ?? "senha super secreta";

const options = { expiresIn: "7d" };

module.exports = {
  encode: (data) => {
    delete data.password;
    const token = jwt.sign({ data }, secret, options);
    return { ...data, token };
  },
  decode: (token) => jwt.verify(token, secret, options)
};
