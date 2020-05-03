function songMstoSeconds(song){
    let ms = song;
    let seconds = (ms / 1000 );
    let min = seconds / 60;
    let r = min % 1;
    let sec = (r * 60);

    min = Math.floor(min);
    sec = Math.floor(sec);

    if (sec < 10) {
        sec = '0'+sec;
    }
    if (min < 10) {
        min = '0'+min;
    }


    return {
      min:min,
      sec:sec
    }
  }


  export{songMstoSeconds};