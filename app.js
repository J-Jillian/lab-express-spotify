const SpotifyWebApi = require("spotify-web-api-node");
const express = require("express");
const hbs = require("hbs");
const PORT = process.env.PORT || 3000;
require("dotenv").config();

// Remember to paste your credentials here
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(__dirname + "/public"));

// Retrieve an access token.
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );

// require spotify-web-api-node package here:

const app = express();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// setting the spotify-api goes here:

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});
// Our routes go here:

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/artist", (req, res, next) => {
  const artist = req.query.artist;

  spotifyApi
    .searchArtists(artist)
    .then((data) => {
      res.render("artists", { artists: data.body.artists.items });
    })
    .catch((err) => res.send(err));
});

app.get("/artists/:artistId", (req, res, next) => {
  const artist = req.params.artistId;

  spotifyApi
    .getArtistAlbums(artist)
    .then((data) => {
      res.render("albums", { albums: data.body.items });
    })
    .catch((err) => res.send(err));
});

app.get("/albums/:id", (req, res, next) => {
  const album = req.params.id;

  spotifyApi
    .getAlbumTracks(album)
    .then((data) => {
      res.render("tracks", { tracks: data.body.items });
    })
    .catch((err) => res.send(err));
});

app.listen(3000, () =>
  console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊")
);
