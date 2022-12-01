let myLibrary = [];

function Song(name,artist,youtubeLink, isFavourite){
    this.name = name;
    this.artist = artist;
    this.youtubeLink = youtubeLink;
    this.isFavourite = isFavourite;
    this.addDate = getDate();
}

function getDate() {
    const today = new Date();
    const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const date = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    return date;
}

function addSongToLibrary(song){
    myLibrary.push(song);
}

function checkFields() {
    let rightFields = 0;
    inputNodeList.forEach(input => {
        if (input.id === "youtube-link") {
            if (checkLink()===true) {
                rightFields++;
            } else {
                input.classList.add("error");
            }
        } else {
            if (input.checkValidity()===true) {
                rightFields++;
            } else {
                input.classList.add("error");
            }
        }
    });
    if (rightFields===4) {
        let songData = [];
        inputNodeList.forEach(input => {
            if (input.id === "is-favourite") {
                if (input.checked === true) {
                    songData.push(true);
                } else {
                    songData.push(false);
                }
            } else {
                songData.push(input.value);
            }
        })
        const newSong = new Song(songData[0],songData[1],songData[2],songData[3]) 
        console.log(newSong);
    }

}

function checkLink() {
    if (linkInput.value.includes("https://www.youtube.com/watch?v=")) {
        removeError(linkInput);
        return true;
    } else {
        linkInput.setCustomValidity("Please put a valid link");
    }
}

function removeError(item) {
    item.classList.remove("error");
    item.setCustomValidity("");
}

function openModal() {
    modal.classList.remove("hide");
    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
}

const inputNodeList = document.querySelectorAll('input');
inputNodeList.forEach(input => {
    input.addEventListener("click", ()=>{
        removeError(input);
    });
})

const linkInput = document.getElementById('youtube-link');
linkInput.addEventListener("input",()=>removeError(linkInput));
const submitButton = document.getElementById('submit');
submitButton.addEventListener("click",()=>checkFields());

const modal = document.getElementById('modal');
const closeModalButton = document.getElementsByClassName("close")[0];
closeModalButton.onclick = function(){closeModal()}
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

const coincidir = new Song("coincidir","macaco","https://www.youtube.com/watch?v=b3GyAtcoogc",true);
addSongToLibrary(coincidir);

myLibrary.forEach(item => {
    const song = document.createElement('div');
    song.className = "song";
    const info = document.createElement('div');
    info.className = "info";
    const actions = document.createElement('div');
    actions.className = "actions";

    const preview = document.createElement('img');
    const videoID = item.youtubeLink.substring(item.youtubeLink.indexOf('=') + 1);
    preview.src = `https://img.youtube.com/vi/${videoID}/1.jpg`;
    preview.alt = "youtube preview";
    
    const name = document.createElement('h2');
    name.textContent = `${item.name}`;

    const artist = document.createElement('h4');
    artist.textContent = `${item.artist}`;

    const date = document.createElement('p');
    date.textContent = `Added on ${item.addDate}`;

    const isFavourite = document.createElement('img');
    if (item.isFavourite === true) {
        isFavourite.src = "images/cards-heart.svg";
    } else {
        isFavourite.src = "images/cards-heart-outline.svg";
    }
    isFavourite.alt = "favourite icon";

    const link = document.createElement('a');
    link.href = item.youtubeLink;
    link.target = "_blank";
    link.rel = "noreferrer noopener";
    const playButton = document.createElement('img');
    playButton.src = "images/play-box.svg";
    playButton.alt = "youtube play icon";
    link.append(playButton);
    
    song.appendChild(preview);
    song.append(info);
    info.append(name);
    info.append(artist);
    info.append(date);
    song.append(actions);
    actions.append(isFavourite);
    actions.append(link);

    document.getElementById('content').appendChild(song);
    //moves add button to the bottom
    const button = document.getElementById('modal-button');
    button.remove();
    document.getElementById('content').appendChild(button);
    button.addEventListener('click',()=>openModal());
});