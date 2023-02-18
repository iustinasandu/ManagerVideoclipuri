import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Routes, Route} from 'react-router-dom';
import ListOfPlaylists from './components/ListOfPlaylists';
import ListOfVideos from './components/ListOfVideos';



ReactDOM.render(
  <HashRouter>
    <Routes>
    <Route path="/" element={<ListOfPlaylists/>}/>
    <Route path="/:playlistId/videos" element={<ListOfVideos/>}/>
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);


