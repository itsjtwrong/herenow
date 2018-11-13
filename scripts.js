let items = {};
window.onload = function () {
    renewGallery();
};

function enlargePhoto(src, id) {
    let x = document.getElementById("enlargedPhoto");
    let y = document.getElementById("enlarged");

    y.style.display = "block";
    x.style.display = "block";

    y.style.zIndex = "110";
    x.style.zIndex = "110";
    x.src = src;

    let metaList = document.createElement('ul');
     title = document.createElement('h2');
    metaList.setAttribute('id','metaList');
    title.setAttribute('id','title');

    document.getElementById('metaData').appendChild(title);
    document.getElementById('metaData').appendChild(metaList);

    for (info in items.data[id]) {
        console.log(info);
        if(info === 'title') {
            title.innerHTML = items.data[id][info];
        } else {
            let li = document.createElement('li');
            li.innerHTML = info + "  |  " + items.data[id][info];
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

    y.style.display = "none";
    x.style.display = "none";

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
    for (let i = items.length-1; i>=0;i--) {
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
        let temp = {"title":title,"artist":artist,"medium":medium,"src":src};
        renewGallery(true,temp)
        populateGallery(items.data);
        document.getElementById("shareForm").reset();
        hideShareSomething();
        document.getElementById("share").style.display = "block";
        document.getElementById("clickSomething").style.display = "block";
        document.getElementById("inspo").style.display = "flex";
    }
}

async function putData(data) {
    console.log("PUT DATA");
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            console.log(req.responseText);
        }
    };

    req.open("PUT", "https://api.myjson.com/bins/cqn7y",true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(items));

}

async function renewGallery(isConcatNeeded = false,newItem = ``) {
    await fetch("https://api.myjson.com/bins/cqn7y").then(response => {
    response.json().then(data => {
        return items = data;
    }).then(items => {
        console.log(items);
    if(isConcatNeeded) {
        items.data.push(newItem);
        console.log("concat happened");
    }
    populateGallery(items.data);
    hideShareSomething();
    }).then(response => {
        putData(items);
    })
}).catch(err => {
    console.log(err);
})
}


