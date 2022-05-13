const emailjs = require('emailjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

// Generate a userId for use within the application
async function generateUserAppId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let id = '', user;

  while(!user) {
    for(let i = 0; i < 9; i++) {
      id += chars[Math.floor(Math.random() * 36)];
    }

    user = await User.findOne({ userAppId: id })
      .then(data => {
        return data;
      });

    if(user) {
      user = '', id = '';
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
  const hexChars = 'ABCDEF1234567890';
  let hex = '';

  for(let i = 0; i < 6; i++) {
    hex += hexChars[Math.floor(Math.random() * 16)]
  }

  profilePic.pic = pic;
  profilePic.hex = hex;
  return profilePic;
}

// Register controller registerates a new user
exports.register = async (req, res) => {
  let newUser = req.body;

  // Check if email already exists within the database
  const takenEmail = await User.findOne({ email: newUser.email });

  if(takenEmail) {
    return res.status(400).json({ message: "Sorry, this email is already taken"});
  }

  if(newUser.googleSignIn === true) {
    const userAppId = await generateUserAppId();

    // Save user to the DB
    const dbUser = new User({
      name: newUser.name,
      email: newUser.email,
      googleSignIn: newUser.googleSignIn,
      userAppId,
      joinedRooms: [],
      settings: {
        profilePic: {
          pic: newUser.imageUrl,
          hex: ''
        },
        bio: ''
      }
    });

    dbUser.save(err => {
      err ? console.log(err) : null;
    });

    // Assign the user a JWT
    jwt.sign({user: dbUser}, process.env.JWT_SECRET, { expiresIn: '1y' }, (err, token) => {
      if(err) return res.json({message: err});
      res.json({...dbUser, success: true, token});
    });
  } else if(newUser.password && newUser.password === newUser.confirmPassword) { // Check if the password and confirmed password are the same
    // Hash the user's password
    newUser.password = await bcrypt.hash(newUser.password, bcrypt.genSaltSync(), null);

    // Generate unique id and default profile
    const userAppId = await generateUserAppId();
    const profile = generateProfilePic(newUser.name[0]);

    // Save user to the DB
    const dbUser = new User({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      userAppId,
      joinedRooms: [],
      settings: {
        profilePic: {
          pic: profile.pic,
          hex: profile.hex
        },
        bio: ''
      }
    });

    dbUser.save(err => {
      err ? console.log(err) : null;
    });

    // Assign the user a JWT
    jwt.sign({user: dbUser}, process.env.JWT_SECRET, { expiresIn: '1y' }, (err, token) => {
      if(err) return res.json({message: err});
      res.json({ ...dbUser, success: true, token });
    });
  } else {
    res.status(400).json("Sorry, the passwords don't match");
  }
}

exports.login = async (req, res) => {
  const user = req.body;

  const dbUser = await User.findOne({ email: user.email });

  if(!dbUser) {
    return res.status(400).json({message: "Sorry, invalid email"})
  }

  if(!user.googleSignIn && dbUser) {
    // Check if the password are the same
    bcrypt.compare(user.password, dbUser.password)
    .then(isCorrect => {
      if(isCorrect) {
        // Sign the user's token
        jwt.sign({user: dbUser}, process.env.JWT_SECRET, { expiresIn: '1y' }, (err, token) => {
          if(err) return res.json({message: err});
          res.json({...dbUser, success: true, token});
        });
      } else {
        return res.status(400).json({message: "Sorry, invalid email or password"});
      };
    });
  } else if(user.googleSignIn === true && dbUser.googleSignIn === true) {
    // Assign the user a JWT
    jwt.sign({user: dbUser}, process.env.JWT_SECRET, { expiresIn: '1y' }, (err, token) => {
      if(err) return res.json({message: err});
      return res.json({ ...dbUser, success: true, token });
    });
  } else {
    return res.status(400).json({message: "Sorry, seems like this email has signed up with google, please sign in with google instead"});
  }
}

exports.logout = async (req, res) => {
  res.send({ success: true });
}

exports.resetPassword = async (req, res) => {
  const email = req.body.email;
  if(!email === '') {
    res.status(400).send('email required');
  }

  User.findOne({ email }).then(user => {
    if(user == null) {
      console.error('email not in database');
      res.status(403).send('email not in db');
    } else {
      const token = crypto.randomBytes(6).toString('hex');
      const emailData = { email, token };

      try {
        emailjs.sendForm(processs.env.EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailData,emailData,EMAILJS_USER_ID)
          .then(result => {
            console.log(result.text);
          }, error => {
            console.log(error.text);
          });
      } catch(err){
        console.log(err, 'Email not sent...');
      }
      console.log('sending email');
    }
  });
}

// Middleware function to check the authentication status of the user
exports.checkAuth = async (req, res) => {
  const token = req.query.token;

  //Try to verify token and return data if verified
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err) return res.status(401).json({ msg: 'Token is not valid'  });
      req.user = decoded.user;
      res.json({...req.user, token});
    });
  } catch {
    res.status(500).json({ msg: 'Server Error' });
  }
}