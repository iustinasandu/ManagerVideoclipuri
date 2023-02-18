import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Playlist (props) {
    const {item, onDelete, onSave} = props
    const [isEditing, setIsEditing] = useState(false)

    const [Name, setName] = useState(item.Name)
    const [CreationDate, setCreationDate] = useState(item.CreationDate)

    const deletePlaylist = (evt) => {
        onDelete(item.PlaylistId)
    }

    const updatePlaylist = (evt) => {
        onSave(item.PlaylistId, {
            Name,
            CreationDate
        })
        setIsEditing(false)
    }

    const edit = () => {
        setIsEditing(true)
    }

    const cancel = () => {
        setIsEditing(false)
    }

    const navigate = useNavigate();
    let showVideos = () => {
        navigate(`/${item.PlaylistId}/videos`)
    }

    return(
        <div>
        {
            isEditing
                ? (
                    <div className="elem">
                        <li>Titlu: </li> 
                        <li><input type='text' value={Name} onChange={(evt) => setName(evt.target.value)} /></li>
                        <li>Data creare: </li>
                        <li><input type='text' value={CreationDate} onChange={(evt) => setCreationDate(evt.target.value)} /></li>
                        <input type='button' value='Salveaza' onClick={updatePlaylist}></input>
                        <input type='button' value='Anuleaza' onClick={cancel}></input>
                    </div>
                )
                : (
                    <div className="elem">
                        <li>Titlu: {item.Name} </li>
                        <li>Data creare: {item.CreationDate} </li>
                        <input type='button' value='Sterge' onClick={deletePlaylist}></input>
                        <input type='button' value='Editeaza' onClick={edit}></input>
                        <input type='button' value='Vezi videoclipuri' onClick={showVideos}></input>
                    </div>
                )
        }
        </div>  
    )
}

export default Playlist