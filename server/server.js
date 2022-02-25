const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
// const { resolve } = require('path');
const axios = require('axios');
const compression = require('compression');

require('dotenv').config({});

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.static('public'));

//FEED ENDPOINTS
app.get('/', async (req, res) => {
  const optionGetPosts = {
    method: 'GET',
    url: `http://localhost:1234/`,
  };
  axios(optionGetPosts)
    .then((result) => {
      console.log(result.data);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

app.get('/hashtag', async (req, res) => {
  const { q } = req.query;
  console.log(q);
  const optionGetHashtagPosts = {
    method: 'GET',
    url: `http://localhost:1234/getHashtags/${q}`,
  };
  axios(optionGetHashtagPosts)
    .then((result) => {
      console.log(result.data);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

//PROFILE ENDPOINTS
//get projects and user profile data
app.get('/profile/', (req, res) => {
  // console.log('projects query', req.query);
  // console.log('projects query user', req.query.username);

  const { username } = req.query

  console.log(username);
  console.log('stage 1 success');
  axios({
    method: 'GET',
    url: `https://api.soundtok.live/getProfileData/projects/${username}`,
    // url: `http://54.91.250.255:1234/getProfileData/projects/${username}`,
    //url: `http://localhost:1234/getProfileData/projects/${username}`
  })
    .then((response) => {
      // console.log(response);
      res.status(200).send(response.data[0]);
    })
    .catch((error) => {
      console.log('stage 2 fail');
      console.log(error);
      res.status(500).send(error);
    });
});

//drafts - WIP
app.get('/profile', (req, res) => {
  axios({
    method: 'GET',
    url: `https://api.soundtok.live/userDrafts`,
    // url: `http://54.91.250.255:1234/userDrafts`,
    params: req.query,
  })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

//update username and bio in profile
app.put('/updateProfile/', (req, res) => {
  console.log('sending new profile data', req.body);
  // let tempData = {
  //   username: req.query.username,
  //   profileURL: req.query.profileURL,
  //   bio: req.query.bio,
  // };
  // const { username, profileURL, bio } = req.body;
  axios({
    method: 'PUT',
    url: `https://api.soundtok.live/updateProfile`,
    data: req.body,
  })
    .then((response) => {
      console.log('updateProf successful, ', response);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log('updateProf fail', error);
      res.status(500).send(error);
    });
});

//delete Project - need to send unique identifier for project
app.delete('/deletePost', (req, res) => {
  console.log('test', req.body);

  axios({
    method: 'DELETE',
    url: `https://api.soundtok.live/deletePost`,
    data: req.body,
  })
    .then(() => {
      console.log('successfully deleted post');
      // console.log(response);
      // res.status(200).send(response);
      res.status(200).send('Successfully deleted post');
    })
    .catch((error) => {
      console.log('error', error);
      res.status(500).send(error);
    });
});

module.exports = app;
