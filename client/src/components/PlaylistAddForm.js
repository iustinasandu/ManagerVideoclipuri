import React from "react"
import { useState } from "react"

function PlaylistAddForm (props) {
    const {onAdd} = props
    const [Name, setName] = useState('')
    const [CreationDate, setCreationDate] = useState('')

    const addPlaylist = (evt) => {
        onAdd({
            Name,
            CreationDate
        })
    }

    return (
        <div>
            <h3><br></br>Creaza un playlist</h3>
            <div>
                <input className="btn" type='text' placeholder='Titlu' onChange={(evt) => setName(evt.target.value)}/>
            </div>
            <div>
                <input className="btn" type='text' placeholder='Data creare' onChange={(evt) => setCreationDate(evt.target.value)}/>
            </div>
            <div>
                <input className="btn" type='button' value='Adauga' onClick={addPlaylist}/>
            </div>
        </div>
    )
}

export default PlaylistAddForm