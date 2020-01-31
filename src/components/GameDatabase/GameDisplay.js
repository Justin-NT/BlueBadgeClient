import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import APIURL from "../../helpers/environment";

const useStyles = makeStyles({
  card: {
    maxWidth: 380,
    minWidth: 220
  },
  media: {
    height: 200
  }
});

const GameDisplay = props => {
  const classes = useStyles();
  let genreValue;
  let platformValue;
  let placeholderImage =
    "https://www.ipcc.ch/site/assets/uploads/sites/3/2019/10/img-placeholder.png";
  let testing;

  const displayImage = () => {
    if (props.game.background_image === null) {
      testing = placeholderImage;
      return placeholderImage;
    } else {
      testing = props.game.background_image;
      return props.game.background_image;
    }
  };

  const displayPlatforms = () => {
    let platStrings = "";
    let platform = props.game.platforms;
    platform === null
      ? (platStrings = "")
      : platform.length > 1
      ? platform.forEach(ele => {
          platStrings += `${ele.platform.name}, `;
        })
      : platform.forEach(ele => (platStrings += `${ele.platform.name}`));

    if (platStrings[platStrings.length - 2] === ",") {
      platStrings = platStrings.substring(0, platStrings.length - 2);
      platformValue = platStrings;
      return platStrings;
    } else {
      platformValue = platStrings;
      return platStrings;
    }
  };

  const displayGenres = () => {
    let genreStrings = "";
    let genres = props.game.genres;
    genres.length > 1
      ? genres.forEach(ele => {
          genreStrings += `${ele.name}, `;
        })
      : genres.forEach(ele => (genreStrings += `${ele.name}`));
    if (genreStrings[genreStrings.length - 2] === ",") {
      genreStrings = genreStrings.substring(0, genreStrings.length - 2);
      genreValue = genreStrings;
      return genreStrings;
    } else {
      genreValue = genreStrings;
      return genreStrings;
    }
  };

  const checkForToken = () => {
    return props.sessionToken !== "" ? (
      <Button size="small" color="primary" onClick={addToDB}>
        Add to Game Bar
      </Button>
    ) : (
      <Link to="/signin" style={{ textDecoration: "none" }}>
        <Button size="small" color="primary">
          Add to Game Bar
        </Button>
      </Link>
    );
  };

  const addToDB = () => {
    console.log(typeof props.game.rating);
    fetch(`${APIURL}/gamelog/createlisting`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.sessionToken
      }),
      body: JSON.stringify({
        title: props.game.name,
        backgroundImage: testing,
        genre: genreValue,
        rating: props.game.rating,
        platform: platformValue,
        releaseDate: props.game.released
      })
    })
      .then(res => res.json())
      .then(logData => console.log(logData))
      .catch(err => console.log(err));
  };

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={displayImage()}
          title="Game Image"
          // style={{ height: 200 }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ textAlign: "center" }}
          >
            {props.game.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Rating: {props.game.rating}/5
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Released: {props.game.released}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Platforms: {displayPlatforms()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Genres: {displayGenres()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ backgroundColor: "purple" }}>
        {checkForToken()}
      </CardActions>
    </Card>
  );
};

export default GameDisplay;
