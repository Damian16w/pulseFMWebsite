var audio = document.getElementById("audio");
var playButton = document.getElementById("playPause");
var volumeSlider = document.getElementById("volumeSlider");
var nowPlaying = document.getElementById("now_playing");


function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playButton.textContent = "Mute";
    } else {
        audio.muted = !audio.muted; 
        if (!audio.muted) {
            audio.play(); 
        }
        playButton.textContent = audio.muted ? "Unmute" : "Mute";
    }
}

function updateVolume() {
    audio.volume = volumeSlider.value / 100;
}

function fetchNowPlaying() {
    fetch('http://play.pulsefm.nl/api/nowplaying/1')
    .then(response => response.json())
    .then(data => {
        document.getElementById('artist').textContent = data.now_playing.song.artist;
        document.getElementById('title').textContent = data.now_playing.song.title;
    })
    .catch(error => {
        console.error('Error fetching now playing data:', error);
    });
}

fetchNowPlaying();
setInterval(fetchNowPlaying, 2000); 