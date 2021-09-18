export const formatTime = time => {
  if(time == null ) {
    return null;
  } else if(typeof(time) === 'string' || typeof(time) === 'function'){
    return null;
  } else if(time < 0) {
    return null;
  } else {
    const ss = Math.floor(time % 60);
    const mm = Math.floor((time / 60) % 60);
    const hh = Math.floor(time / 3600);
    return hh.toString().padStart(2, '0') + ':' + mm.toString().padStart(2, '0') + ':' + ss.toString().padStart(2, '0');
  }

};