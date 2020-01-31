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

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 380,
    minWidth: 220
    // fontFamily: "Roboto, sans-serif"
  },
  media: {
    height: 200
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
    fetch(`http://localhost:3000/gamelog/updatelisting/${props.game.id}`, {
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
    console.log("goodbye");
    fetch(`http://localhost:3000/gamelog/deletelisting/${props.game.id}`, {
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
          // style={{ height: 200 }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ textAlign: "center" }}
          >
            {props.game.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Rating: {props.game.rating}/5
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Release Date: {props.game.releaseDate}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Platform(s): {props.game.platform}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Genre(s): {props.game.genre}
          </Typography>
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
      <CardActions>
        <Button size="small" color="primary" onClick={updateFunc}>
          Update
        </Button>
        <Button size="small" color="secondary" onClick={deleteFunc}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameListDisplay;
