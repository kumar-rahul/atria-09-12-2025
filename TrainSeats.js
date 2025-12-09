// Train Seat Booking System
// Problem: Consider there are 10 stations, check seat availability in between station 3 and station 6.
class TrainSeat {
    seatNumber;
    // Array to track booking status for each segment between stations
    // segments[i] represents journey from station i to station i+1
    segments;
    constructor(seatNumber, totalStations) {
        this.seatNumber = seatNumber;
        // For n stations, there are n-1 segments
        this.segments = new Array(totalStations - 1).fill(false);
    }
    // Book seat from startStation to endStation
    // Returns true if booking successful, false if already booked
    book(startStation, endStation) {
        // Check if seat is available for all segments in the journey
        for (let i = startStation; i < endStation; i++) {
            if (this.segments[i]) {
                return false; // Seat already booked for this segment
            }
        }
        // Book all segments for the journey
        for (let i = startStation; i < endStation; i++) {
            this.segments[i] = true;
        }
        return true;
    }
    // Check if seat is available from startStation to endStation
    isAvailable(startStation, endStation) {
        for (let i = startStation; i < endStation; i++) {
            if (this.segments[i]) {
                return false;
            }
        }
        return true;
    }
    // Display booking status for all segments
    displayStatus() {
        console.log(`Seat ${this.seatNumber}:`);
        for (let i = 0; i < this.segments.length; i++) {
            const status = this.segments[i] ? "Booked" : "Available";
            console.log(`  Station ${i} -> Station ${i + 1}: ${status}`);
        }
    }
}
class TrainBookingSystem {
    totalStations;
    seats;
    constructor(totalStations, totalSeats) {
        this.totalStations = totalStations;
        this.seats = [];
        // Initialize all seats
        for (let i = 1; i <= totalSeats; i++) {
            this.seats.push(new TrainSeat(i, totalStations));
        }
    }
    // Check seat availability between two stations
    checkAvailability(startStation, endStation) {
        if (startStation < 0 || endStation > this.totalStations - 1 || startStation >= endStation) {
            console.log("Invalid station numbers");
            return [];
        }
        const availableSeats = [];
        for (const seat of this.seats) {
            if (seat.isAvailable(startStation, endStation)) {
                availableSeats.push(seat.seatNumber);
            }
        }
        return availableSeats;
    }
    // Book a specific seat from startStation to endStation
    bookSeat(seatNumber, startStation, endStation) {
        if (seatNumber < 1 || seatNumber > this.seats.length) {
            console.log("Invalid seat number");
            return false;
        }
        const seat = this.seats[seatNumber - 1];
        const success = seat.book(startStation, endStation);
        if (success) {
            console.log(`✓ Seat ${seatNumber} booked from Station ${startStation} to Station ${endStation}`);
        }
        else {
            console.log(`✗ Seat ${seatNumber} not available from Station ${startStation} to Station ${endStation}`);
        }
        return success;
    }
    // Display status of all seats
    displayAllSeats() {
        console.log("\n=== Train Booking Status ===");
        for (const seat of this.seats) {
            seat.displayStatus();
            console.log();
        }
    }
}
// Example usage: 10 stations, 5 seats
console.log("=== Train Booking System ===");
console.log("Total Stations: 10 (Station 0 to Station 9)");
console.log("Total Seats: 5\n");
const train = new TrainBookingSystem(10, 5);
// Make some bookings
console.log("--- Making some bookings ---");
train.bookSeat(1, 0, 3); // Seat 1: Station 0 to 3
train.bookSeat(1, 7, 9); // Seat 1: Station 7 to 9
train.bookSeat(2, 2, 7); // Seat 2: Station 2 to 7
train.bookSeat(3, 4, 8); // Seat 3: Station 4 to 8
train.bookSeat(4, 1, 4); // Seat 4: Station 1 to 4
console.log("\n--- Checking availability between Station 3 and Station 6 ---");
const availableSeats = train.checkAvailability(3, 6);
if (availableSeats.length > 0) {
    console.log(`Available seats: ${availableSeats.join(", ")}`);
    console.log(`Total available seats: ${availableSeats.length}`);
}
else {
    console.log("No seats available for this journey");
}
// Try booking an available seat
if (availableSeats.length > 0) {
    console.log(`\n--- Attempting to book Seat ${availableSeats[0]} from Station 3 to Station 6 ---`);
    train.bookSeat(availableSeats[0], 3, 6);
}
// Display detailed status
train.displayAllSeats();
// Check availability again after booking
console.log("--- Rechecking availability between Station 3 and Station 6 ---");
const updatedAvailableSeats = train.checkAvailability(3, 6);
console.log(`Available seats: ${updatedAvailableSeats.join(", ") || "None"}`);
console.log(`Total available seats: ${updatedAvailableSeats.length}`);
export { TrainSeat, TrainBookingSystem };
