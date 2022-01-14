import express from "express";
import mongoose from "mongoose";
import Movies from "./moviesDatabase.js";
import Cors from "cors";

//app config
const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use(Cors());

//db config
const connectionUrl =
  "mongodb+srv://admin:PktB9grK2L3Szj5@cluster0.ipnq5.mongodb.net/moviesdb?retryWrites=true&w=majority";

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//???

const db = mongoose.connection;
db.once("open", () => {
  console.log("Database is connected successfully.");
});

//api routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/movies/all", (req, res) => {
  Movies.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/movies/latest", (req, res) => {
  Movies.find()
    .sort({ releaseDate: "desc" })
    .exec((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
});

app.get("/movies/genre/:g", (req, res) => {
  let genre = req.params.g;
  genre = genre.charAt(0).toUpperCase() + genre.slice(1);
  Movies.find({ genres: { $in: [genre] } })
    .sort({ releaseDate: "desc" })
    .exec((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
});
app.get("/movies/keyword/:k", (req, res) => {
  let keyword = req.params.k;
  Movies.find({ keywords: { $in: [keyword] } })
    .sort({ releaseDate: "desc" })
    .exec((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
});

app.get("/movie/id/:i", (req, res) => {
  let id = req.params.i;
  Movies.findById(id, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/movie/new", (req, res) => {
  const movieData = req.body;
  Movies.create(movieData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`New movie created successfully:\n${data}`);
    }
  });
});

//listen
app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});
