const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
// const { resolve } = require('path');
const axios = require('axios');

const https = require('https');
const fs = require('fs');

var key = fs.readFileSync(__dirname + '/../privkey.pem');
var cert = fs.readFileSync(__dirname + '/../fullchain.pem');
var httpsOptions = {
  key: key,
  cert: cert
};

require('dotenv').config({});

const app = express();


app.use(express.json())
app.use(express.static('public'));

const audience = process.env.AUDIENCE;
const issuer = process.env.ISSUER;

app.use(cors());

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuer}.well-known/jwks.json`,
  }),

  audience: audience,
  issuer: issuer,
  algorithms: ['RS256'],
}).unless({path: ['/public']});

app.use(checkJwt)

app.get("/public", (req, res) => {
  res.send({
    msg: "The API doesn't require an access token to share this message.",
  });
});

app.get("/protected", async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1]

    const response = await axios.get(`${issuer}userinfo`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    const userinfo = response.data
    res.send({
      msg: "The API endpoint is protected",
      data: userinfo //req.user
    });
  } catch (error) {
    res.send(error)
  }

});

app.use((req, res, next) => {
  const error = new Error('Sorry, not found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  res.status(status).send(message);
})
//backend routes - replace localhost with deployed URL when ready

app.get("/", async (req, res) => {
  const optionGetPosts = {
    method: 'GET',
    url: `http://localhost:1234/`,
  }

  axios(optionGetPosts)
    .then((result) => {
      console.log(result.data)
    .catch((error) => {
      console.log(error)
      res.send(error)})
  });
})


//profile routes
app.get('/userProjects', (req, res) => {
  // console.log('projects query', req.query);
  // console.log('projects query user', req.query.username);
  axios({
    method: 'GET',
    url: `http://localhost:1234/`,
    params: req.query
    // data: data,
  })
    .then((response) => {
      // console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      // console.log(error);
      res.status(500).send(error);
    });
});

app.get('/userDrafts', (req, res) => {
  axios({
    method: 'GET',
    url: `http://localhost:1234/`,
    params: req.query
  })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get('/profileData', (req, res) => {
  axios({
    method: 'GET',
    url: `http://localhost:1234/`,
    params: req.query
  })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put('/updateProfile', (req, res) => {
  // console.log('test', req.body);

  let tempData = {  //need to figure out cloudinary link, below is proxy data.
    username: req.query.username,
    profileURL: 'https://yahoofantasysports-res.cloudinary.com/image/upload/fantasy-logos/25311153506_9fdda2493f.jpg',
    bio: req.query.bio
  }

  axios({
    method: 'PUT',
    url: `http://localhost:1234/`,
    data: tempData
  })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete('/deleteProject', (req, res) => {
  // console.log('test', req.body);

  axios({
    method: 'DELETE',
    url: `http://localhost:1234/`,
    data: req.body
  })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

var server = https.createServer(httpsOptions, app);

server.listen(3001, () => {
  console.log('server starting on port: 3001')
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});