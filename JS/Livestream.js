     

const video = document.querySelector('#livestream')

function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(error => {
      console.error('Error accessing camera: ', error);
    });
}

startCamera();