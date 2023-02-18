import React from "react"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import videoStore from './VideoStore'
import Video from './Video'
import VideoAddForm from "./VideoAddForm";

function ListOfVideos() {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([])
    const {playlistId} = useParams();

    useEffect(() => {
        videoStore.getVideos(playlistId)
        videoStore.emitter.addListener('GET_VIDEOS_SUCCESS', () => {
            setVideos(videoStore.data)
        })
    }, [])

    const addVideo = (playlistId, video) => {
        videoStore.addVideo(playlistId, video)
    }

    const deleteVideo = (playlistId, id) => {
        videoStore.deleteVideo(playlistId, id)
    }

    const updateVideo = (playlistId, video, id) => {
        videoStore.updateVideo(playlistId, video, id)
    }

    useEffect(()=>{
        return ()=>{}
    },[]);

    return(
        <div>
            <h3>Videoclipuri</h3>
            <ul>
            {
                videos.map(e => <Video key={e.VideoId} item={e} onDelete={deleteVideo} onSave={updateVideo}/>)
            }
            </ul>
            <VideoAddForm onAdd={addVideo} playlistId/>
            <input className="backBtn" type='button' value='<- Intoarce-te la meniul principal' onClick={() => navigate('/')} />
        </div>
    )
}

export default ListOfVideos