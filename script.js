const play = document.getElementById("play");
const playIcon = play.querySelector("i");
const progress = document.getElementById("progress");
const stop = document.getElementById("stop");
const video = document.getElementById("video");
const timeStamp = document.getElementById("timestamp");
// const play = document.getElementById('play');
// const play = document.getElementById('play');

const displayProgress = () => {
  const currentProgress = video.currentTime / video.duration;
  progress.value = currentProgress * 100;
  displayTimestamp();

  requestAnimationFrame(displayProgress);
};

const onPlayClick = () => {
  if (playIcon.classList.contains("fa-play")) {
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
    video.play();
  } else {
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    video.pause();
  }
  requestAnimationFrame(displayProgress);
};

const stopVideo = () => {
  playIcon.classList.remove("fa-pause");
  playIcon.classList.add("fa-play");
  video.pause();
  video.currentTime = 0;
};

const displayTimestamp = () => {
  let minute = Math.round(video.currentTime / 60).toString();
  minute =
    minute.toString().length === 1
      ? `0${Math.round(video.currentTime / 60)}`
      : `${Math.round(video.currentTime / 60)}`;
  let seconds = (Math.round(video.currentTime) % 60).toString();
  seconds =
    seconds.toString().length === 1
      ? `0${Math.round(video.currentTime) % 60}`
      : `${Math.round(video.currentTime) % 60}`;

  const currentTimestamp = minute + ":" + seconds;
  timeStamp.innerText = currentTimestamp;

  if (video.currentTime === video.duration) {
    video.currentTime = 0;
    stopVideo();
  }
};

const seek = (event) => {
  const newProgress = event.target.value / 100;
  video.currentTime = newProgress * video.duration;
  video.play();
};

play.addEventListener("click", onPlayClick);
video.addEventListener("click", onPlayClick);
stop.addEventListener("click", stopVideo);
progress.addEventListener("input", seek);
