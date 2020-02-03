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
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
    minWidth: 240,
    border: "1px solid black"
  },
  media: {
    height: 240
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
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
        <CardContent style={{ backgroundColor: "papayawhip" }}>
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
            <div>
              <TextField
                id={`${props.game.id}`}
                placeholder={nullComment()}
                rowsMax="8"
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
            </div>
          </form>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{
          backgroundColor: "navajowhite",
          justifyContent: "space-evenly"
        }}
      >
        <Button size="medium" onClick={updateFunc} style={{ color: "#3f51b5" }}>
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
