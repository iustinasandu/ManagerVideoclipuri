import React from "react"
import { EventEmitter } from "fbemitter"

const SERVER = 'http://localhost:8080'

class VideoStore {
    constructor () {
        this.data = []
        this.emitter = new EventEmitter()
    }

    async getVideos (playlistId) {
        try {
           const response = await fetch(`${SERVER}/api/sequelize/playlists/${playlistId}/videos`)
           if(!response.ok){
               throw response
           }
           this.data = await response.json()
           this.emitter.emit('GET_VIDEOS_SUCCESS')
        } catch (err) {
           console.warn(err) 
           this.emitter.emit('GET_VIDEOS_ERROR')
        }
    }

    async addVideo (playlistId, video) {
        try {
            const response = await fetch(`${SERVER}/api/sequelize/playlists/${playlistId}/videos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(video)
            })
            if(!response.ok){
                throw response
            }
            this.getVideos(playlistId)
         } catch (err) {
            console.warn(err) 
            this.emitter.emit('ADD_VIDEO_ERROR')
         }
    }

    async updateVideo (playlistId, video, videoId) {
        try {
            const response = await fetch(`${SERVER}/api/sequelize/playlists/${playlistId}/videos/${videoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(video)
            })
            if(!response.ok){
                throw response
            }
            this.getVideos(playlistId)
         } catch (err) {
            console.warn(err) 
            this.emitter.emit('UPDATE_VIDEO_ERROR')
         }
    }

    async deleteVideo (playlistId, videoId) {
        try {
            const response = await fetch(`${SERVER}/api/sequelize/playlists/${playlistId}/videos/${videoId}`, {
                method: 'DELETE'
            })
            console.log(response)
            if(!response.ok){
                throw response
            }
            this.getVideos(playlistId)
         } catch (err) {
            console.warn(err) 
            this.emitter.emit('DELETE_VIDEO_ERROR')
         }
    }
}

const videoStore = new VideoStore()
export default videoStore