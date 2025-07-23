window.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const vehicleId = params.get('vehicle');
    if (vehicleId) {
        showVehicleDetails(vehicleId);
    }
});

let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick=()=>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}


window.onscroll=()=>{

    if(window.scrollY>0){
        document.querySelector('.header').classList.add('active');
    }
    else{
        document.querySelector('.header').classList.remove('active');
    }

    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

window.onload=()=>{

    if(window.scrollY>0){
        document.querySelector('.header').classList.add('active');
    }
    else{
        document.querySelector('.header').classList.remove('active');
    }

}



var swiper = new Swiper(".vehicles-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop:true,
    centeredSlides: true,
    grabCursor:true,
    autoplay: {
        delay: 9500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 3,
        },
    },
});
// var swiper = new Swiper('.featured-slider', {
//     slidesPerView: 1,
//     spaceBetween: 10,
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,  // Omogućava klik na brojeve za prelazak
//     },
// });

var swiper = new Swiper(".featured-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 3,
        },
    },
});
function changePage(pageNumber, event, scrollToSection = true) {
    if (event) event.preventDefault(); // Spreči default scroll behavior

    // Skroluvaj samo ako funkcijata e povikana so klik, ne pri prvoto učituvanje
    if (scrollToSection) {
        var featuredSection = document.getElementById('featured');
        if (featuredSection) {
            featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    var vehicles = document.querySelectorAll('#featured .swiper-slide');
    vehicles.forEach(vehicle => vehicle.style.display = 'none');

    var pageVehicles = document.querySelectorAll(`#featured .swiper-slide[data-page="${pageNumber}"]`);
    pageVehicles.forEach(vehicle => vehicle.style.display = 'block');

    var pageNumbers = document.querySelectorAll('.page-number');
    pageNumbers.forEach(page => page.classList.remove('active'));

    document.querySelector(`.page-number:nth-child(${pageNumber})`).classList.add('active');
}

// Inicijaliziraj prvata stranica **bez da skroluva**
changePage(1, null, false);


var swiper = new Swiper(".reviews-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop:true,
    centeredSlides: true,
    grabCursor:true,
    autoplay: {
        delay: 9500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 3,
        },
    },
});

let slides = document.querySelectorAll('.slide');
let currentSlide = 0;

document.querySelector('#nextSlide').addEventListener('click', () => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
});

document.querySelector('#prevSlide').addEventListener('click', () => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
});

// Автоматско менување на позадината на секои 5 секунди
setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}, 5000);






document.addEventListener("DOMContentLoaded", () => {
    const vehicleList = document.getElementById("vehicle-list");
    const modal = document.getElementById("vehicleModal");
    const modalTitle = document.getElementById("vehicleTitle");
    const modalDetails = document.getElementById("vehicleDetails");
    const closeModal = document.querySelector(".close");
    const reserveButton = document.getElementById("reserveButton");

    const brandFilter = document.getElementById("brandFilter");
    const modelFilter = document.getElementById("modelFilter");
    const fuelFilter = document.getElementById("fuelFilter");
    const applyFilters = document.getElementById("applyFilters");

    const vehicles = [
        { brand: "Audi", model: "A4", fuel: "Дизел", price: 15000, details: "Одличен семеен автомобил." },
        { brand: "BMW", model: "320d", fuel: "Дизел", price: 18000, details: "Спортски стил и економичност." },
        { brand: "Mercedes", model: "C220", fuel: "Бензин", price: 20000, details: "Луксуз и удобност." },
        { brand: "Volkswagen", model: "Golf 7", fuel: "Дизел", price: 14000, details: "Економично и практично возило." }
    ];

    function populateFilters() {
        const brands = [...new Set(vehicles.map(v => v.brand))];
        const models = [...new Set(vehicles.map(v => v.model))];
        const fuels = [...new Set(vehicles.map(v => v.fuel))];

        brands.forEach(brand => {
            let option = document.createElement("option");
            option.value = brand;
            option.textContent = brand;
            brandFilter.appendChild(option);
        });

        models.forEach(model => {
            let option = document.createElement("option");
            option.value = model;
            option.textContent = model;
            modelFilter.appendChild(option);
        });

        fuels.forEach(fuel => {
            let option = document.createElement("option");
            option.value = fuel;
            option.textContent = fuel;
            fuelFilter.appendChild(option);
        });
    }

    function displayVehicles() {
        vehicleList.innerHTML = "";
        vehicles.forEach((vehicle, index) => {
            let vehicleCard = document.createElement("div");
            vehicleCard.classList.add("vehicle-card");
            vehicleCard.addEventListener("click", () => showVehicleDetails(index));
            vehicleList.appendChild(vehicleCard);
        });
    }

    function filterVehicles() {
        const selectedBrand = brandFilter.value;
        const selectedModel = modelFilter.value;
        const selectedFuel = fuelFilter.value;

        const filteredVehicles = vehicles.filter(vehicle =>
            (selectedBrand === "" || vehicle.brand === selectedBrand) &&
            (selectedModel === "" || vehicle.model === selectedModel) &&
            (selectedFuel === "" || vehicle.fuel === selectedFuel)
        );

        vehicleList.innerHTML = "";
        filteredVehicles.forEach((vehicle, index) => {
            let vehicleCard = document.createElement("div");
            vehicleCard.classList.add("vehicle-card");
            // vehicleCard.innerHTML = `<h3>${vehicle.brand} ${vehicle.model}</h3><p>Цена: ${vehicle.price} €</p>`;
            vehicleCard.addEventListener("click", () => showVehicleDetails(index));
            vehicleList.appendChild(vehicleCard);
        });
    }

    function showVehicleDetails(index) {
        const vehicle = vehicles[index];
        modalTitle.textContent = `${vehicle.brand} ${vehicle.model}`;
        modalDetails.textContent = vehicle.details;
        modal.style.display = "block";
    }

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    reserveButton.addEventListener("click", () => {
        alert("Успешно резервирано!");
        modal.style.display = "none";
    });

    applyFilters.addEventListener("click", filterVehicles);

    populateFilters();
    displayVehicles();
});





document.addEventListener("DOMContentLoaded", () => {
    const vehicles = [
        { brand: "Audi", model: "A4", fuel: "Дизел", price: 15000, details: "Одличен семеен автомобил." },
        { brand: "BMW", model: "320d", fuel: "Дизел", price: 18000, details: "Спортски стил и економичност." },
        { brand: "Mercedes", model: "C220", fuel: "Бензин", price: 20000, details: "Луксуз и удобност." },
        { brand: "Volkswagen", model: "Golf 7", fuel: "Дизел", price: 14000, details: "Економично и практично возило." }
    ];

    const vehicleList = document.getElementById("vehicle-list");
    const brandFilter = document.getElementById("brandFilter");
    const modelFilter = document.getElementById("modelFilter");
    const fuelFilter = document.getElementById("fuelFilter");

    const applyFilters = document.getElementById("applyFilters");

    function populateFilters() {
        const brands = [...new Set(vehicles.map(v => v.brand))];
        const models = [...new Set(vehicles.map(v => v.model))];
        const fuels = [...new Set(vehicles.map(v => v.fuel))];

        brands.forEach(brand => brandFilter.innerHTML += `<option value="${brand}">${brand}</option>`);
        models.forEach(model => modelFilter.innerHTML += `<option value="${model}">${model}</option>`);
        fuels.forEach(fuel => fuelFilter.innerHTML += `<option value="${fuel}">${fuel}</option>`);
    }

    function displayVehicles(filteredVehicles = vehicles) {
        vehicleList.innerHTML = "";
        filteredVehicles.forEach(vehicle => {
            let vehicleCard = document.createElement("div");
            vehicleCard.classList.add("vehicle-card");
            vehicleCard.innerHTML = `<h3>${vehicle.brand} ${vehicle.model}</h3><p>Цена: ${vehicle.price} €</p>`;
            vehicleList.appendChild(vehicleCard);
        });
    }

    function filterVehicles() {
        const selectedBrand = brandFilter.value;
        const selectedModel = modelFilter.value;
        const selectedFuel = fuelFilter.value;
        const maxPrice = priceFilter.value ? parseInt(priceFilter.value) : Infinity;

        const filteredVehicles = vehicles.filter(vehicle =>
            (!selectedBrand || vehicle.brand === selectedBrand) &&
            (!selectedModel || vehicle.model === selectedModel) &&
            (!selectedFuel || vehicle.fuel === selectedFuel) &&
            (vehicle.price <= maxPrice)
        );
        displayVehicles(filteredVehicles);
    }

    applyFilters.addEventListener("click", filterVehicles);

    populateFilters();
    displayVehicles();
});












