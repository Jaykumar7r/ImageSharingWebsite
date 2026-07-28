async function loadImages(){

    const response = await fetch("/images");
    const images = await response.json();

    const gallery = document.getElementById("gallery");

    gallery.innerHTML = "";

    images.forEach(image => {

        gallery.innerHTML += `
        <div class="card">

            <img src="/uploads/${image}">

            <br><br>

            <a href="/uploads/${image}" download>
                <button>Download</button>
            </a>

        </div>
        `;

    });

}

loadImages();

    loadImages();
});

async function loadImages(){

    const response = await fetch("/images");
    const images = await response.json();

    const gallery = document.getElementById("gallery");

    gallery.innerHTML = "";

    images.forEach(image => {

        gallery.innerHTML += `
        <div class="card">

            <img src="/uploads/${image}">

            <br><br>

            <a href="/uploads/${image}" download>
                <button>Download</button>
            </a>

        </div>
        `;

    });

}

loadImages();