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
    maxWidth: 345
  },
  media: {
    height: 140
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

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.game.backgroundImage}
          title={props.game.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.game.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Rating: {props.game.rating}/5
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Release Date: {props.game.releaseDate}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Platforms: {props.game.platform}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Platforms: {props.game.genre}
          </Typography>
          <form className={classes.root}>
            <TextField
              id={`${props.game.id}`}
              label="comment"
              rowsMax="4"
              value={comment}
              placeholder={props.game.comment}
              onChange={e => setComment(e.target.value)}
            />
          </form>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Update
        </Button>
        <Button size="small" color="secondary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameListDisplay;