document.addEventListener("DOMContentLoaded", () => {

    function showVehicleDetails(index) {
        const vehicle = vehicles[index];
        modalTitle.textContent = `${vehicle.brand} ${vehicle.model}`;
        modalImage.src = vehicle.image;
        modalDetails.textContent = vehicle.details;
        modal.style.display = "block";
    }

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    wishlistButton.addEventListener("click", () => {
        alert("Возилото е додадено во Wishlist!");
    });

    displayVehicles();
});


document.getElementById("reserveButton").addEventListener("click", () => {
    console.log("Копчето беше кликнато")
    let vehicle = "Peugeot 208 GT Line"; // земи вистинското име од страната
    let date = "2024-02-27"; // земи вистински датум од корисникот

    fetch("reserve.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `vehicle=${vehicle}&date=${date}`
    })
        .then(response => response.text())
        .then(data => alert(data));
});

document.addEventListener("DOMContentLoaded", function () {
    let loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Спречува reload на страницата

            let formData = new FormData(loginForm);

            fetch("login.php", {
                method: "POST",
                body: formData
            })
                .then(response => response.text())
                .then(data => {
                    console.log("Server response:", data); // Додај за проверка

                    if (data.includes("success")) {
                        window.location.href = "profile.php"; // Пренасочување ако е успешно
                    } else {
                        alert("Погрешен email или лозинка!");
                    }
                })
                .catch(error => console.error("Error:", error));
        });
    } else {
        console.error("loginForm не е пронајден!");
    }
});



document.querySelectorAll(".btn.details").forEach(button => {
    button.addEventListener("click", function () {
        const vehicle = {
            name: this.getAttribute("data-name"),
            images: JSON.parse(this.getAttribute("data-images")),
            price: this.getAttribute("data-price"),
            details: this.getAttribute("data-details")
        };

        localStorage.setItem("selectedVehicle", JSON.stringify(vehicle));
        window.location.href = "vehicle-details.html"; // Оди на страната со детали
    });
});

const imageSlider = document.getElementById("image-slider");


const imageList = JSON.parse(imageSlider.getAttribute("data-images"));


imageSlider.innerHTML = "";


imageList.forEach(imgSrc => {
    let imgElement = document.createElement("img");
    imgElement.src = imgSrc;
    imgElement.classList.add("carousel-image"); // Додај класа за стил
    imageSlider.appendChild(imgElement);
});

