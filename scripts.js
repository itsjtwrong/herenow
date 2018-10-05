function enlargePhoto(src) {
    let x = document.getElementById("enlargedPhoto");
    let y = document.getElementById("enlarged");
    y.style.zIndex = "110";
    x.style.zIndex = "110";
    x.src = src;
    document.getElementById("inspo").style.display = "none";
}

function shrinkPhoto() {
    let x = document.getElementById("enlargedPhoto");
    let y = document.getElementById("enlarged");
    y.style.zIndex = "1";
    x.style.zIndex = "1";
    x.src = "";
    document.getElementById("inspo").style.display = "flex";
}