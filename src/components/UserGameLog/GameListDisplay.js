import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import APIURL from "../../helpers/environment";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
    minWidth: 240,
    border: "1px solid black",
    color: "white",
    textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
    "&:hover": {
      border: "1px solid white"
    }
  },
  media: {
    height: 240
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "90%"
    },
    "& .MuiOutlinedInput-multiline": {
      color: "white"
    },
    "& .MuiFormHelperText-root": {
      color: "white"
    },
    "& .MuiOutlinedInput-root": {
      borderColor: "white"
    }
  }
}));

const GameListDisplay = props => {
  const [comment, setComment] = useState("");
  const classes = useStyles();

  const updateFunc = () => {
    fetch(`${APIURL}/gamelog/updatelisting/${props.game.id}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.sessionToken
      }),
      body: JSON.stringify({
        title: props.game.title,
        backgroundImage: props.game.backgroundImage,
        genre: props.game.genre,
        rating: props.game.rating,
        platform: props.game.platform,
        releaseDate: props.game.releaseDate,
        comment: comment
      })
    })
      .then(res => res.json())
      .then(logData => {
        console.log(logData);
        setComment("");
        props.showListing();
      })
      .catch(err => console.log(err));
  };

  const deleteFunc = () => {
    fetch(`${APIURL}/gamelog/deletelisting/${props.game.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.sessionToken
      })
    })
      .then(res => res.json())
      .then(logData => {
        console.log(logData);
        props.showListing();
      })
      .catch(err => console.log(err));
  };

  const nullComment = () => {
    return props.game.comment
      ? `${props.game.comment}`
      : "Click here to add a comment!";
  };

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.game.backgroundImage}
          title={props.game.title}
        />
        <CardContent
          style={{
            backgroundColor: "#4F3380",
            textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ textAlign: "center", fontWeight: 700 }}
          >
            {props.game.title}
          </Typography>
          <hr></hr>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography style={{ fontWeight: 500 }}>
                Rating: {props.game.rating}/5
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ fontWeight: 500 }}>
                Released: {props.game.releaseDate}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography style={{ fontWeight: 500 }}>
                Genre(s): {props.game.genre}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ fontWeight: 500 }}>
                Platform(s): {props.game.platform}
              </Typography>
            </Grid>
          </Grid>
          <form className={classes.root} id={`${props.game.id}1`}>
            <TextField
              id={`${props.game.id}`}
              placeholder={nullComment()}
              rowsMax="12"
              value={comment}
              variant="outlined"
              multiline
              helperText="comment"
              onChange={e => setComment(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{
          // backgroundColor: "navajowhite",
          backgroundColor: "#210C3F",
          justifyContent: "space-evenly"
        }}
      >
        <Button size="medium" onClick={updateFunc} style={{ color: "white" }}>
          Update
        </Button>
        <Button size="medium" onClick={deleteFunc} style={{ color: "red" }}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameListDisplay;
