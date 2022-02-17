const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
// const { resolve } = require('path');
const axios = require('axios');

require('dotenv').config({});

const app = express();

app.use(express.json())
app.use(express.static('public'));

const appOrigin = process.env.APP_ORIGIN;
const audience = process.env.AUTH0_AUDIENCE;
const issuer = process.env.AUTH0_ISSUER;


app.use(cors({ origin: appOrigin }));

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
});

app.get("/api/public-message", (req, res) => {
  res.send({
    msg: "The API doesn't require an access token to share this message.",
  });
});

app.get("/api/private-message", checkJwt, (req, res) => {
  res.send({
    msg: "The API successfully validated your access token.",
  });
});

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
  console.log(req.query);
  // console.log(req.query.user);

  axios({
    method: 'GET',
    url: `http://localhost:1234/`,
    params: req.query
    // data: data,
  })
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

app.get('/userDrafts', (req, res) => {
  console.log(req.query);
  // console.log(req.query.user);

  axios({
    method: 'GET',
    url: `http://localhost:1234/`,
    params: req.query
    // data: data,
  })
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});