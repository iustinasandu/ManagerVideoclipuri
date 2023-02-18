import React from "react"
import { useEffect, useState } from "react";
import store from './PlaylistStore';
import PlaylistAddForm from './PlaylistAddForm'
import Playlist from "./Playlist";

function ListOfPlaylists() {
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        store.getPlaylists()
        store.emitter.addListener('GET_Playlists_SUCCESS', () => {
            setPlaylists(store.data)
        })
    }, [])

    const addPlaylist = (playlist) => {
        store.addPlaylist(playlist)
    }

    const deletePlaylist = (playlistId) => {
        store.deletePlaylist(playlistId)
    }

    const updatePlaylist = (playlistId, playlist) => {
        store.updatePlaylist(playlistId, playlist)
    }

    useEffect(()=>{
        return ()=>{}
    },[]);

    return (
        <div>
            <h3>Playlist-urile mele</h3>
            <ul>
            {
                playlists.map(e => <Playlist key={e.PlaylistId} item={e} onDelete={deletePlaylist} onSave={updatePlaylist}/>)
            }
            </ul>
            <PlaylistAddForm onAdd={addPlaylist} />
        </div>
    )
}

export default ListOfPlaylists;