let myLibrary = [];

function Song(name,artist,youtubeLink, isFavourite){
    this.name = name;
    this.artist = artist;
    this.youtubeLink = youtubeLink;
    this.isFavourite = isFavourite;
}

function addSongToLibrary(song){
    myLibrary.push(song);
}

