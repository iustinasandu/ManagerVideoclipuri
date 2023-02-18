import React from "react"
import { EventEmitter } from "fbemitter"

const SERVER = 'http://localhost:8080'

class PlaylistStore {
    constructor () {
        this.data = []
        this.emitter = new EventEmitter()
    }

    async getPlaylists () {
        try {
           const response = await fetch(`${SERVER}/api/sequelize/playlists`)
           if(!response.ok){
               throw response
           }
           this.data = await response.json()
           this.emitter.emit('GET_Playlists_SUCCESS')
        } catch (err) {
           console.warn(err) 
           this.emitter.emit('GET_Playlists_ERROR')
        }
    }

    async addPlaylist (playlist) {
        try {
            const response = await fetch(`${SERVER}/api/sequelize/playlists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(playlist)
            })
            if(!response.ok){
                throw response
            }
            this.getPlaylists()
         } catch (err) {
            console.warn(err) 
            this.emitter.emit('ADD_Playlists_ERROR')
         }
    }

    async updatePlaylist (playlistId, playlist) {
        try {
            const response = await fetch(`${SERVER}/api/sequelize/playlists/${playlistId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(playlist)
            })
            if(!response.ok){
                throw response
            }
            this.getPlaylists()
         } catch (err) {
            console.warn(err) 
            this.emitter.emit('UPDATE_Playlists_ERROR')
         }
    }

    async deletePlaylist (playlistId) {
        try {
            const response = await fetch(`${SERVER}/api/sequelize/playlists/${playlistId}`, {
                method: 'DELETE'
            })
            if(!response.ok){
                throw response
            }
            this.getPlaylists()
         } catch (err) {
            console.warn(err) 
            this.emitter.emit('DELETE_Playlists_ERROR')
         }
    }
}

const store = new PlaylistStore()
export default store