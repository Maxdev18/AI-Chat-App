const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

// Generate a userId for use within the application
function generateUserAppId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let id, user;

  while(!user) {
    for(let i = 0; i < 9; i++) {
      id += chars[Math.floor(Math.random() * 36)];
    }

    user = User.findOne({ userAppId: id })
    if(user) {
      user = '';
      id = '';
      continue;
    } else {
      break;
    }
  }
  
  return id;
}

// Generate default user profile picture
function generateProfilePic(pic) {
  let profilePic = {};

  // Generate random hex code for profile background color
  const possibleHex = 'ABCDEF1234567890';
  let hex;

  for(let i = 0; i < 6; i++) {
    hex += possibleHex[Math.floor(Math.random() * 16)]
  }

  profilePic.pic = pic;
  profilePic.hex = hex;
  return profilePic;
}

// Register controller registerates a new user
exports.register = async (req, res) => {
  let newUser = req.body;
  console.log(newUser);

  // Check if email already exists within the database
  const takenEmail = await User.findOne({ email: newUser.email });

  if(takenEmail) {
    res.json({ message: "Sorry, this email is already taken"});
  }

  if(newUser.googleSignIn === true) {
    const userAppId = generateUserAppId();

    // Save user to the DB
    const dbUser = new User({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      googleSignIn: newUser.googleSignIn,
      userAppId,
      joinedRooms: [],
      settings: {
        profilePic: newUser.imageUrl,
      },
      isActive: true
    });

    dbUser.save(err => {
      err ? console.log(err) : null;
    });

    console.log(res)
    // Assign the user a JWT
    jwt.sign({user: dbUser}, process.env.JWT_SECRET, { expiresIn: '1y' }, (err, token) => {
      if(err) return res.json({message: err});
      res.cookie("token", token, { httpOnly: true });
    });
  }

  // Check if the password and confirmed password are the same
  if(newUser.password === newUser.confirmPassword) {
    // Hash the user's password
    newUser.password = await bcrypt.hash(newUser.password, bcrypt.genSaltSync(), null);

    const userAppId = generateUserAppId();
    
    // Save user to the DB
    const dbUser = new User({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      userAppId,
      joinedRooms: [],
      settings: {
        profilePic: generateProfilePic(newUser.name[0])
      },
      isActive: true
    });

    dbUser.save(err => {
      console.log(err);
    });

    // Assign the user a JWT
    jwt.sign({user: dbUser}, process.env.JWT_SECRET, { expiresIn: '1y' }, (err, token) => {
      if(err) return res.json({message: err});
      res.cookie("token", token, { httpOnly: true });
    });
  } else {
    res.json("Sorry, the passwords don't match");
  }
}

exports.login = async (req, res) => {
  const user = req.body;

  const dbUser = await User.findOne({ email: user.email });

  if(user.googleSignIn === true && dbUser) {
    // Assign the user a JWT
    jwt.sign({user: dbUser}, process.env.JWT_SECRET, { expiresIn: '1y' }, (err, token) => {
      if(err) return res.json({message: err});
      res.cookie("token", token, { httpOnly: true });
    });

    if(!process.env.PORT) return res.status(200).redirect("http://localhost:3000/dashboard");
    return res.status(200).redirect("http://chattingai-frontend.herokuapp.com/dashboard");
  }

  if(!dbUser) {
    return res.json({message: "Sorry, invalid email"})
  } else {
    // Check if the password are the same
    bcrypt.compare(user.passsword, dbUser.password)
      .then(isCorrect => {
        if(isCorrect) {
          // Sign the user's token
          jwt.sign({user: dbUser}, process.env.JWT_SECRET, { expiresIn: '1y' }, (err, token) => {
            if(err) return res.json({message: err});
            res.cookie("token", token, { httpOnly: true });
          });

          if(!process.env.PORT) return res.status(200).redirect("http://localhost:3000/dashboard");
          return res.status(200).redirect("http://chattingai-frontend.herokuapp.com/dashboard");
        } else {
          return res.json({message: "Sorry, invalid email or password"})
        }
      });
  }
}

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.send({ success: true });
}

exports.forgotPassword = async (req, res) => {

}

exports.resetPassword = async (req, res) => {

}

// Middleware function to check the authentication status of the user
exports.checkAuth = async (req, res) => {
  const token = req.cookies.token

  //Try to verify token and return data if verified
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    res.json(req.user)
  } catch {
    //Clear cookie with token if expired or doesn't exist
    res.clearCookie('token');
    !process.env.PORT ? res.status(200).redirect("http://localhost:3000") : res.status(200).redirect("http://chattingai-frontend.herokuapp.com");
  }
}