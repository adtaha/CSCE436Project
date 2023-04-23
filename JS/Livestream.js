

// function onOpenCvReady() {
//   cv['onRuntimeInitialized'] = () => {
//             var canvas = document.getElementById('canvasElement');

//             navigator.mediaDevices
//               .getUserMedia({ video: true })
//               .then(function (stream) {
//                 video.srcObject = stream;
//                 video.play();
//               })
//               .catch(function (err) {
//                 console.log('An error occurred: ' + err);
//               });


//               var cap = new cv.VideoCapture(video);
//               let gray = new cv.Mat();          // another empty image (single channel)
//               let faces = new cv.RectVector();  // to hold the face coordinates
//               let classifier = new cv.CascadeClassifier(); // opencv's powerful haarCascadeClassifier

//               let utils = new Utils('errorMessage');  // to show errors
//               let faceCascadeFile = 'haarcascade_frontalface_default.xml'; // path to xml

//               utils.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
//                 classifier.load(faceCascadeFile); // in the callback, load the cascade from file 
//               });


//             console.log(cv);

//             var frame = new cv.Mat(video.height, video.width, cv.CV_8UC4);


//             setInterval(function () {
//               cap.read(frame);
//               cv.cvtColor(frame, gray, cv.COLOR_RGBA2GRAY, 0);
//               cv.equalizeHist(gray, gray);
//               var faceSize = [0, 0];
//               faceCascade.detectMultiScale(
//                 gray,
//                 faces,
//                 1.1,
//                 3,
//                 0,
//                 faceSize,
//                 faceSize
//               );

//               try{
//                 classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
//                 console.log(faces.size());
//               }catch(err){
//                 console.log(err);
//               }
//               for (var i = 0; i < faces.size(); ++i) {
//                 var face = faces.get(i);
//                 var point1 = new cv.Point(face.x, face.y);
//                 var point2 = new cv.Point(
//                   face.x + face.width,
//                   face.y + face.height
//                 );
//                 cv.rectangle(frame, point1, point2, [255, 0, 0, 255]);
//               }
//               cv.imshow(canvas, frame);
//               gray.delete();
//               faces.delete();
//             }, 1000 / 30);
//       }
// }



function onOpenCvReady() {

  if (cv.getBuildInformation) {
    console.log(cv.getBuildInformation());
    onloadCallback();
  } else {
    //wait for opencv.js compilation;
    cv["onRuntimeInitialized"] = () => {
      console.log(cv.getBuildInformation());
      onloadCallback();
    };
  }
}
function onloadCallback() {
  let streaming = false;
  let startAndStop = document.getElementById("start");
  let canvasOutput = document.getElementById("canvasOutput");
  let canvasContext = canvasOutput.getContext("2d");

  startAndStop.addEventListener("click", () => {
    if (!streaming) {
      startCamera("qvga", onVideoStarted, "livestream");
    }
  });

  function onVideoStarted() {
    streaming = true;
    startAndStop.innerText = "Streaming";


    /* Your code starts here */
    // get the video element
    //---your code---//
    let video = document.getElementById("livestream")


    // create two empty 8bit 4 channel images: src and dst
    //---your code---//
    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);


    // fetch video capture from the video element
    //---your code---//
    let cap = new cv.VideoCapture(video);

    /* Your code ends here */


    let gray = new cv.Mat();          // another empty image (single channel)
    let faces = new cv.RectVector();  // to hold the face coordinates
    let classifier = new cv.CascadeClassifier(); // opencv's powerful haarCascadeClassifier

    let utils = new Utils('errorMessage');  // to show errors
    let faceCascadeFile = "haarcascade_frontalface_default.xml"; // path to xml

    utils.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
      classifier.load(faceCascadeFile); // in the callback, load the cascade from file 
    });

    const FPS = 30;

    function processVideo() {
      let begin = Date.now();

      /* Your code starts here */

      // read a frame to the src
      // use cap.read() method
      //---your code---//
      cap.read(src)


      // copy src image to dst so that we have one copy
      // use src.copyTo() method
      //---your code---//
      src.copyTo(dst)


      // convert the dst image to gray
      // use cv.cvtColor() method
      //---your code---//
      cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY)


      // here we are testing haar model for face
      try {
        classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
        console.log(faces.size());
      } catch (err) {
        console.log(err);
      }

      // if we got any face then draw a rectange over it
      for (let i = 0; i < faces.size(); ++i) {
        let face = faces.get(i);
        let point1 = new cv.Point(face.x, face.y);
        let point2 = new cv.Point(face.x + face.width, face.y + face.height);

        // draw a rectangle between point1 and point2 over your dst image
        // use cv.rectangle(destinationImage, point1, point2, [R, G, B, Alpha]);
        // in opencv [R, G, B, Alpha] values ranges from 0 to 255
        //---your code---//
        cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);
      }


      // show the dst image on your cavasOutput
      // use cv.imshow() method
      //---your code---//
      cv.imshow(canvasOutput, dst)



      /* Your code ends here */


      // schedule next one.
      let delay = 1000 / FPS - (Date.now() - begin);
      setTimeout(processVideo, delay);
    }


    // schedule first one.
    setTimeout(processVideo, 0);
  }

}

//utils: same as our previous example
startCamera = function (resolution, callback, videoId) {
  const constraints = {
    qvga: { width: { exact: 320 }, height: { exact: 240 } },
    vga: { width: { exact: 640 }, height: { exact: 480 } }
  };
  let video = document.getElementById(videoId);
  if (!video) {
    video = document.createElement("video");
  }

  let videoConstraint = constraints[resolution];
  if (!videoConstraint) {
    videoConstraint = true;
  }

  navigator.mediaDevices
    .getUserMedia({ video: videoConstraint, audio: false })
    .then(function (stream) {
      video.srcObject = stream;
      video.play();
      callback();
    })
    .catch(function (err) {
      console.log("An error occurred! " + err);
    });
};

