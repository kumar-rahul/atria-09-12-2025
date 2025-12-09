// Train Seat Booking System using LinkedList
// Problem: Consider there are 10 stations, check seat availability in between station 3 and station 6.

// Node to represent a booking segment
class BookingNode {
  startStation: number;
  endStation: number;
  next: BookingNode | null;

  constructor(startStation: number, endStation: number) {
    this.startStation = startStation;
    this.endStation = endStation;
    this.next = null;
  }
}

// LinkedList to manage bookings for a single seat
class BookingList {
  head: BookingNode | null;

  constructor() {
    this.head = null;
  }

  // Check if a new booking conflicts with existing bookings
  // Two bookings conflict if they overlap in their station ranges
  hasConflict(startStation: number, endStation: number): boolean {
    let current = this.head;

    while (current) {
      // Check if the ranges overlap
      // Ranges [a,b) and [c,d) overlap if: a < d AND c < b
      if (startStation < current.endStation && current.startStation < endStation) {
        return true; // Conflict found
      }
      current = current.next;
    }

    return false; // No conflict
  }

  // Add a booking to the list (insert in sorted order by startStation)
  // This keeps bookings organized and makes conflict checking more efficient
  addBooking(startStation: number, endStation: number): boolean {
    if (this.hasConflict(startStation, endStation)) {
      return false; // Cannot book due to conflict
    }

    const newNode = new BookingNode(startStation, endStation);

    // Insert at the beginning if list is empty or new booking starts before head
    if (!this.head || startStation < this.head.startStation) {
      newNode.next = this.head;
      this.head = newNode;
      return true;
    }

    // Find the correct position to insert (maintaining sorted order)
    let current = this.head;
    while (current.next && current.next.startStation < startStation) {
      current = current.next;
    }

    newNode.next = current.next;
    current.next = newNode;
    return true;
  }

  // Display all bookings for this seat
  displayBookings(): void {
    if (!this.head) {
      console.log("    No bookings");
      return;
    }

    let current = this.head;
    while (current) {
      console.log(`    Station ${current.startStation} → Station ${current.endStation}`);
      current = current.next;
    }
  }

  // Check if seat is available for a journey
  isAvailable(startStation: number, endStation: number): boolean {
    return !this.hasConflict(startStation, endStation);
  }
}

// Seat class with LinkedList-based booking management
class TrainSeatLinkedList {
  seatNumber: number;
  bookings: BookingList;

  constructor(seatNumber: number) {
    this.seatNumber = seatNumber;
    this.bookings = new BookingList();
  }

  // Book this seat for a journey
  book(startStation: number, endStation: number): boolean {
    return this.bookings.addBooking(startStation, endStation);
  }

  // Check if seat is available for a journey
  isAvailable(startStation: number, endStation: number): boolean {
    return this.bookings.isAvailable(startStation, endStation);
  }

  // Display all bookings for this seat
  displayBookings(): void {
    console.log(`Seat ${this.seatNumber}:`);
    this.bookings.displayBookings();
  }
}

// Train booking system managing multiple seats
class TrainBookingSystemLinkedList {
  totalStations: number;
  seats: TrainSeatLinkedList[];

  constructor(totalStations: number, totalSeats: number) {
    this.totalStations = totalStations;
    this.seats = [];

    // Initialize all seats
    for (let i = 1; i <= totalSeats; i++) {
      this.seats.push(new TrainSeatLinkedList(i));
    }
  }

  // Check seat availability between two stations
  checkAvailability(startStation: number, endStation: number): number[] {
    if (startStation < 0 || endStation > this.totalStations || startStation >= endStation) {
      console.log("Invalid station numbers");
      return [];
    }

    const availableSeats: number[] = [];

    for (const seat of this.seats) {
      if (seat.isAvailable(startStation, endStation)) {
        availableSeats.push(seat.seatNumber);
      }
    }

    return availableSeats;
  }

  // Book a specific seat
  bookSeat(seatNumber: number, startStation: number, endStation: number): boolean {
    if (seatNumber < 1 || seatNumber > this.seats.length) {
      console.log("Invalid seat number");
      return false;
    }

    const seat = this.seats[seatNumber - 1];
    const success = seat.book(startStation, endStation);

    if (success) {
      console.log(`✓ Seat ${seatNumber} booked from Station ${startStation} to Station ${endStation}`);
    } else {
      console.log(`✗ Seat ${seatNumber} not available from Station ${startStation} to Station ${endStation}`);
    }

    return success;
  }

  // Display all bookings for all seats
  displayAllBookings(): void {
    console.log("\n=== All Seat Bookings (LinkedList-based) ===");
    for (const seat of this.seats) {
      seat.displayBookings();
    }
    console.log();
  }
}

// Example usage
console.log("=== Train Booking System (LinkedList Implementation) ===");
console.log("Total Stations: 10 (Station 0 to Station 9)");
console.log("Total Seats: 5\n");

const train = new TrainBookingSystemLinkedList(10, 5);

// Make some bookings
console.log("--- Making some bookings ---");
train.bookSeat(1, 0, 3);   // Seat 1: Station 0 to 3
train.bookSeat(1, 7, 9);   // Seat 1: Station 7 to 9
train.bookSeat(2, 2, 7);   // Seat 2: Station 2 to 7
train.bookSeat(3, 4, 8);   // Seat 3: Station 4 to 8
train.bookSeat(4, 1, 4);   // Seat 4: Station 1 to 4

console.log("\n--- Checking availability between Station 3 and Station 6 ---");
const availableSeats = train.checkAvailability(3, 6);

if (availableSeats.length > 0) {
  console.log(`Available seats: ${availableSeats.join(", ")}`);
  console.log(`Total available seats: ${availableSeats.length}`);
} else {
  console.log("No seats available for this journey");
}

// Try booking an available seat
if (availableSeats.length > 0) {
  console.log(`\n--- Attempting to book Seat ${availableSeats[0]} from Station 3 to Station 6 ---`);
  train.bookSeat(availableSeats[0], 3, 6);
}

// Try booking a conflicting journey
console.log("\n--- Attempting to book Seat 2 from Station 5 to Station 8 (should conflict) ---");
train.bookSeat(2, 5, 8);

// Display all bookings
train.displayAllBookings();

// Check availability again after booking
console.log("--- Rechecking availability between Station 3 and Station 6 ---");
const updatedAvailableSeats = train.checkAvailability(3, 6);
console.log(`Available seats: ${updatedAvailableSeats.join(", ") || "None"}`);
console.log(`Total available seats: ${updatedAvailableSeats.length}`);

console.log("\n--- How LinkedList helps ---");
console.log("✓ Each seat maintains a LinkedList of bookings");
console.log("✓ Bookings are stored in sorted order by start station");
console.log("✓ Conflict detection: O(n) where n = number of bookings per seat");
console.log("✓ Dynamic memory allocation - only stores actual bookings");
console.log("✓ Easy insertion/deletion of bookings without resizing arrays");

export { BookingNode, BookingList, TrainSeatLinkedList, TrainBookingSystemLinkedList };
