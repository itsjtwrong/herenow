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
    hideShareSomething();
};

function enlargePhoto(src, id) {
    let x = document.getElementById("enlargedPhoto");
    let y = document.getElementById("enlarged");

    y.style.zIndex = "110";
    x.style.zIndex = "110";
    x.src = src;

    let metaList = document.createElement('ul');
     title = document.createElement('h2');
    metaList.setAttribute('id','metaList');
    title.setAttribute('id','title');

    document.getElementById('metaData').appendChild(title);
    document.getElementById('metaData').appendChild(metaList);

    for (info in items[id]) {
        console.log(info);
        if(info === 'title') {
            title.innerHTML = items[id][info];
        } else {
            let li = document.createElement('li');
            li.innerHTML = info + "  |  " + items[id][info];
            metaList.appendChild(li);
        }
    }
    if(document.body.clientWidth < 600) {
        document.getElementById("clickSomething").style.display = "none";
    }
    document.getElementById("inspo").style.display = "none";
    document.getElementById("share").style.display = "none";
    document.getElementById("shareFormWrap").style.display = "none";
}

function shrinkPhoto() {
    let x = document.getElementById("enlargedPhoto");
    let y = document.getElementById("enlarged");
    y.style.zIndex = "1";
    x.style.zIndex = "1";
    x.src = "";
    document.getElementById("inspo").style.display = "flex";

    document.getElementById("metaData").removeChild(document.getElementById("metaList"));
    document.getElementById("metaData").removeChild(document.getElementById("title"));
    document.getElementById("clickSomething").style.display = "block";
    document.getElementById("share").style.display = "block";
}

function populateGallery(items) {
    let children = document.getElementById("inspo").children;
    for (let i=0;i<children.length;i++) {
        let child = children[i];
        while(child.firstChild) {
            child.removeChild(child.firstChild);
        }

    }
    let itemCount = 0;
    for (let i = 0; i<items.length;i++) {
        let img = document.createElement("img");
        let column = children[itemCount % 4];
        img.src = items[i].src;
        img.style = "width:100%";
        img.onclick = function() {
            enlargePhoto(img.src, i);
        }
        column.appendChild(img);
        itemCount++;
    }
}

function hideShareSomething() {
    document.getElementById("shareFormWrap").style.display = "none";
}

function shareSomething() {
    document.getElementById("shareFormWrap").style.display = "block";
    document.getElementById("share").style.display = "none";
    if(document.body.clientWidth < 600) {
        document.getElementById("clickSomething").style.display = "none";
        document.getElementById("inspo").style.display = "none";
    }
    document.getElementById("submit").onclick = function() {
        let title = document.getElementById("titleInput").value;
        let artist = document.getElementById("artistInput").value;
        let medium = document.getElementById("mediumInput").value;
        let src = document.getElementById("srcInput").value;
        items.push({title:title,artist:artist,medium:medium,src:src});
        populateGallery(items);
        document.getElementById("shareForm").reset();
        hideShareSomething();
        document.getElementById("share").style.display = "block";
        document.getElementById("clickSomething").style.display = "block";
        document.getElementById("inspo").style.display = "block";
    }
}

