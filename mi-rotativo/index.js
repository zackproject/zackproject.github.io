function esIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}


function loadPage() {
  if (esIOS()) {
    const notIoS = document.getElementsByClassName("not-ios");
    for (let i = 0; i < notIoS.length; i++) {
      const element = notIoS[i];
      element.style.display = "none";
    }
  }
}