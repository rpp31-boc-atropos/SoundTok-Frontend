import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import PhotoCard from "../components/hashtag/PhotoCard";
import Wave from "react-wavify";
// import dummy from "../components/home/dummy.jsx";
// import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";

const Hashtag = () => {
  // queryString = "?q=classic";
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q");
  // console.log(q);
  // const posts = dummy;
  const [posts, setPosts] = useState([]);
  // console.log("fetching");
  useEffect(async () => {
    const result = await axios(`https://api.soundtok.live/getHashtags/${q}`);

    setPosts(result.data);
  }, [q]);

  return (
    <>
      <h1 style={{ margin: "30px" }}>#Hashtag: {q}</h1>
      <Link to="/">Go Back to the Home Page</Link>
      <br />
      <Container style={{ maxHeight: "60%", overflow: "auto" }}>
        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <PhotoCard post={post} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Wave
        style={{ position: "fixed", bottom: 0 }}
        fill="#33495c"
        paused={false}
        options={{
          height: 40,
          amplitude: 40,
          speed: 0.3,
          points: 3,
        }}
      />
    </>
  );
};

export default Hashtag;
