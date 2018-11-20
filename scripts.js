let items = {"data":[{"id":0, "title":"Cynics Fuel This World","artist":"JT Wright","medium":"Jacket","src":"https://c1.staticflickr.com/2/1937/44947021062_31520d438d_k.jpg"},{"id":1,"title":"acquaintances sitting on a bench","artist":"Noa Florshiem","medium":"Charcoal","src":"https://c1.staticflickr.com/2/1906/45058423862_477609d471_k.jpg"},{"id":2,"title":"LOVE$ICK","artist":"JT Wright","medium":"Photography","src":"https://c1.staticflickr.com/5/4744/39313872705_2598c69f59_k.jpg"},{"id":3,"title":"KNOXCRAFT","artist":"Noa Florshiem","medium":"Minecraft Server","src":"https://c1.staticflickr.com/5/4859/44953520505_02c4c540da_k.jpg"}]}

Vue.component("gallery-item", {
    methods: {
        enlargePhoto: function() {
            let x = document.getElementById("enlargedPhoto");
            let y = document.getElementById("enlarged");

            y.style.display = "block";
            x.style.display = "block";

            y.style.zIndex = "110";
            x.style.zIndex = "110";
            x.src = this.$el.children[0].src;
            let id = this.$el.children[0].attributes[1].value;

            let metaList = document.createElement('ul');
            title = document.createElement('h2');
            metaList.setAttribute('id','metaList');
            title.setAttribute('id','title');

            document.getElementById('metaData').appendChild(title);
            document.getElementById('metaData').appendChild(metaList);
            console.log();
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
    },
    props: {
        item:Object
    },

    template: `<div class="cell"><img :src="item.src" :place="item.id" style="width:100%" v-on:click="enlargePhoto"></div>`
})

var app = new Vue({
    el: '#app',
    data: {
        items: items.data
    }
})


window.onload = function () {
    renewGallery();
};

function enlargePhoto(src, id) {
    
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

// function populateGallery(items) {
//     let children = document.getElementById("inspo").children;
//     for (let i=0;i<children.length;i++) {
//         let child = children[i];
//         while(child.firstChild) {
//             child.removeChild(child.firstChild);
//         }

//     }
//     let itemCount = 0;
//     for (let i = items.length-1; i>=0;i--) {
//         let img = document.createElement("gallery-item");
//         let column = children[itemCount % 4];
//         img.src = items[i].src;
//         column.appendChild(img);
//         itemCount++;
//     }
// }

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