function showVehicleDetails(vehicleId) {
    const vehicles = {
        hyundai: {
            brand: "HYUNDAI",
            model: "I30",
            year: "2009",
            fuel: "Дизел",
            mileage: "170.000",
            transmission: "Рачен",
            bodyStyle: "Хеџбек",
            color: "Сива",
            registration: "Македонска",
            registrationDate: "Македонска",
            power: "1.6 CRDI 66kw",
            emissionsClass : "EURO 4",
            images: [
                "images/hyundai-1.jpg",
                "images/hyundai-2.jpg",
                "images/hyundai-3.jpg",
                "images/hyundai-4.jpg",
                "images/hyundai-5.jpg",
                "images/hyundai-6.jpg",
                "images/hyundai-7.jpg",
                "images/hyundai-8.jpg",
            ],
            price: "4.500 €",
        },
        audi: {
            brand: "Audi",
            model: "A3",
            year: "2007",
            fuel: "Дизел",
            mileage: "220.000",
            transmission: "Рачен",
            bodyStyle: "Хеџбек",
            color: "Црна",
            registration: "Македонска",
            registrationDate: "Македонска",
            power: "1.9 TDI 77kw",
            emissionsClass : "Еуро 4",
            images: [
                "images/audi-1.jpg",
                "images/audi-2.jpg",
                "images/audi-3.jpg",
                "images/audi-4.jpg",
                "images/audi-5.jpg",
                "images/audi-6.jpg",
                "images/audi-7.jpg",
                "images/audi-8.jpg",
            ],
            price: "5.650 €",
        },
        opelAdam2014: {
            brand: "Opel",
            model: "Adam",
            year: "2014",
            fuel: "Бензин",
            mileage: "110.000",
            transmission: "Рачен",
            bodyStyle: "Мали градски",
            color: "Бела",
            registration: "Македонска",
            registrationDate: "07.2023",
            power: "1.4i 64kw",
            emissionsClass : "Еуро 5",
            images: [
                "images/vehicle-2.jpg",
                "images/opel2014-2.jpg",
                "images/opel2014-3.jpg",
                "images/opel2014-4.jpg",
                "images/opel2014-5.jpg",
                "images/opel2014-6.jpg",
                "images/opel2014-7.jpg",
                "images/opel2014-8.jpg",
                "images/opel2014-9.jpg",
                "images/opel2014-10.jpg",
            ],
            price: "7.500 €",
        },
        peugeot208: {
            brand: "Peugeot",
            model: "208",
            year: "2019",
            fuel: "Бензин",
            mileage: "85.000",
            transmission: "Рачен",
            bodyStyle: "Мали градски",
            color: "Бела",
            registration: "Македонска",
            registrationDate: "06.2023",
            power: "1.2 STT 81kw",
            emissionsClass : "Еуро 5",
            images: [
                "images/vehicle-3.jpg",
                "images/peugeot2.jpg",
                "images/peugeot3.jpg",
                "images/peugeot4.jpg",
                "images/peugeot5.jpg",
                "images/peugeot6.jpg",
                "images/peugeot7.jpg",
                "images/peugeot8.jpg",
                "images/peugeot9.jpg",
                "images/peugeot10.jpg",
                "images/peugeot11.jpg",
                "images/peugeot12.jpg",
                "images/peugeot13.jpg",
            ],
            price: "9.400 €",
        },
       
        seatIbiza2013: {
            brand: "SEAT",
            model: "IBIZA",
            year: "2013",
            fuel: "Дизел",
            mileage: "140.000",
            transmission: "Рачен",
            bodyStyle: "Хеџбек",
            color: "Сива",
            registration: "Македонска",
            registrationDate: "Македонска",
            power: "1.2TDI 55kw",
            emissionsClass :" Eуро 5",
            images: [
                "images/seatIbiza2013-1.jpg",
                "images/seatIbiza2013-2.jpg",
                "images/seatIbiza2013-3.jpg",
                "images/seatIbiza2013-4.jpg",
                "images/seatIbiza2013-5.jpg",
                "images/seatIbiza2013-6.jpg",
                "images/seatIbiza2013-7.jpg",
                "images/seatIbiza2013-8.jpg",
                "images/seatIbiza2013-9.jpg",
                "images/seatIbiza2013-10.jpg",
                "images/seatIbiza2013-11.jpg",
            ],
            price: "5.800 €",
        },
        


        audia32007: {
            brand: "AUDI",
            model: "A3",
            year: "2007",
            fuel: "Дизел",
            mileage: "208.000",
            transmission: "Рачен",
            bodyStyle: "Хеџбек",
            color: "Црна",
            registration: "Македонска",
            registrationDate: "Македонска",
            power: "1.9 TDI 77kw",
            emissionsClass :" Eуро 4",
            images: [
                "images/audia32007-1.jpg",
                "images/audia32007-2.jpg",
                "images/audia32007-3.jpg",
                "images/audia32007-4.jpg",
                "images/audia32007-5.jpg",
                "images/audia32007-6.jpg",
                "images/audia32007-7.jpg",
                "images/audia32007-8.jpg",
                "images/audia32007-9.jpg",
                "images/audia32007-10.jpg",
                "images/audia32007-11.jpg",
            ],
            price: "6.400 €",
        },


         mercedesbenzc220: {
            brand: "Mercedes-Benz",
            model: "C220",
            year: "2010",
            fuel: "Дизел",
            mileage: "225.000",
            transmission: "Автоматик",
            bodyStyle: "Седан",
            color: "Црна",
            registration: "Македонска",
            registrationDate: "05.08.2026",
            power: "125kw",
            emissionsClass : "Еуро 5",
            images: [
                "images/mercedes-benz-c220-1.jpg",
                "images/mercedes-benz-c220-2.jpg",
                "images/mercedes-benz-c220-3.jpg",
                "images/mercedes-benz-c220-4.jpg",
                "images/mercedes-benz-c220-5.jpg",
                "images/mercedes-benz-c220-6.jpg",
                "images/mercedes-benz-c220-7.jpg",
                "images/mercedes-benz-c220-8.jpg",
                "images/mercedes-benz-c220-9.jpg",
                "images/mercedes-benz-c220-10.jpg",
            ],
            price: "8.500 €",
        },
        
        cadillaccts: {
            brand: "CADILLAC",
            model: "CTS",
            year: "2007",
            fuel: "Бензин",
            mileage: "130.000",
            transmission: "Автоматик",
            bodyStyle: "Седан",
            color: "Црна",
            registration: "Македонска",
            registrationDate: "04.12.2025",
            power: "182kw",
            emissionsClass : "Еуро 4",
            images: [
                "images/cadillac-cts-1.jpg",
                "images/cadillac-cts-2.jpg",
                "images/cadillac-cts-3.jpg",
                "images/cadillac-cts-4.jpg",
                "images/cadillac-cts-5.jpg",
                "images/cadillac-cts-6.jpg",
                "images/cadillac-cts-7.jpg",
                "images/cadillac-cts-8.jpg",
            ],
            price: "10.000 €",
        },


        

        passat: {
            brand: "VW",
            model: "Passat B6 Avant",
            year: "2007",
            fuel: "Дизел",
            mileage: "255.000",
            transmission: "Автомат DSG",
            bodyStyle: "Караван",
            color: "Црна",
            registration: "Македонска",
            registrationDate: "02.10.2026",
            power: "2.0 TDI 170hp",
            emissionsClass :" Eуро 4",
            images: [
                "images/passat-1.jpg",
                "images/passat-2.jpg",
                "images/passat-3.jpg",
                "images/passat-4.jpg",
                "images/passat-5.jpg",
                "images/passat-6.jpg",
                "images/passat-7.jpg",
                "images/passat-8.jpg", 
            ],
            price: "4.800 €",
        },

        BMWF20: {
            brand: "Bmw",
            model: "116d",
            year: "2014",
            fuel: "Дизел",
            mileage: "165.000",
            transmission: "Рачен",
            bodyStyle: "Хеџбек",
            color: "Црна",
            registration: "Македонска",
            registrationDate: "02.01.2025",
            power: "85kw 116hp",
            emissionsClass :" Eуро 5",
            images: [
                "images/bmw-1.jpg",
                "images/bmw-2.jpg",
                "images/bmw-3.jpg",
                "images/bmw-4.jpg",
                "images/bmw-5.jpg",
                "images/bmw-6.jpg",
                "images/bmw-7.jpg",
                "images/bmw-8.jpg",
            ],
            price: "9.800 €",
        },

        renaultmegane: {
            brand: "Renault",
            model: "Megane",
            year: "2010",
            fuel: "Дизел",
            mileage: "300.000",
            transmission: "Рачен",
            bodyStyle: "Караван",
            color: "Бела",
            registration: "Македонска",
            registrationDate: "01.01.2026",
            power: "1.5dci 81kw",
            emissionsClass :" Eуро 4",
            images: [
                "images/renault-megane-1.jpg",
                "images/renault-megane-2.jpg",
                "images/renault-megane-3.jpg",
                "images/renault-megane-4.jpg",
                "images/renault-megane-5.jpg",
                "images/renault-megane-6.jpg",
                "images/renault-megane-7.jpg",
            ],
            price: "4.300 €",
        },
        
         fiatbravo2012: {
            brand: "Fiat",
            model: "Bravo",
            year: "2012",
            fuel: "Дизел",
            mileage: "190.000",
            transmission: "Рачен",
            bodyStyle: "Хеџбек",
            color: "Црвена",
            registration: "Македонска",
            registrationDate: "Македонска",
            power: "1.6 JTD 77kw",
            emissionsClass :"EURO 4",
            images: [
                "images/fiatbravo2012-1.jpg",
                "images/fiatbravo2012-2.jpg",
                "images/fiatbravo2012-3.jpg",
                "images/fiatbravo2012-4.jpg",
                "images/fiatbravo2012-5.jpg",
                "images/fiatbravo2012-6.jpg",
                "images/fiatbravo2012-7.jpg",
                "images/fiatbravo2012-8.jpg",
                "images/fiatbravo2012-9.jpg",
                "images/fiatbravo2012-10.jpg",
                "images/fiatbravo2012-11.jpg",
            ],
            price: "4.700 €",
        },

        
         VW1200J: {
            brand: "VW Volkswagen",
            model: "Beetle",
            year: "1980",
            fuel: "Бензин",
            mileage: "70.000",
            transmission: "Рачен",
            bodyStyle: "Мали градски",
            color: "Бела",
            registration: "Македонска",
            registrationDate: "08.2025",
            power: "48kw 65ks",
            emissionsClass :" Eуро 1",
            images: [
                "images/VW-1 (2).jpg",
                "images/VW3.jpg",
                "images/VWNewImage3.jpg",
                "images/VW5.jpg",
                "images/VWNewImage5.jpg",
                "images/VWNewImage6.jpg",
            ],
            price: "3.300 €",
        },
        mercedesbenzvito: {
            brand: "Mercedes-Benz",
            model: "Vito",
            year: "2007",
            fuel: "Дизел",
            mileage: "310.000",
            transmission: "Автоматски",
            bodyStyle: "Комби 7+1",
            color: "Бела",
            registration: "Македонска",
            registrationDate: "24.09.2024",
            power: "2.2cc 110kw",
            emissionsClass :" Eуро 4",
            images: [
                "images/mercedes-benz-vito.jpg",
                "images/mercedes-benz-vito-2.jpg",
                "images/mercedes-benz-vito-3.jpg",
                "images/mercedes-benz-vito-4.jpg",
                "images/mercedes-benz-vito-5.jpg",
                "images/mercedes-benz-vito-6.jpg",
                "images/mercedes-benz-vito-7.jpg",
            ],
            price: "9.000 €",
        },
        
        Fiat500sport: {
            brand: "Fiat",
            model: "500",
            year: "2014",
            fuel: "Бензин",
            mileage: "140.000",
            transmission: "Рачен",
            bodyStyle: "Мали градски",
            color: "Бела",
            registration: "Македонска",
            registrationDate: "18.05.2024",
            power: "74kw 100hp",
            emissionsClass :" Eуро 5",
            images: [
                "images/fiat-1.jpg",
                "images/fiat-2.jpg",
                "images/fiat-3.jpg",
                "images/fiat-4.jpg",
                "images/fiat-5.jpg",
                "images/fiat-6.jpg",
                "images/fiat-7.jpg",
            ],
            price: "5.000 €",
        },

        BMWE92: {
            brand: "BMW E92",
            model: "325xi",
            year: "2007",
            fuel: "Бензин",
            mileage: "185.000",
            transmission: "Рачен",
            bodyStyle: "Купе",
            color: "Сива",
            registration: "Македонска",
            registrationDate: "02.06.2023",
            power: "160kw 218hp",
            emissionsClass :" Eуро 5",
            images: [
                "images/IMG_1204.jpg",
                "images/IMG_1205.jpg",
                "images/IMG_1207.jpg",
                "images/IMG_1209.jpg",
                "images/IMG_1210.jpg",
                "images/IMG_1212.jpg",
                "images/IMG_1231.jpg",
                "images/IMG_1254.jpg",
                "images/IMG_1262.jpg",
                "images/IMG_1272.jpg",
            ],
            price: "9.300 €",
        },
        MercedesAClass: {
            brand: "Mercedes A-Class",
            model: "A200",
            year: "2007",
            fuel: "Дизел",
            mileage: "205.000",
            transmission: "Рачен",
            bodyStyle: "Мали градски",
            color: "Сина",
            registration: "Македонска",
            registrationDate: "03.06.2023",
            power: "103kw 140hp",
            emissionsClass :" Eуро 5",
            images: [
                "images/DMRT9666.JPG",
                "images/DMRT9664.JPG",
                "images/DMRT9662.JPG",
                "images/DMRT9669.JPG",
                "images/DMRT9688.JPG",
                "images/DMRT9694.JPG",
            ],
            price: "4.000 €",
        },
        VolkswagenGolf5: {
            brand: "Volkswagen",
            model: "Golf 5",
            year: "2004",
            fuel: "Дизел",
            mileage: "172.000",
            transmission: "Рачен",
            bodyStyle: "Мали градски",
            color: "Црна",
            registration: "Македонска",
            registrationDate: "24.09.2024",
            power: "77kw 105hp",
            emissionsClass :" Eуро 4",
            images: [
                "images/golf-1.jpg",
                "images/golf-2.jpg",
                "images/golf-3.jpg",
                "images/golf-4.jpg",
                "images/golf-5.jpg",
                "images/golf-6.jpg",
            ],
            price: "4.200 €",
        },
        RenaultClio: {
            brand: "Renault",
            model: "Clio",
            year: "2014",
            fuel: "Дизел",
            mileage: "180.000",
            transmission: "Рачен",
            bodyStyle: "Мали градски",
            color: "Бела",
            registration: "Македонска",
            registrationDate: "23.02.2025",
            power: "55kw 75hp",
            emissionsClass :" Eуро 5",
            images: [
                "images/renault-1.jpg",
                "images/renault-2.jpg",
                "images/renault-3.jpg",
                "images/renault-4.jpg",
                "images/renault-5.jpg",
                "images/renault-6.jpg",
            ],
            price: "6.500 €",
        },
    };
    document.addEventListener("DOMContentLoaded", () => {
        const vehicle = vehicles['BMWF20'];
        if (vehicle.sold) {
            // console.log(vehicles['BMWF20']); // да видиш дали го чита
            // console.log('Продадено:', vehicles['BMWF20'].sold); // треба да каже true
            document.querySelector('.sold-badge').classList.remove('hidden');
        }
    });

    localStorage.setItem("selectedVehicle", JSON.stringify(vehicles[vehicleId]));


    window.location.href = "vehicle-details.html";
}

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    if (!calendarEl) {
        console.error("Грешка: <div id='calendar'> не постои!");
        return;
    }

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'mk',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        height: 600
    });

    calendar.render();
});

