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

// const high5 = function () {
//   console.log(`👋🏽`);
// };

// .addEventListener is the higher order function
// JavaScript uses callback functions all the time
// Makes it easier to split up our code into more reusable parts
// Callback Functiins allow us to create abstraction
// Abstraction is hiding details of code implementation because we don't care about the details
// Allows us to thing of the code in a more detailed way
// document.body.addEventListener(`click`, high5);

// [`Jonas`, `Martha`, `Adam`].forEach(high5);

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

// when we use object together with event listeners
// with event listeners

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
  // add a new plane whenever the button is clicked on
};

document
  .querySelector(`.buy`)
  .addEventListener(`click`, lufthansa.buyPlane.bind(lufthansa));

// Partial Application
// means we can preset parameters

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23

console.log(addVAT(123));
console.log(addVAT(100));

// go back to grid function lecture and use that to write a function that writes a function

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));

// Coding Challenge #1
const poll = {
  question: `What is your faborite programming language?`,
  options: [`0: JavaScript`, `1: Python`, `2: Rust`, `3: C++`],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // Get Answer
    const answer = Number(
      prompt(
        `${this.question} \n ${this.options.join(`\n`)}\n(Write option number)`
      )
    );
    // console.log(answer);
    // Register answer
    typeof answer === `number` &&
      answer < this.answers.length &&
      this.answers[answer]++;
    this.displayResults();
    this.displayResults(`string`);
  },

  displayResults(type = `array`) {
    if (type === `array`) {
      console.log(this.answers);
    } else if (type === `string`) {
      console.log(`Poll results are ${this.answers.join(`, `)}`);
    }
  },
};

// poll.registerNewAnswer();
document
  .querySelector(`.poll`)
  .addEventListener(`click`, poll.registerNewAnswer.bind(poll));

// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]

// different this keyword uses call()
// object that contains the answers property
poll.displayResults.call({ answers: [5, 2, 3] }, `string`);

// <--- Immediatley Invoked Function Expression --->

// you can run runOnce later on in the code no problem
// nothing is stopping you
const runOnce = function () {
  console.log(`This will never run again`);
};

runOnce();

// write the function expression do not name it >> will throw an error
// wrap it in parenthese() and call it immediatley ();
// no error and it will run but you cannot call it again
//IIFE
(function () {
  console.log(`This will never run again`);
})();
//IIFE Arrow Function
(() => console.log(`This will never run again`))();
// all data inside of a scope is private // or encapsulated
// variables created with let or const they have their own scope // create a block

// <--- Closures --->

// closure is not something that we explicitly use
// it happens automatically... we just need to recognize those situations
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

// closure makes a function remember all the variables that existed at the functions birth place
// closures have priority of scope chain

//closure summary
// a closure is the closed-over variable environment of the execution context in which a function was created, even after that execution context is gone.
// a closure gives a function access to all the variables of its parent function, even after that parent function has returned. The function keeps a reference to its outer scope, which preserves the scope chain throughout time.
// a closure makes sure that a function doesn't lose connection to variables that existed at the functions birth place.
// we do not have to explicitly set a closure... they are not an object that we can access, cannot take variables from it
// internal property of a function

// !! a closure is like a backpack that a function carries around wherever it goes. This backpack has all the variables that were present in the environment where the function was created.

console.dir(booker);

// brackets is an internal property that we can not access in our code after console.dir ex: [[scopes]]

// <--- More Closure Examples -->

// Example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f(); //46
// re-assinging f function
h();
f(); //1554

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  // timer
  setTimeout(function () {
    console.log(`we are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // closures have priorities in the scope

boardPassengers(180, 3);

// <--- Coding Challenge #2 --->
