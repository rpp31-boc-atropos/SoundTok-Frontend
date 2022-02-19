import React from "react";
import { useSearchParams } from "react-router-dom";
import PhotoCard from "../components/hashtag/PhotoCard";
import Wave from "react-wavify";
import dummy from "../components/home/dummy.jsx";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";

const Hashtag = () => {
  // queryString = "?q=classic"
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q");
  let posts = dummy;

  return (
    <>
      <h1 style={{ margin: "30px" }}>#Hashtag: {q}</h1>
      <Container>
        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <PhotoCard post={post} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <br />
      <Link to="/">Go Back to the Home Page</Link>
      <Wave
        fill="#33495c"
        paused={false}
        options={{
          height: 30,
          amplitude: 30,
          speed: 0.3,
          points: 3,
        }}
      />
    </>
  );
};

export default Hashtag;