document.addEventListener("DOMContentLoaded", function () {
    const applyFiltersButton = document.getElementById("applyFilters");

    if (applyFiltersButton) {
        applyFiltersButton.addEventListener("click", function () {
            filterVehicles();
        });
    }
});

function filterVehicles() {
    const brandFilter = document.getElementById("brandFilter").value.toLowerCase();
    const modelFilter = document.getElementById("modelFilter").value.toLowerCase();
    const fuelFilter = document.getElementById("fuelFilter").value.toLowerCase();
    const priceFilter = document.getElementById("priceFilter").value;

    const vehicles = document.querySelectorAll(".featured-slider .swiper-slide");

    vehicles.forEach(vehicle => {
        let vehicleText = vehicle.textContent.toLowerCase();
        let vehiclePrice = vehicle.querySelector(".price")?.textContent.replace(/[^\d]/g, ""); // Извлекување на бројот од цената

        let isVisible = true;

        if (brandFilter && !vehicleText.includes(brandFilter)) {
            isVisible = false;
        }
        if (modelFilter && !vehicleText.includes(modelFilter)) {
            isVisible = false;
        }
        if (fuelFilter && !vehicleText.includes(fuelFilter)) {
            isVisible = false;
        }
        if (priceFilter && vehiclePrice && parseInt(vehiclePrice) > parseInt(priceFilter)) {
            isVisible = false;
        }

        vehicle.style.display = isVisible ? "block" : "none";
    });
}


