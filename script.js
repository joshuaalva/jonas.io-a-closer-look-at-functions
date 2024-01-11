'use strict';

// <----- Default Parameters ----->

// const bookings = [];

// setting default parameters of numPassengers and Price
// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };

//   console.log(booking);
//   bookings.push(booking);
// };

// cannot skip number of passengers
// second arguement will always be mapped as number of passenger
// can set it to undefined to overlay it
// ex: createBooking(`LH123`, undefined, 1000);

// createBooking(`LH123`);
// createBooking(`LH123`, 2, 800);
// createBooking(`LH123`, 2);

// <----- How Passing Arguements Works: Values vs. Reference ----->

// const flight = `LH234`;
// const joshua = {
//   name: `Joshua Alvarado`,
//   passport: 247393939,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = `LH999`;
//   passenger.name = `Mr. ` + passenger.name;

//   if (passenger.passport === 247393939) {
//     alert(`Check In`);
//   } else alert(`Wrong passport`);
// };

// checkIn(flight, joshua);
// console.log(flight);
// console.log(joshua);

// Passing by Value vs. Reference
// JS does not have passing by reference only passing by value

// <----- First-Class and Higher Order Functions ----->
