{
  "data": [{
    "username": "DjBubbles415",
    "password": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    "id": 1
  }],
  "projects": [{
    "project_description": "A really cool project",
    "project_image": "https://picsum.photos/200",
    "created": "2021-05-22T14:56:29.000Z",
    "updated": "2021-05-22T14:56:28.000Z",
    "tags": ["classical", "djbubbles", "san francisco"],
    "Tracks": {
      "author": "Dj Bubbles",
      "title": "Bay Area Life",
      "url": "http://google.com",
      "track_description": "Muni bus bangers",
      "track_image": "https://picsum.photos/201"
    }
    }],
  "drafts": [{
    "id": 3000
  }],
  "__comment":"Please shape/change JSON as you need and refer to https://github.com/rpp31-boc-atropos/SoundTok-Backend/blob/main/database/schema.sql if needed."
}
//Comments do not work in .json so this is changed to .js for now
// post data
{
  "profilePicture": "https://i.pinimg.com/474x/a3/89/f5/a389f597020f361f7f6d9b79323598fc.jpg",
  "timePosted": "2004-10-19 10:23:54+02", // this would just be when the row gets created. data type called timestamp in pg
  "username": "atrophos",
  "postLikes": 123, // STRETCH
  "postSaved": false, // STRETCH
  "postText": "I have been waiting to release this for so long. pls no hate thx. #meow",
  "tags": ["meow"], // not sure if we need this but when a post is created with a hashtag, think we should send
  //the list of hashtags as its own object/array so it can be added to the hashtag table
  "projectAudioLink": "someaudiolink",
  "projectTitle": "group meow",
  "projectLength": "98" // this should be in seconds
}