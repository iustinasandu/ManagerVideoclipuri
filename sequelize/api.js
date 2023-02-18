import "./sync.js";
import { router, server } from "../server-init.js";
import { sequelizeOperationsAPI } from "./operations-api.js";

router
  .route("/sequelize/playlists")
  .get(async function getSequelizePlaylists(_, res) {
    const result = await sequelizeOperationsAPI.getPlaylists();
    res.status(200).json(result);
  });

router
    .route("/sequelize/playlists")
    .post(async function createPlaylist({ body }, res) {
    try {
    if(!Object.keys(body).length){
        res.status(400).json({ message: "Body is missing" });
    }
    else if(!body.hasOwnProperty('Name') || !body.hasOwnProperty('CreationDate')){
        res.status(400).json({ message: 
        `Malformed request. Input template for creating a playlist: { Name: ..., CreationDate: ... }` });
    }
    else if(typeof body.Name !== "string"){
        res.status(400).json({ message: "Name should be a string" });
    }
    else if(typeof body.CreationDate !== "string"){
      res.status(400).json({ message: "Creation Date should be a string" });
    }
    else {
        await sequelizeOperationsAPI.createPlaylist(body);
        res.status(200).json("Playlist successfully created!");
    } 
    } catch (err) {
        console.error(`Error while calling API: ${err}`);
    }
  });

router
  .route("/sequelize/playlists/:playlistId")
  .put(async function updatePlaylist({ params: { playlistId }, body }, res) {
    try {
    if(!Object.keys(body).length){
        res.status(400).json({ message: "Body is missing" });
    }
    else if(!body.hasOwnProperty('Name') || !body.hasOwnProperty('CreationDate')){
        res.status(400).json({ message: 
        `Malformed request. Input template for creating a user: { Name: ..., CreationDate: ... }` });
    }
    else if(typeof body.Name !== "string"){
        res.status(400).json({ message: "Name should be a string" });
    }
    else {
      await sequelizeOperationsAPI.updatePlaylist(+playlistId, body);
      res.status(200).json("Playlist successfully updated!");
    }
    } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });

router
  .route("/sequelize/playlists/:playlistId")
  .delete(async function deletePlaylist({ params: { playlistId } }, res) 
  {
    try {
      await sequelizeOperationsAPI.deletePlaylist(+playlistId);
      res.status(200).json("Playlist successfully deleted!");
  } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });

router
  .route("/sequelize/playlists/:playlistId/videos")
  .get(async function getVideosOfPlaylistId({ params: { playlistId }}, res) 
  {
    const result = await sequelizeOperationsAPI.getVideosOfPlaylistId(playlistId);
    res.status(200).json(result); 
  });

router
  .route("/sequelize/playlists/:playlistId/videos")
  .post(async function createVideoForPlaylistId({ params: {playlistId }, body }, res) {
  try {
  if(!Object.keys(body).length){
      res.status(404).json({ message: "Body is missing" });
  }
  else if(!body.hasOwnProperty('Description') || !body.hasOwnProperty('Title') || !body.hasOwnProperty('VideoURL')){
      res.status(404).json({ message: 
      `Malformed request. Input template for creating a video: { Description: ..., Title: ..., VideoURL: ... }` });
  }
  else if(typeof body.Description !== "string") {
      res.status(400).json({ message: "Description should be a string" });
  }
  else if(typeof body.Title !== "string"){
      res.status(400).json({ message: "Title should be a string" });
  }
  else if(typeof body.VideoURL !== "string"){
    res.status(400).json({ message: "VideoURL should be a string" });
  }
  else {
    await sequelizeOperationsAPI.createVideoForPlaylistId(+playlistId, body);
    res.status(200).json("Video successfully created!");
  }
  } catch (err) {
    console.error(`Error while calling API: ${err}`);
  }
  });

router
  .route("/sequelize/playlists/:playlistId/videos/:videoId")
  .put(async function updateVideoOfPlaylistId({ params: { playlistId, videoId }, body }, res) {
  try {
    if(!Object.keys(body).length){
      res.status(404).json({ message: "Body is missing" });
  }
  else if(!body.hasOwnProperty('Description') || !body.hasOwnProperty('Title') || !body.hasOwnProperty('VideoURL')){
      res.status(404).json({ message: 
      `Malformed request. Input template for creating a video: { Description: ..., Title: ..., VideoURL: ... }` });
  }
  else if(typeof body.Description !== "string") {
    res.status(400).json({ message: "Description should be a string" });
  }
  else if(typeof body.Title !== "string"){
      res.status(400).json({ message: "Title should be a string" });
  }
  else if(typeof body.VideoURL !== "string"){
    res.status(400).json({ message: "VideoURL should be a string" });
  }
  else {
    await sequelizeOperationsAPI.updateVideoOfPlaylistId(+playlistId, +videoId, body);
    res.status(200).json("Video successfully updated!");
  }
  } catch (err) {
    console.error(`Error while calling API: ${err}`);
  }
  });

router
  .route("/sequelize/playlists/:playlistId/videos/:videoId")
  .delete(async function deleteVideoOfPlaylist({ params: { playlistId, videoId } }, res) 
  {
    try {
      await sequelizeOperationsAPI.deleteVideoOfPlaylistId(+playlistId, +videoId);
      res.status(200).json("Video successfully deleted!");
  } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });



