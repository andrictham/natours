const fs = require('fs');

// Store the name of the file into a variable
const toursFile = `${__dirname}/../dev-data/data/tours-simple.json`;
// Use a JSON file as a source for our data
const tours = JSON.parse(fs.readFileSync(toursFile));

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  // Take the ID of the last item in the array, and increment by 1
  const newId = tours[tours.length - 1].id + 1;

  // Merge an object containing just the new ID as a property, and the request body object
  const newTour = Object.assign({ id: newId }, req.body);

  // Push the new tour into the tours object in memory
  tours.push(newTour);

  // Commit the tours object to file,
  // then when it succeeds, in the callback, send a response back to the client with the new tour that was created.
  fs.writeFile(toursFile, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};

exports.updateTour = (req, res) => {
  console.log(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      tour: `<Updated tour here>`,
    },
  });
};

exports.deleteTour = (req, res) => {
  console.log(req.body);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
