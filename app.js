const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let offsetTop = canvas.offsetTop;
let offsetLeft = canvas.offsetLeft;

let downloadedImg = new Image;
    downloadedImg.crossOrigin = "Anonymous";
    downloadedImg.addEventListener("load", imageReceived, false);
    downloadedImg.src = 'https://image.shutterstock.com/image-photo/zagreb-croatia-november-22-2014-260nw-232398376.jpg';


function imageReceived() {
  ctx.drawImage(downloadedImg, 10, 10, 200, 200);

  canvas.addEventListener('click', function(event) {
    let pageX = event.pageX;
    let pageY = event.pageY;
    let canvasX = pageX - offsetLeft;
    let canvasY = pageY - offsetTop;
    let imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
    let pixel = imageData.data;
    let pixelColor = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3]})`;

    ctx.fillStyle = pixelColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(downloadedImg, 10, 10, 200, 200);
  });

  try {
    localStorage.setItem("saved-image-example", canvas.toDataURL("image/png"));
  }
  catch(err) {
    console.log("Error: " + err);
  }
}
