const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// music
const songs = [
  {
    name:'jacinto-1',
    displayName:'Electric chill Machine',
    artist: 'Jacinto Design'
  } , 

  {
    name:'jacinto-2',
    displayName:'Seven Nation Army (Remix)',
    artist: 'Jacinto Design'
  },

  {
    name:'jacinto-3',
    displayName:'Electric motivation',
    artist: 'Jacinto Design'
  }


]


// check if playing 
let isplaying = false

// play
function playSong() {
  isplaying = true;
  playBtn.classList.replace("fa-play" , "fa-pause")
  playBtn.setAttribute("title" , "pause")
  music.play()
}

// pause 
function pauseSong() {
  isplaying = false;
  playBtn.classList.replace("fa-pause" , "fa-play")
  playBtn.setAttribute("title" , "play")
  music.pause()
}


// play or pause Event Listener 
playBtn.addEventListener("click" , ()=>(isplaying ? pauseSong() : playSong() ))

// Update DOM

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src=`music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let SongIndex=0;

// Previous Song
function prevSong() {
  SongIndex--;
  if (SongIndex<0) {
    SongIndex = songs.length-1
  }
  loadSong(songs[SongIndex])
  playSong()
}


// Prev Song
function nextSong() {
  SongIndex++;
  if (SongIndex > songs.length-1) {
    SongIndex = 0
  }
  loadSong(songs[SongIndex])
  playSong()
}

// on load - Selecte First Song
loadSong(songs[SongIndex]);
// Update Progress Bar & Time  
function UpdateProgressBar(e) {
  if (isplaying) { 
    const {duration , currentTime} = e.srcElement
    //  Update Progress bar Width 
    const progressPercent = (currentTime/duration) * 100
    progress.style.width = `${progressPercent}%`
    // Calculate display for duration 
    const durationMinutes = Math.floor(duration/60)
    let durationSecond = Math.floor(duration%60)
    if (durationSecond < 10) {
      durationSecond = `0${durationSecond}`
    }
 
    durationEl.textContent = `${durationMinutes}:${durationSecond}`
    // Delay switching duration Element to avoid NaN
    if (durationSecond) {
      durationEl.textContent = `${durationMinutes}:${durationSecond}`
    
    }

    // Calculate display for current time 
    const currentMinutes = Math.floor(currentTime/60)
    let currentSecond = Math.floor(currentTime%60)
    if (currentSecond<10) {
      currentSecondSecond = `0${durationSecond}`
    }
 
    currentTimeEl.textContent = `${currentMinutes}:${currentSecond}`
    
    
    
  }
}

// set progress Bar
function setprogressbar(e) {

  const width = this.clientWidth  
  const clickx = e.offsetX  
  const {duration} = music
  music.currentTime = (clickx/width)*duration
  
}

prevBtn.addEventListener("click" , prevSong)
next.addEventListener("click" , nextSong)
music.addEventListener("ended" , nextSong)
music.addEventListener("timeupdate" ,UpdateProgressBar)
progressContainer.addEventListener("click" , setprogressbar)

