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

// First-Class Functions -->
// jS treats functions as first-class citizens
// this means that function are simply values
// functions are just another "type" of object

// store functions in variables or propeties
// pass functions as arguement to other functions
// return functions FROM other functions
// Call methods on function (ex: .bind)

// Higher Order Functions -->
// A function that recieves another function as an argument, that returns a new function or both
// This is only possible because of first-class functions

// There are no first-class functions in practice only in theory. There are higher-order functions in practice

// <----- Functions Accepting Callback Functions ----->
// Ex: Higher Order Functions -->
const oneWord = function (str) {
  return str.replace(/ /g, ``).toLowerCase();
  // The "g" after the regular expression is an option or flag that performs a global search, looking in the whole string and returning all matches
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(` `);
  return [first.toUpperCase(), ...others].join(` `);
};

// because it takes in a a function >> it becomes a higher order function
const transformer = function (str, fn) {
  console.log(`Original String ${str}`);
  console.log(`Transformed String: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

// just passing in the function value
transformer(`JavaScript is the best!`, upperFirstWord);
transformer(`JavaScript is the best`, oneWord);

const high5 = function () {
  console.log(`👋🏽`);
};

// .addEventListener is the higher order function
// JavaScript uses callback functions all the time
// Makes it easier to split up our code into more reusable parts
// Callback Functiins allow us to create abstraction
// Abstraction is hiding details of code implementation because we don't care about the details
// Allows us to thing of the code in a more detailed way
document.body.addEventListener(`click`, high5);

[`Jonas`, `Martha`, `Adam`].forEach(high5);

// Example 2:
// const fire = function () {
//   console.log(`🔥`);
// };

// document.body.addEventListener(`click`, fire);

// <----- Functions Returning Functions ----->

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

// greeterHey becomes the function inside of the greet function
const greeterHey = greet(`Hello`);
greeterHey(`Joshua`);
greeterHey(`Steven`);

greet(`Hello`)(`Mike`);

// arrow funciton doing the same thing
// arrow function returning another arrow function
const arrowHey = greeting => name => console.log(`${greeting} ${name}`);

// <----- The Call and Apply Methods ----->

const lufthansa = {
  airline: `Lufthansa`,
  iataCode: `LH`,
  bookings: [],
  // book: function(){}, // Old Syntax
  book(flightNum, name) {
    // enhanced object literal with no function
    console.log(
      `${name} booked a seat on ${this.airline}, flight ${this.iataCode} ${flightNum} `
    );
    this.bookings.push({ flight: `${this.iataCode} ${flightNum}`, name });
  },
};

lufthansa.book(239, `Joshua Alvarado`);
lufthansa.book(635, `John Smith`);

const eurowings = {
  airline: `Eurowings`,
  iataCode: `EW`,
  bookings: [],
};

console.log(lufthansa);

const book = lufthansa.book;

// book function no longer the book method
// now a function
// so being a function call this keyword doesn't work
// makes this undefined using just book()
// does not work
// book(23, `Sarah Williams`);
// call, apply, and bind could fix this issue

// this keyword set to eurowings
// manually and explicitly

// Call Method
book.call(eurowings, 23, `Sarah Williams`);
console.log(eurowings);

book.call(lufthansa, `239`, `Joshua Alvarado`);
console.log(lufthansa);

const swiss = {
  airline: `Swiss Airlines`,
  iataCode: `LX`,
  bookings: [],
};

book.call(swiss, 583, `Mary Cooper`);
// console.log(swiss);

// Apply Method
const flightData = [583, `George Cooper`];
book.apply(swiss, flightData);
// console.log(swiss);

book.call(swiss, ...flightData);

// call , apply, bind methods
// https://www.youtube.com/watch?v=rZc7_2YXbP8

// <----- The Bind Method ----->
// Bind does not immediatley call the function
// It create an entirely new function
// book.call(eurowings, 23, `Sarah Williams`);

// will not call book function
// will return a new function where the this keyword is always eurowings
// no longer need to specify this keyword

const bookEurowings = book.bind(eurowings);
const bookSwiss = book.bind(swiss);
const bookLufthansa = book.bind(lufthansa);
bookSwiss(690, `Joshua Alvarado`);
bookLufthansa(999, `Carlos Alvarado`);
// eurowings not pointing towards the function !!!!!! fix later
// Airline part undefined
// Sarah Williams booked a seat on undefined, flight EW 23
bookEurowings(23, `Sarah Williams`);

// continued ...
console.log(`<-- trouble shooting below -->`);
book.call(eurowings, 23, `Sarah Williams`);
