//JS Object array to test functionality. 
//Will be replaced with JSON from the Database
const products = [
    {
        id: "1", //Needed to link specific modal to card
        name: "Kendall Hester",
        phone: "8273615243",
        email: "email@us.com",
        category: "Hardware",
        title: "Used Laptop",
        location: "US",
        description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur soluta corrupti enim ex vitae perspiciatis?",
        img: "https://d22k5h68hofcrd.cloudfront.net/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/2/9/29B19LA-1_T1601592802.png"
    },
    {
        id: "2",
        name: "Jonathan Backer",
        phone: "8273615243",
        email: "email@us.com",
        category: "Hardware",
        title: "Samsung Smartphone",
        location: "Canada",
        description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur soluta corrupti enim ex vitae perspiciatis?",
        img:"https://images-na.ssl-images-amazon.com/images/I/61A3UNuWO9L._AC_SX522_.jpg"
    },
    {
        id: "3",
        name: "Gabriel Escobar",
        phone: "8273615243",
        email: "email@us.com",
        category: "Internet Access",
        title: "Wi-Fi hotspot",
        location: "Canada",
        description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur soluta corrupti enim ex vitae perspiciatis?",
        img: "https://images.squarespace-cdn.com/content/v1/59d2e7962994ca6597e2795c/1528574147297-NXO6UXRJ7FZKYOM9TETK/ke17ZwdGBToddI8pDm48kD5yiJ5U3jLPlFVdjq-dNjtZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIxQ2n7XrSl_mALNyhwiiaOAqEUpH3VqkizFKNqDcghl0/960px-Wireless-icon.png"
    },
    {
        id: "4",
        name: "Emnmanuel Bolteada Manzo",
        phone: "8273615243",
        email: "email@us.com",
        category: "Internet Access",
        title: "Wi-fi zone",
        location: "Mexico",
        description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur soluta corrupti enim ex vitae perspiciatis?",
        img: "https://images.squarespace-cdn.com/content/v1/59d2e7962994ca6597e2795c/1528574147297-NXO6UXRJ7FZKYOM9TETK/ke17ZwdGBToddI8pDm48kD5yiJ5U3jLPlFVdjq-dNjtZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIxQ2n7XrSl_mALNyhwiiaOAqEUpH3VqkizFKNqDcghl0/960px-Wireless-icon.png"
    },
    {
        id: "5",
        name: "Kendall Hester",
        phone: "8273615243",
        email: "email@us.com",
        category: "Hardware",
        title: "Used Laptop",
        location: "Mexico",
        description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur soluta corrupti enim ex vitae perspiciatis?",
        img:"https://www.sanborns.com.mx/imagenes-sanborns-ii/1200/195348275705.jpg"
    },
];


const container = document.getElementById('card-container');

function recaptchaCallback() {
    $('#emailBtn').removeAttr('disabled');
    $('.contact-details').removeClass('d-none');
};
fetch('/offer', {method: 'GET'}).then(response => response.json()).then(products => {
//Gallery displays one card for each object in the array
products.forEach((result) => {
    //Adds card HTML with object's unique properties
    const card = `<div class="ind-card card">
                        <div class="card-img"><img src="${result.picture}" alt=""></div>
                        <div class="card-body">
                            <p class="card-title">${result.offering}</p>
                            <hr>
                            <div class="cont-icon">
                                <i class="fas fa-map-marker-alt"></i>
                                <p class="location">${result.location}</p>
                            </div>
                            <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal${result.id}">View full details</button>
                        </div> 
                    </div>`;

    const modal = ` <div class="modal fade " id="exampleModal${result.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content px-3">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Full details</h5>
                                <button type="button" class="close " data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row modal-top">
                                    <div class="col-6 ">
                                        <div class="modal-img">
                                            <img src="${result.picture}" alt="">
                                        </div>
                                    </div>
                                    <div class="col-6 modal-basic-info">
                                        <h4>${result.offering}</h4>
                                        <div class="category-tag"><p>${result.category}</p></div>
                                        <div class="cont-icon col-6">
                                            <i class="fas fa-map-marker-alt"></i>
                                            <p class="location">${result.location}</p>
                                        </div>
                                        <p>Posted by: ${result.firstName + " " + result.lastName}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 text-justify">
                                        <p>${result.description}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 captcha-cont mb-3">
                                        <form class="captcha-form${result.id}" action="?" method="POST">
                                            <p>Complete the CAPTCHA to see the contact details</p>
                                            <div class="g-recaptcha" data-callback="recaptchaCallback" data-sitekey="6LcYS6AaAAAAAPmvDRPZsJKBO8dIwCPNrPkfumnf"></div>
                                        </form>
                                    </div>
                                    <div class="contact-details col-6 d-none">
                                        <div class="cont-icon">
                                            <i class="fas fa-envelope-open-text"></i>
                                            <p><a href="mailto:${result.email}">${result.email}</a></p>
                                        </div>
                                        <div class="cont-icon">
                                            <i class="fas fa-phone"></i>
                                            <p class="location">TODO</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
                            </div>
                            </div>
                        </div>
                    </div>`

    container.innerHTML += card;
    container.innerHTML += modal;
});
});