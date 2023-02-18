import React from "react"
import { useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from "react"
import videoStore from "./VideoStore"
import './Aplicatie.css'

function VideoAddForm (props) {
    const {onAdd} = props
    const [videos, setVideos] = useState([])
    const [Description, setDescription] = useState('')
    const [Title, setTitle] = useState('')
    const [VideoURL, setVideoURL] = useState('')

    const {playlistId} = useParams();

    useEffect(() => {
        videoStore.getVideos(playlistId)
        videoStore.emitter.addListener('GET_VIDEOS_SUCCESS', () => {
            setVideos(videoStore.data)
        })
    }, [])

    const addVideo = (evt) => {
        onAdd(playlistId, {
            Description,
            Title,
            VideoURL
        })
    }

    useEffect(()=>{
        return ()=>{}
    },[]);

    return (
        <div>
            <h3><br></br>Adauga un videoclip in playlist</h3>
            <div>
                <input className="btn" type='text' placeholder='Descriere' onChange={(evt) => setDescription(evt.target.value)}/>
            </div>
            <div>
                <input className="btn" type='text' placeholder='Titlu' onChange={(evt) => setTitle(evt.target.value)}/>
            </div>
            <div>
                <input className="btn" type='text' placeholder='VideoURL' onChange={(evt) => setVideoURL(evt.target.value)}/>
            </div>
            <div>
                <input className="btn" type='button' value='Adauga' onClick={addVideo}/>
            </div>
        </div>
    )
}

export default VideoAddForm