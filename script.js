let progressBar = document.getElementById("progressBar")
let song = document.getElementById("song")
let play = document.getElementById("play")
let cntrl = document.getElementById("cntrl")
let duration = document.getElementById("duration")
let crntTime = document.getElementById("crntTime")
let durMin
let durSec
let vol = document.getElementById("vol")
let volInfo = document.querySelector(".volInfo")
let volLow = document.getElementById("volLow")
let volMute = document.getElementById("volMute")
let repeat = document.getElementById("repeat")
let jamz = ["musics/04 Grace.mp3", "musics/05 Woah_1.mp3", "musics/07 I HATE EVERYBODY - (SongsLover.com).mp3"]
let prevSong = document.getElementById("skip-backward")
let nextSong = document.getElementById("skip-forward")
let currentSongIndex = 0
let albumArt = document.getElementById("image")
let jsmediatags = window.jsmediatags
let musicName = document.getElementById("musicName")


vol.max = 100
song.volume = (vol.value/100)
vol.addEventListener('input', () =>{
    song.volume = (vol.value/100)
    volInfo.textContent = vol.value
})

volInfo.textContent = vol.value

 
function formatTime(time){
    durMin = Math.floor(time / 60) 
    durSec = Math.floor(time % 60 )
   return  ` ${durMin}:${durSec < 10 ? 0 : " "}${durSec}`
}

 //song.onloadedmetadata = function () {
    // progressBar.max = song.duration
    //  progressBar.value = song.currentTime
    //  progressBar.value = (song.currentTime / song.duration) * 100;
     //duration.textContent = formatTime(song.duration)
 //}
song.addEventListener("loadedmetadata", () => {
    progressBar.max = song.duration
     duration.textContent = formatTime(song.duration)
     readArtistData(jamz[0])
})
song.ontimeupdate = function () {
    crntTime.textContent = formatTime(song.currentTime) 
    progressBar.value = song.currentTime
}

// if(song.play){
// setInterval(()=> {
//     progressBar.value = (song.currentTime / song.duration) * 100;
// }, 500) }


progressBar.addEventListener('input', (e) => {
    song.currentTime = (e.target.value);
})


play.addEventListener('click', () => {
    if(play.classList.contains("fa-play")){
        song.play()
        play.classList.toggle("fa-play")
         play.classList.toggle("fa-pause")
         pause.style.display = "block"

    }
    else{
        song.pause()
         play.classList.toggle("fa-pause")
          pause.style.display = "none"
         play.classList.toggle("fa-play")
        
       
    }
    readArtistData(jamz[0])
})

volLow.addEventListener('click', () => {
    if(volLow.classList.contains("fa-volume-low")){
        song.volume = (vol.value/100) * 0
        volLow.classList.toggle("fa-volume-low")
         volLow.classList.toggle("fa-volume-mute")
         volMute.style.display = "block"

    }
    else{
        song.volume = (vol.value/100)
         volLow.classList.toggle("fa-volume-low")
          volMute.style.display = "none"
         volLow.classList.toggle("fa-volume-mute")
        
       
    }
})



/* song.onended = function repeatSong() {
    song.play()
    repeat.classList.toggle("playBackclck")
}
 */
repeat.addEventListener("click", () => {
    repeat.classList.toggle("playBackclck")
    song.onended = function repeatSong() {
    if(repeat.classList.contains("playBackclck")){
        currentSongIndex--
        if(currentSongIndex < 0 ){
            currentSongIndex = 0
        }
        song.src = jamz[currentSongIndex]
        song.play()
        readMetaData(jamz[currentSongIndex])
        }
    
    // else{
    //     song.onended = function repeatSong() {
    //         progressBar.value = 0
    //         crntTime.textContent =`0:00`
    //         play.classList.remove("fa-pause")
    //         play.classList.add("fa-play")
            
    //     }
    // }
    }
}
)

nextSong.addEventListener("click", () => {
    currentSongIndex++
    if(currentSongIndex >= jamz.length ){
        currentSongIndex = 0
    }
    if(play.classList.contains("fa-play")){
        play.classList.toggle("fa-play")
         play.classList.toggle("fa-pause")
         pause.style.display = "block"
    }
    song.src = jamz[currentSongIndex]    
    song.play()
    readMetaData(jamz[currentSongIndex])
    readArtistData(jamz[0])
})

prevSong.addEventListener("click", () => {
    currentSongIndex--
    if(currentSongIndex < 0 ){
        currentSongIndex = 0
    }
    if(play.classList.contains("fa-play")){
        play.classList.toggle("fa-play")
         play.classList.toggle("fa-pause")
         pause.style.display = "block"
    }
    song.src = jamz[currentSongIndex]
    song.play()
    readMetaData(jamz[currentSongIndex])
    readArtistData(jamz[0])

})


song.addEventListener("ended", () => {
    currentSongIndex++
    if(currentSongIndex >= jamz.length ){
        currentSongIndex = 0
    }
    song.src = jamz[currentSongIndex]
    song.play()
    readMetaData(jamz[currentSongIndex])
})

// document.getElementById('fileInput').addEventListener('change', function(event) {
//     const file = event.target.files[0];
//     jamz.push(event)
//     if (file) {

//         song.src = jamz[jamz.length - 1]
//         song.play()
//         readMetaData(file);
//     }
// });


function readMetaData(file) {
    jsmediatags.read(file, {
        onSuccess: function(tag) {
            let picture = tag.tags.picture
            if(picture) {
                let base64str = ""
                for(let i = 0; i < picture.length; i++) {
                    base64str += String.fromCharCode(picture[i]) 
                }
                 let imageUrl = `data:${picture.format};base64,${window.btoa(base64str)}`
                    albumArt.src = imageUrl
            }
            else {
                  albumArt.src = "image\camille-couvez-H5PnIYI_1I0-unsplash.jpg"
            }
        },
        onError: function (error) {
            musicName.value = error
        }
    })
}
function readArtistData(file) {
    jsmediatags.read(file, {
        onSuccess: function(tag) {
            let title = tag.tags.title
            if(title) {
                musicName.textContent = title
            }
            else {
                musicName.textContent = "No title"
            }
        },
        onError: function (error) {
            musicName.textContent = error
        }
    })
}
