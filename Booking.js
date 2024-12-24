const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
];

// Elements
const movieDropdown = document.querySelector(".selectMovie");
const movieNameElement = document.getElementById("movieName");
const moviePriceElement = document.getElementById("moviePrice");
const seatContainer = document.getElementById("seatCont");
const totalPriceElement = document.getElementById("totalPrice");
const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
const continueButton = document.getElementById("continue");
const cancelButton = document.getElementById("cancel");

let selectedSeats = [];
let currentMovie = moviesList[0]; // Default movie is Flash

// Populate movie dropdown
function populateDropdown() {
    moviesList.forEach((movie, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = movie.movieName;
        movieDropdown.appendChild(option);
    });
}
populateDropdown();

// Set initial movie details
movieNameElement.textContent = currentMovie.movieName;
moviePriceElement.textContent = currentMovie.price;
updatePrice();

// Update movie details on dropdown change
movieDropdown.addEventListener("change", (event) => {
    const selectedIndex = event.target.value;
    currentMovie = moviesList[selectedIndex];
    movieNameElement.textContent = currentMovie.movieName;
    moviePriceElement.textContent = currentMovie.price;
    updatePrice();
});

// Add event listeners to seats
const seats = document.querySelectorAll("#seatCont .seat");
seats.forEach((seat, index) => {
    if (!seat.classList.contains("occupied")) {
        seat.addEventListener("click", () => toggleSeatSelection(seat, index));
    }
});

// Toggle seat selection
function toggleSeatSelection(seat, index) {
    if (seat.classList.contains("selected")) {
        // Deselect the seat
        seat.classList.remove("selected");
        selectedSeats = selectedSeats.filter((i) => i !== index);
    } else {
        // Select the seat
        seat.classList.add("selected");
        selectedSeats.push(index);
    }
    updateSelectedSeatsDisplay();
    updatePrice();
}

// Update selected seats display
function updateSelectedSeatsDisplay() {
    selectedSeatsHolder.innerHTML = ""; // Clear previous content
    if (selectedSeats.length === 0) {
        const spanEl = document.createElement("span");
        spanEl.classList.add("noSelected");
        spanEl.textContent = "No seat Selected";
        selectedSeatsHolder.appendChild(spanEl);
    } else {
        selectedSeats.forEach((seatIndex) => {
            const seatDiv = document.createElement("div"); // Create individual seat elements
            seatDiv.classList.add("selectedSeat");
            seatDiv.textContent = `Seat ${seatIndex + 1}`; // 1-based indexing
            selectedSeatsHolder.appendChild(seatDiv);
        });
    }
}

// Update total price
function updatePrice() {
    const total = selectedSeats.length * currentMovie.price;
    totalPriceElement.textContent = total;
}

// Continue button functionality
continueButton.addEventListener("click", () => {
    if (selectedSeats.length === 0) {
        alert("Oops no seat Selected");
    } else {
        alert("Yayy! Your Seats have been booked");
        selectedSeats.forEach((index) => {
            seats[index].classList.remove("selected");
            seats[index].classList.add("occupied");
        });
        resetSelection();
    }
});

// Cancel button functionality
cancelButton.addEventListener("click", () => {
    selectedSeats.forEach((index) => {
        seats[index].classList.remove("selected");
    });
    resetSelection();
});

// Reset seat selection
function resetSelection() {
    selectedSeats = [];
    updateSelectedSeatsDisplay();
    updatePrice();
}
