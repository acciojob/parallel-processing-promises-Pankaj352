//your JS code here. If required.
const output = document.getElementById("output");
const loading = document.createElement("div");
loading.id = "loading";
loading.innerText = "Loading...";
document.body.appendChild(loading);

const errorDiv = document.createElement("div");
errorDiv.id = "error";
document.body.appendChild(errorDiv);

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

function downloadImages() {
  loading.style.display = "block";
  errorDiv.innerText = "";
  output.innerHTML = "";
  
  const imagePromises = images.map(image => downloadImage(image.url));
  
  Promise.all(imagePromises)
    .then(imgElements => {
      imgElements.forEach(img => output.appendChild(img));
    })
    .catch(error => {
      errorDiv.innerText = error;
    })
    .finally(() => {
      loading.style.display = "none";
    });
}

downloadImages();

