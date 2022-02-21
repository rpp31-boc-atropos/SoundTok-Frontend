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


//FEED ENDPOINTS
app.get('/', async (req, res) => {
  const optionGetPosts = {
    method: 'GET',
    url: `http://localhost:1234/`,
  }
  axios(optionGetPosts)
    .then((result) => {
      console.log(result.data)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })

})

app.get('/hashtag', async (req, res) => {
  const { q } = req.query
  console.log(q)
  const optionGetHashtagPosts = {
    method: 'GET',
    url: `http://localhost:1234/getHashtags/${q}`,
  }
  axios(optionGetHashtagPosts)
    .then((result) => {
      console.log(result.data)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })

})


//PROFILE ENDPOINTS
//get projects and user profile data
app.get('/profile/:username', (req, res) => {
  // console.log('projects query', req.query);
  // console.log('projects query user', req.query.username);
  const { username } = req.query
  console.log('stage 1 success');
  axios({
    method: 'GET',
    url: `http://54.91.250.255:1234/getProfileData/projects/${username}`,
    //url: `http://localhost:1234/getProfileData/projects/${username}`
  })
    .then((response) => {
      console.log('stage 2 success');
      console.log(response);

      res.status(200).send(response.data);
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
    url: `http://54.91.250.255:1234/userDrafts`,
    params: req.query
  })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
  });

//update username and bio in profile
app.put('/profile/', (req, res) => {
  // console.log('test', req.body);
  let tempData = {  //need to figure out cloudinary link, below is proxy data.
    username: req.query.username,
    profileURL: 'https://yahoofantasysports-res.cloudinary.com/image/upload/fantasy-logos/25311153506_9fdda2493f.jpg',
    bio: req.query.bio
  }
  const { username, bio } = req.params
  axios({
    method: 'PUT',
    url: `http://54.91.250.255:1234/updateProfile`,
    data: tempData
  })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

//delete Project - need to send unique identifier for project
app.delete('/deleteProject', (req, res) => {
  console.log('test', req.body);

  axios({
    method: 'DELETE',
    url: `http://54.91.250.255:1234`,
    data: req.body
  })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = app;