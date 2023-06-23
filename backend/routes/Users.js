const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const {username, password} = req.body;
  
  const user = await Users.findOne({ where: {username: username} });
  
  if(!user) return res.json({error: "USER DOESN'T EXIST"});

  await bcrypt.compare(password, user.password).then((match) => {
    if(!match) return res.json({error: "WRONG USERNAME AND PASSWORD COMBINATION"});

    res.json("YOU LOGGED IN!");
  });
});

module.exports = router;