document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll('.slide');
    let sliderHeading = document.getElementById("sliderHeading");
    let sliderSubtext = document.getElementById("sliderSubtext");
    let sliderText = document.querySelector('.slider-text');
    let currentSlide = 0;


    const slideTexts = [
        { heading: "Добредојдовте во Авто Центар!", subtext: "Најдобрите возила на пазарот." },
        { heading: "Откријте го вашето ново возило!", subtext: "Голем избор на квалитетни автомобили." },
        { heading: "Специјални понуди за оваа сезона!", subtext: "Погледнете ги најдобрите зделки." }
    ];

    function updateSlide() {

        slides.forEach(slide => slide.classList.remove("active"));
        slides[currentSlide].classList.add("active");


        sliderText.classList.remove("fade");

        setTimeout(() => {

            sliderHeading.textContent = slideTexts[currentSlide].heading;
            sliderSubtext.textContent = slideTexts[currentSlide].subtext;


            sliderText.classList.add("fade");
        }, 500); // Кратка пауза за ефектот да биде подобар
    }


    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }, 5000); // Менување на секои 5 секунди


    document.getElementById("nextSlide").addEventListener("click", function () {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    });

    document.getElementById("prevSlide").addEventListener("click", function () {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    });


    updateSlide();
});


document.getElementById("subscribe-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Спречува освежување на страницата

    let formData = new FormData(this);
    let responseMessage = document.getElementById("response-message");

    fetch(this.action, {
        method: this.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            responseMessage.style.display = "block";
            responseMessage.innerHTML = "✅ Ви благодариме за претплатата!";
            this.reset(); // Испразни го формуларот
        } else {
            responseMessage.style.display = "block";
            responseMessage.innerHTML = "❌ Грешка при испраќање. Обидете се повторно.";
        }
    }).catch(error => {
        responseMessage.style.display = "block";
        responseMessage.innerHTML = "❌ Грешка при испраќање. Обидете се повторно.";
    });
});

document.querySelector(".offer-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Спречува освежување на страницата

    let formData = new FormData(this);
    let responseMessage = document.querySelector(".offer-response");

    fetch(this.action, {
        method: this.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            responseMessage.style.display = "block";
            responseMessage.innerHTML = "✅ Вашето барање е испратено!";
            this.reset(); // Испразни го формуларот
        } else {
            responseMessage.style.display = "block";
            responseMessage.innerHTML = "❌ Грешка при испраќање. Обидете се повторно.";
        }
    }).catch(error => {
        responseMessage.style.display = "block";
        responseMessage.innerHTML = "❌ Грешка при испраќање. Обидете се повторно.";
    });
});












