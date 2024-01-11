'use strict';

const bookings = [];

// setting default parameters of numPassengers and Price
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

// cannot skip number of passengers
// second arguement will always be mapped as number of passenger
// can set it to undefined to overlay it
// ex: createBooking(`LH123`, undefined, 1000);

createBooking(`LH123`);
createBooking(`LH123`, 2, 800);
createBooking(`LH123`, 2);
