import React from "react"
import { useState } from "react"

function Video (props) {
    const {item, onDelete, onSave} = props
    const [isEditing, setIsEditing] = useState(false)

    const [Description, setDescription] = useState(item.Description)
    const [Title, setTitle] = useState(item.Title)
    const [VideoURL, setVideoURL] = useState(item.VideoURL)


    const deleteVideo = (evt) => {
        onDelete(item.PlaylistId, item.VideoId)
    }

    const updateVideo = (evt) => {
        onSave(item.PlaylistId, {
            Description,
            Title,
            VideoURL
        },item.VideoId)
        setIsEditing(false)
    }

    const edit = () => {
        setIsEditing(true)
    }

    const cancel = () => {
        setIsEditing(false)
    }


    return(
        <div>
        {
            isEditing
                ? (
                    <div className="elem">
                    <li>Descriere: </li> 
                    <li><input type='text' value={Description} onChange={(evt) => setDescription(evt.target.value)} /></li> 
                    <li>Titlu: </li> 
                    <li><input type='text' value={Title} onChange={(evt) => setTitle(evt.target.value)} /></li>
                    <li>Video URL: </li> 
                    <li><input type='text' value={VideoURL} onChange={(evt) => setVideoURL(evt.target.value)} /></li>
                    <input type='button' value='Salveaza' onClick={updateVideo}></input>
                    <input type='button' value='Anuleaza' onClick={cancel}></input>
                    </div>
                )
                : (
                    <div className="elem">
                    <li>Descriere: {item.Description}</li> 
                    <li>Titlu: {item.Title}</li> 
                    <li>Video URL: <a href={item.VideoURL} target="_blank" rel="noopener noreferrer">{item.VideoURL}</a></li> 
                    <input type='button' value='Sterge' onClick={deleteVideo}></input>
                    <input type='button' value='Editeaza' onClick={edit} ></input>    
                    </div>
                )
        }
        </div> 
    )
}

export default Video