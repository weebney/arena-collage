const retrieve = async () => {
    const inputURL = window.location.href
    var slug = inputURL.substring(inputURL.lastIndexOf('?') + 1);

    let response = [];
    let arenaContent = [];
    let parray = [];
    let array = [];

    const fetchID = async () => {
        const slugResponse = await fetch('https://api.are.na/v2/channels/' + slug);
        const slugP = await slugResponse.json();
        let id = slugP["id"];

        if (slugP["length"] <= 100) {
            let length = slugP["length"];
            response = await fetch('https://api.are.na/v2/channels/' + id + '/contents?per=' + length);

        } else {
            let length = Math.ceil((slugP["length"]) / 100) * 100;
            for (let i = 1; i < length / 100; i += 1) {
                response = await fetch('https://api.are.na/v2/channels/' + id + '/contents?per=100&page=' + i);

            }

        }
        arenaContent = await response.json();
        parray = arenaContent.contents;
        array = array.concat(parray);

        console.log(array)

        for (let i = 0; i < array.length; i++) {
            if (array[i].class == "Media" || array[i].class == "Image"); {
                let fig = document.createElement('figure');
                fig.setAttribute('id', i);
                
                let anchor = document.createElement('a');
                anchor.setAttribute('id', "anchor" + i);
                anchor.setAttribute('href', 'https://www.are.na/block/' + array[i].id);
                anchor.setAttribute('target', '_blank');

                document.getElementById('masonry').appendChild(fig);
                let img = document.createElement('img');
                if (window.location.href.includes("/collage.html?")) {
                    var zrandom = Math.floor(Math.random() * 1000);
                    var wrandom = Math.floor((Math.random() * 33) + 20);
                    img.setAttribute('style', 'z-index: ' + zrandom + ';width: ' + (wrandom) + 'vw;');
                }
                img.src = array[i].image.display.url;

                document.getElementById(i).appendChild(anchor);
                document.getElementById("anchor"+i).appendChild(img);
               // document.getElementById(i).innerHTML = img;
            }
            document.getElementById('centered').style.display = 'none';
            clearInterval(loader);
        }

    }
    fetchID();

}

const updateLoader = async () => {
    switch (loadState) {
        case 0:
            document.getElementById('loadText').innerHTML = '????  ????           ????';
            loadState += 1;
            break;
        case 1:
            document.getElementById('loadText').innerHTML = '????      ????       ????';
            loadState += 1;
            break;
        case 2:
            document.getElementById('loadText').innerHTML = '????           ????  ????';
            loadState += 1;
            break;
        case 3:
            document.getElementById('loadText').innerHTML = '????               ????';
            loadState = 0;
            break;
    }
}

onload = async () => {
    document.body.style.backgroundColor = sessionStorage.getItem('bgcolor')

}

retrieve();
var loadState = 3;
let loader = setInterval(updateLoader, 200);