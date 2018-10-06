let items = [{
        artist: "Rose Stout",
        medium: "photography",
        title: "untitled",
        src: "https://c1.staticflickr.com/2/1907/44950503462_de35f413e2_c.jpg"
    },
    {
        artist: "Rose Stout",
        medium: "photography",
        title: "Identity",
        src: "https://c1.staticflickr.com/2/1906/31126335438_0469424c7f_c.jpg"
    },
    {
        artist: "Noa Florsheim",
        medium: "shirt",
        title: "MAKE SOMETHING",
        src: "https://c1.staticflickr.com/2/1949/44196033155_e89d9db134_c.jpg"
    },
    {
        artist: "Rose Stout",
        medium: "photography",
        title: "untitled",
        src: "https://c1.staticflickr.com/2/1975/43187473610_f0be93f953_c.jpg"
    },
    {
        artist: "JT Wright",
        medium: "jacket",
        title: "keep moving forward, please",
        src: "https://c1.staticflickr.com/2/1937/44947021062_a5e1396ee8_z.jpg"
    },
    {
        artist: "Noa Florsheim",
        medium: "acrylic on condoms",
        title: "untitled",
        src: "https://c1.staticflickr.com/2/1908/30076995047_a6aa8c4ff6_c.jpg"
    },
    {
        artist: "Noa Florsheim",
        medium: "charcoal",
        title: "acquaintances sitting on a bench (3)",
        src: "https://c1.staticflickr.com/2/1906/45058423862_793e8f30af_c.jpg"
    }
];

window.onload = function () {
    populateGallery(items);
};

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

function populateGallery(items) {
    let children = document.getElementById("inspo").children;
    let itemCount = 0;
    for (let i = 0; i<items.length;i++) {
        console.log(items[i]);
        let img = document.createElement("img");
        let column = children[itemCount % 4];
        img.src = items[i].src;
        img.style = "width:100%";
        img.onclick = function() {
            enlargePhoto(img.src);
        }
        column.appendChild(img);
        itemCount++;
    }
}