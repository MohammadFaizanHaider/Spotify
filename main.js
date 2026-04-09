let songIndex = 0;
let audioElement =new Audio('songs/1.mpeg');
let masterPlay = document.getElementById("masterPlay");
let progressbar = document.getElementById("pro_bar");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songitems"));

let songs=[
    {songName: "Anuv Jain-ALAG AASMAAN", filePath: "songs/1.mpeg", coverPath: "cover/1.jpg", duration: "03:45"},
    {songName: "AUR-TU HAI KAHAN", filePath: "songs/2.mpeg", coverPath: "cover/2.jpg", duration: "04:23"},
    {songName: "Anuv Jain - HUSN (Lyrics)", filePath: "songs/3.mpeg", coverPath: "cover/3.jpg", duration: "3:38"},
    {songName: "Mera Maan (Unplugged)", filePath: "songs/4.mpeg", coverPath: "cover/4.jpg", duration: "00:59"},
    {songName: "Set Fire To The Rain", filePath: "songs/5.mpeg", coverPath: "cover/5.jpg", duration: "04:15"},
    {songName: "AFSOS - Anuv Jain Ft. AP Dhillon  Lyrics", filePath: "songs/6.mpeg", coverPath: "cover/6.jpg", duration: "03:11"},
    {songName: "AUR - SHIKAYAT - Raffey - Usama - Ahad", filePath: "songs/7.mpeg", coverPath: "cover/7.jpg", duration: "04:32"},
    {songName: "Keane - Somewhere Only We Know", filePath: "songs/8.mpeg", coverPath: "cover/8.jpg", duration: "03:53"},
    {songName: "Kya Sach Ho Tum - Amna Riaz (Original Audio)", filePath: "songs/9.mpeg", coverPath: "cover/9.jpg", duration: "03:24"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("songDuration")[0].innerText = songs[i].duration;
})

masterPlay.addEventListener('click', ()=> {
    let currentSongIcon = document.getElementById(songIndex.toString());
    let currentGif = songItems[songIndex].querySelector(".song_info");

    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();

        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

        makeAllPlays();
        currentSongIcon.classList.remove('fa-circle-play');
        currentSongIcon.classList.add('fa-circle-pause');

        hideAllGifs();
        currentGif.style.opacity = 1;
    } else {
        audioElement.pause();

        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');

        currentSongIcon.classList.remove('fa-circle-pause');
        currentSongIcon.classList.add('fa-circle-play');

        hideAllGifs();
    }
});

audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    progressbar.value = progress;

    let currentSongItem = songItems[songIndex];
    let durationSpan = currentSongItem.querySelector(".songDuration");

    if (durationSpan) {
        let minutes = Math.floor(audioElement.currentTime / 60);
        let seconds = Math.floor(audioElement.currentTime % 60);
        if (seconds < 10) seconds = "0" + seconds;
        if (minutes < 10) minutes = "0" + minutes;
        durationSpan.innerText = `${minutes}:${seconds}`;
    }
});

audioElement.addEventListener('ended', () => {
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');

    let currentSongIcon = document.getElementById(songIndex.toString());
    currentSongIcon.classList.remove('fa-circle-pause');
    currentSongIcon.classList.add('fa-circle-play');

    let currentGif = songItems[songIndex].querySelector(".song_info");
    currentGif.style.opacity = 0;

    let durationSpan = songItems[songIndex].querySelector(".songDuration");
    if (durationSpan) durationSpan.innerText = "00:00";

});

progressbar.addEventListener('input', () => {
    audioElement.currentTime = (progressbar.value / 100) * audioElement.duration;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
    hideAllGifs();
}

const hideAllGifs = () => {
    Array.from(document.getElementsByClassName("song_info")).forEach((gif) => {
        gif.style.opacity = 0;
    });
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
    let clickedIndex = parseInt(e.target.id);
    let currentSongItem = e.target.closest(".songitems");
    let currentGif = currentSongItem.querySelector(".song_info");
    let currentSongIcon = e.target;

    if(songIndex === clickedIndex){
        if(audioElement.paused){
            audioElement.play();  
            currentSongIcon.classList.remove('fa-circle-play');
            currentSongIcon.classList.add('fa-circle-pause');

            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');

            currentGif.style.opacity = 1;
        } else {
            audioElement.pause();
            currentSongIcon.classList.remove('fa-circle-pause');
            currentSongIcon.classList.add('fa-circle-play');

            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');

            currentGif.style.opacity = 0;
        }
    } else {
        makeAllPlays();
        songIndex = clickedIndex;

        audioElement.src = `songs/${songIndex+1}.mpeg`;
        audioElement.currentTime = 0; 
        audioElement.play();

        masterSongName.innerText = songs[songIndex].songName;

        currentGif.style.opacity = 1;
        currentSongIcon.classList.remove('fa-circle-play');
        currentSongIcon.classList.add('fa-circle-pause');

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    });
});

document.getElementById("next").addEventListener('click', ()=> {
    makeAllPlays();

    if(songIndex >= songs.length - 1){
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    audioElement.src = `songs/${songIndex+1}.mpeg`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

    let currentSongIcon = document.getElementById(songIndex.toString());
    let currentGif = songItems[songIndex].querySelector(".song_info");

    currentSongIcon.classList.remove('fa-circle-play');
    currentSongIcon.classList.add('fa-circle-pause');
    currentGif.style.opacity = 1;
});

document.getElementById("back").addEventListener('click', ()=> {
    makeAllPlays();

    if(songIndex <= 0){
        songIndex = 0;
    } else {
        songIndex -= 1;
    }

    audioElement.src = `songs/${songIndex+1}.mpeg`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

    let currentSongIcon = document.getElementById(songIndex.toString());
    let currentGif = songItems[songIndex].querySelector(".song_info");

    currentSongIcon.classList.remove('fa-circle-play');
    currentSongIcon.classList.add('fa-circle-pause');
    currentGif.style.opacity = 1;
});

// YouTube Song Search
let songSearch = document.getElementById("songSearch");
let searchBtn = document.getElementById("searchBtn");

function searchSongOnYouTube() {
    let query = songSearch.value.trim();

    if (query !== "") {
        let youtubeURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(query + " song")}`;
        window.open(youtubeURL, "_blank");
    } else {
        alert("Please enter a song name!");
    }
}

// Button click
searchBtn.addEventListener("click", searchSongOnYouTube);

// Enter key press
songSearch.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        searchSongOnYouTube();
    }
});

// =========================
// Dark / Light Mode Toggle
// =========================
let themeToggle = document.getElementById("themeToggle");

// Page load par saved theme check karo
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
} else {
    document.body.classList.remove("light-mode");
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
}

// Button click event
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
        localStorage.setItem("theme", "light");
    } else {
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
        localStorage.setItem("theme", "dark");
    }
});