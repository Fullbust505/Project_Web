const btn = document.getElementById('launchmusicbutton');
const audio = document.getElementById('bg-music');
const img = document.getElementById('music-img');
let isPlaying = false;

function setButtonState(playing) {
    if (playing) {
        btn.classList.add('playing');
        img.style.opacity = "0.7";
    } else {
        btn.classList.remove('playing');
        img.style.opacity = "1";
    }
}

btn.onclick = function() {
    if (!isPlaying) {
        audio.play();
    } else {
        audio.pause();
    }
};

audio.onpause = function() {
    isPlaying = false;
    setButtonState(false);
};
audio.onplay = function() {
    isPlaying = true;
    setButtonState(true);
};