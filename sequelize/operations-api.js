import { Playlists, Videos } from "./sync.js";

async function sequelizeAuth(sequelizeConnection){
    try {
        await sequelizeConnection.authenticate();
        console.log("Sequelize has successfully connected to the database!");
    } catch (err) {
        console.error(
            `There was an error connecting to the databse using sequelize : ${err}`
        );
    }
}

async function sequelizeSync(sequelizeConnection){
    try {
        await sequelizeConnection.sync({force: false, alter: true});
        console.log("Sync completed!");
    } catch (err) {
        console.error(`Sync failed : ${err}`);
    }
}


async function sequelizeInit(sequelizeConnection){
    await sequelizeAuth(sequelizeConnection);
    await sequelizeSync(sequelizeConnection);
}


async function getPlaylists() {
    try {
        return await Playlists.findAll(); 
    } catch (err) {
        console.log(err); 
    }
}

async function createPlaylist(playlist) {
    try{
      await Playlists.create({
        Name: playlist.Name,
        CreationDate: playlist.CreationDate,
      });
    } catch(err) {
        console.log(err);
    }
}

async function updatePlaylist(playlistId, playlist) {
    try{
        const record = await Playlists.findByPk(playlistId);
        if(record) await record.update ({
            Name: playlist.Name,
            CreationDate: playlist.CreationDate,
        });
    } catch(err){
        console.log(err);
    }
}

async function deletePlaylist(playlistId) {
    try{
        const record = await Playlists.findByPk(playlistId);
        if(record) await record.destroy();
    } catch(err){
        console.log(err);
    }
}

async function getVideosOfPlaylistId(playlistId){
    try {
        const playlist = await Playlists.findByPk(playlistId, {
            include: [Videos]
        });
        if(playlist) {
            var { Videos: videos } = playlist;
            return videos;
        }
        else{
            console.log(`PlaylistId ${playlistId} not found!`); 
        }
    } catch(err){
        console.log(err);
    }
}

async function createVideoForPlaylistId(playlistId, video) {
    try {
        const record = await Playlists.findByPk(playlistId);
        if(record){
            let newVideo = await Videos.create({
                Description: video.Description,
                Title: video.Title,
                VideoURL: video.VideoURL,
              });
            newVideo.PlaylistId = record.PlaylistId; 
            await newVideo.save();
        }
        else{
            console.log(`PlaylistId ${playlistId} not found!`);
        }   
    } catch (err) {
        console.log(err);
    }
}

async function updateVideoOfPlaylistId(playlistId, videoId, video){
    try {
        const playlist = await Playlists.findByPk(playlistId, {
            include: [Videos],
            where: { VideoId: videoId }
        });
        if(playlist) {
            const updatedVideo = await Videos.findByPk(videoId);
            if(updatedVideo) {
                await updatedVideo.update({
                    Description: video.Description,
                    Title: video.Title,
                    VideoURL: video.VideoURL,
                });
                await updatedVideo.save();
            }   
            else{
                console.log(`VideoId ${videoId} not found!`); 
            }
        }
        else{
            console.log(`PlaylistId ${playlistId} not found!`); 
        }
    } catch(err){
        console.log(err);
    }
}

async function deleteVideoOfPlaylistId(playlistId, videoId){
    try {
        const playlist = await Playlists.findByPk(playlistId, {
            include: [Videos],
            where: { VideoId: videoId }
        });
        if(playlist) {
            const video = await Videos.findByPk(videoId);
            if(video) {
                await video.destroy();
            }   
            else{
                console.log(`VideoId ${videoId} not found!`); 
            }
        }
        else{
            console.log(`PlaylistId ${playlistId} not found!`); 
        }
    } catch(err){
        console.log(err);
    }
}


export const sequelizeOperationsAPI = {
    init: sequelizeInit,

    getPlaylists: getPlaylists,
    createPlaylist: createPlaylist,
    updatePlaylist: updatePlaylist,
    deletePlaylist: deletePlaylist,

    createVideoForPlaylistId: createVideoForPlaylistId,
    getVideosOfPlaylistId:getVideosOfPlaylistId,
    updateVideoOfPlaylistId: updateVideoOfPlaylistId,
    deleteVideoOfPlaylistId: deleteVideoOfPlaylistId,
    
};