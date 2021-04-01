//JS Object array to test functionality. 
//Will be replaced with JSON from the Database
const products = [{
        title: "Used Laptop",
        location: "Mexico"
    },
    {
        title: "LG Smartphone",
        location: "USA"
    },
    {
        title: "Desktop Computer",
        location: "Canada"
    },
    {
        title: "Xiaomi Smartphone",
        location: "USA"
    },
    {
        title: "Desktop Computer",
        location: "Canada"
    }
];


const container = document.getElementById('card-container');

//Gallery displays one card for each object in the array
products.forEach((result) => {
    //Adds card HTML with object's unique properties
    const card = `<div class="ind-card card">
                        <div class="card-img"><img src="" alt=""></div>
                        <div class="card-body">
                            <p class="card-title">${result.title}</p>
                            <hr>
                            <div class="cont-icon">
                                <i class="fas fa-map-marker-alt"></i>
                                <p class="location">${result.location}</p>
                            </div>
                            <button class="btn btn-primary">View full details</button>
                        </div> 
                     </div>`;

    container.innerHTML += card;
});

