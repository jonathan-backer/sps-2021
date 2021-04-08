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
        description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur soluta corrupti enim ex vitae perspiciatis?"
    },
    {
        id: "2",
        name: "Jonathan Backer",
        phone: "8273615243",
        email: "email@us.com",
        category: "Hardware",
        title: "Samsung Smartphone",
        location: "Canada",
        description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur soluta corrupti enim ex vitae perspiciatis?"
    },
    {
        id: "3",
        name: "Gabriel Escobar",
        phone: "8273615243",
        email: "email@us.com",
        category: "Internet Access",
        title: "Wi-Fi hotspot",
        location: "Canada",
        description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur soluta corrupti enim ex vitae perspiciatis?"
    },
    {
        id: "4",
        name: "Emnmanuel Bolteada Manzo",
        phone: "8273615243",
        email: "email@us.com",
        category: "Internet Access",
        title: "Wi-fi zone",
        location: "Mexico",
        description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur soluta corrupti enim ex vitae perspiciatis?"
    },
    {
        id: "5",
        name: "Kendall Hester",
        phone: "8273615243",
        email: "email@us.com",
        category: "Hardware",
        title: "Used Laptop",
        location: "Mexico",
        description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur soluta corrupti enim ex vitae perspiciatis?"
    },
];


const container = document.getElementById('card-container');

function recaptchaCallback() {
    $('#emailBtn').removeAttr('disabled');
    $('.contact-details').removeClass('d-none');
};

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
                                            <img src="" alt="">
                                        </div>
                                    </div>
                                    <div class="col-6 modal-basic-info">
                                        <h4>${result.title}</h4>
                                        <div class="category-tag"><p>${result.category}</p></div>
                                        <div class="cont-icon col-6">
                                            <i class="fas fa-map-marker-alt"></i>
                                            <p class="location">${result.location}</p>
                                        </div>
                                        <p>Posted by: ${result.name}</p>
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
                                            <p class="location">${result.email}</p>
                                        </div>
                                        <div class="cont-icon">
                                            <i class="fas fa-phone"></i>
                                            <p class="location">${result.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
                                <button type="button" class="btn btn-primary" id="emailBtn" disabled>Contact by email</button>
                            </div>
                            </div>
                        </div>
                    </div>`

    container.innerHTML += card;
    container.innerHTML += modal;
});

