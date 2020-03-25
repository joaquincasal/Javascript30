const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const volume = player.querySelector('.player__slider');
const playback = player.querySelector('.player__select');
const speakerButton = player.querySelector('.speaker');

function togglePlay() {
    video.paused ? video.play() : video.pause();
}

function updatePlayButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  playButton.textContent = icon;
}

function skip() {
  skipTime = parseFloat(this.dataset.skip);
  video.currentTime += skipTime;
}

function updateVideoProperty() {
  video[this.name] = this.value;
}

function handleProgress() {
   const percent = (video.currentTime / video.duration) * 100;
   progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function muteVideo() {
  video.volume = 0;
  volume.value = 0;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress);

playButton.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
volume.addEventListener('input', updateVideoProperty);
playback.addEventListener('input', updateVideoProperty);
speakerButton.addEventListener('click', muteVideo);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);