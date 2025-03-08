let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick=()=>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

document.querySelector('#login-btn').onclick=()=>{
    document.querySelector('.login-form-containter').classList.toggle('active');
}

document.querySelector('#close-login-form').onclick=()=>{
    document.querySelector('.login-form-containter').classList.remove('active');
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

// document.querySelector('.home').onmousemove = (e) =>{
//     document.querySelectorAll('.home-parallax').forEach(elm=>{
//          let speed = elm.getAttribute('data-speed');
//          let x = (window.innerWidth - e.pageX * speed) / 90;
//          let y = (window.innerHeight - e.pageY * speed) / 90;
//
//          elm.style.transform = `translateX(${y}px) translateY(${x}px)`;
//     });
// };
//
// document.querySelector('.home').onmouseleave = () =>{
//     document.querySelectorAll('.home-parallax').forEach(elm=>{
//
//         elm.style.transform = `translateX(0px) translateY(0px)`;
//     });
// };

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

var swiper = new Swiper(".featured-slider", {
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
            vehicleCard.innerHTML = `<h3>${vehicle.brand} ${vehicle.model}</h3><p>Цена: ${vehicle.price} €</p>`;
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
            vehicleCard.innerHTML = `<h3>${vehicle.brand} ${vehicle.model}</h3><p>Цена: ${vehicle.price} €</p>`;
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
    const priceFilter = document.getElementById("priceFilter");
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
//     const vehicles = [
//         { brand: "Audi", model: "A4", fuel: "Дизел", price: 15000, image: "images/audi-a4.jpg", details: "Одличен семеен автомобил." },
//         { brand: "BMW", model: "320d", fuel: "Дизел", price: 18000, image: "images/bmw-320d.jpg", details: "Спортски стил и економичност." },
//         { brand: "Mercedes", model: "C220", fuel: "Бензин", price: 20000, image: "images/mercedes-c220.jpg", details: "Луксуз и удобност." },
//         { brand: "Volkswagen", model: "Golf 7", fuel: "Дизел", price: 14000, image: "images/golf-7.jpg", details: "Економично и практично возило." }
//     ];
//
//     const vehicleList = document.getElementById("vehicle-list");
//     const modal = document.getElementById("vehicleModal");
//     const modalTitle = document.getElementById("vehicleTitle");
//     const modalImage = document.getElementById("vehicleImage");
//     const modalDetails = document.getElementById("vehicleDetails");
//     const closeModal = document.querySelector(".close");
//     const wishlistButton = document.getElementById("wishlistButton");

    // function displayVehicles() {
    //     vehicleList.innerHTML = "";
    //     vehicles.forEach((vehicle, index) => {
    //         let vehicleCard = document.createElement("div");
    //         vehicleCard.classList.add("vehicle-card");
    //         vehicleCard.innerHTML = `<h3>${vehicle.brand} ${vehicle.model}</h3><p>Цена: ${vehicle.price} €</p>`;
    //         vehicleCard.addEventListener("click", () => showVehicleDetails(index));
    //         vehicleList.appendChild(vehicleCard);
    //     });
    // }

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


// function openVehicleDetails(name, image, price, details) {
//     const vehicle = {
//         name: name,
//         image: image,
//         price: price,
//         details: details
//     };
//     localStorage.setItem("selectedVehicle", JSON.stringify(vehicle));
//     window.location.href = "vehicle-details.html"; // Отвара детална страница
// }



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
// Земаме го елементот што ги содржи сликите
const imageSlider = document.getElementById("image-slider");

// Читаме ги сликите од data-images атрибутот
const imageList = JSON.parse(imageSlider.getAttribute("data-images"));

// Чистиме стари слики ако има
imageSlider.innerHTML = "";

// Додаваме секоја слика во каруселот
imageList.forEach(imgSrc => {
    let imgElement = document.createElement("img");
    imgElement.src = imgSrc;
    imgElement.classList.add("carousel-image"); // Додај класа за стил
    imageSlider.appendChild(imgElement);
});

function showVehicleDetails(vehicleId) {
    const vehicles = {
        opelAdam2014: {
            brand: "Opel",
            model: "Adam",
            year: "2014",
            fuel: "Бензин",
            mileage: "110000",
            transmission: "Рачен",
            bodyStyle: "Мали градски",
            color: "Бела",
            registration: "Македонска",
            registrationDate: "07.2023",
            power: "64 kw / 87 ks",
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
                "images/opel2014-11.jpg",
                "images/opel2014-12.jpg",
                "images/opel2014-13.jpg",
            ],
        },
        peugeot208: {
            brand: "Peugeot",
            model: "208",
            year: "2019",
            fuel: "Бензин",
            mileage: "85000",
            transmission: "Рачен",
            bodyStyle: "Мали градски",
            color: "Бела",
            registration: "Македонска",
            registrationDate: "06.2023",
            power: "81 kw / 110 ks",
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
            ],
        },
        VW1200J: {
            brand: "VW Volkswagen",
            model: "Beetle",
            year: "1980",
            fuel: "Бензин",
            mileage: "70000",
            transmission: "Рачен",
            bodyStyle: "Мали градски",
            color: "Бела",
            registration: "Македонска",
            registrationDate: "08.2025",
            power: "48 kw / 65 ks",
            emissionsClass :" Eуро 1",
            images: [
                "images/vehicle-4.jpg",
                "images/VW3.jpg",
                "images/VW4.jpg",
                "images/VW5.jpg",
                "images/VW6.jpg",
                "images/VW7.jpg",
                "images/VW8.jpg",
            ],
        },
      VW1200J: {
            brand: "VW Volkswagen",
            model: "Beetle",
            year: "1980",
            fuel: "Бензин",
            mileage: "70000",
            transmission: "Рачен",
            bodyStyle: "Мали градски",
            color: "Бела",
            registration: "Македонска",
            registrationDate: "08.2025",
            power: "48 kw / 65 ks",
            emissionsClass :" Eуро 1",
            images: [
                "images/vehicle-4.jpg",
                "images/VW3.jpg",
                "images/VW4.jpg",
                "images/VW5.jpg",
                "images/VW6.jpg",
                "images/VW7.jpg",
                "images/VW8.jpg",
            ],
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
            power: "160kw/ 218hp",
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
            power: "103kw/ 140hp",
            emissionsClass :" Eуро 5",
            images: [
                "images/DMRT9662.JPG",
                "images/DMRT9664.JPG",
                "images/DMRT9666.JPG",
                "images/DMRT9669.JPG",
                "images/DMRT9688.JPG",
                "images/DMRT9694.JPG",
            ],
        },
    // Зачувај податоците на возилото во localStorage
    localStorage.setItem("selectedVehicle", JSON.stringify(vehicles[vehicleId]));

    // Пренасочи на страницата со деталите
    window.location.href = "vehicle-details.html";
}


// document.addEventListener('DOMContentLoaded', function () {
//     var calendarEl = document.getElementById('calendar');
//     var calendar = new FullCalendar.Calendar(calendarEl, {
//         initialView: 'dayGridMonth', // Месечен преглед
//         locale: 'mk', // Македонски јазик
//         events: [
//             {
//                 title: 'Работно време: 08:00 - 16:00',
//                 startTime: '08:00',
//                 endTime: '16:00',
//                 daysOfWeek: [1, 2, 3, 4, 5, 6], // Понеделник - Сабота
//             }
//         ]
//     });
//     calendar.render();
//
// });

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    if (!calendarEl) {
        console.error("Грешка: <div id='calendar'> не постои!");
        return;
    }

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',  // Првичен изглед – месечен календар
        locale: 'mk',  // Македонски јазик
        headerToolbar: {
            left: 'prev,next today',  // Копчиња за навигација
            center: 'title',  // Наслов (Јануари 2025, Февруари 2025 итн.)
            right: 'dayGridMonth,timeGridWeek,timeGridDay'  // Промена на изглед
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
