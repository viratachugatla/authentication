const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { regesterValidation, loginValidation } = require("../validation");

router.post("/regester", async (req, res) => {
  // Validation
  const { error } = regesterValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // If email exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("User already exists");

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login api
router.post("/login", async (req, res) => {
  // validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // If email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User is not regestered");

  //checking password
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send("Email or password is incorrect");

  // create and assign a token
  const token = jwt.sign({ _id: user._id }, "viratsecret");
  res.header("auth-token", token).send(token);

  res.send("Logged innnnnn");
});

module.exports = router;
