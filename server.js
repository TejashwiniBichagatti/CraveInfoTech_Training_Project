const express = require('express');

const bodyParser = require('body-parser');




const app = express();

const port = 3000;



const carArray = [];




app.use(bodyParser.json());



app.post('/api/cars', (req, res) => {

  const { id, model, price, color } = req.body;




  if (!validateForm(id, model, price, color)) {

    return res.status(400).json({ message: 'Please fill in all fields correctly.' });

  }




  const car = { id, model, price, color };

  carArray.push(car);

  console.log(`Car added: ${id} - ${model} (${color}) - Price: $${price}`);

  console.log('Updated car list:', carArray);




  res.status(201).json(car);

});


app.get('/api/cars', (req, res) => {

  res.json(carArray);

});



app.get('/api/cars/:id', (req, res) => {

  const carId = req.params.id;

  const car = carArray.find((car) => car.id === carId);




  if (!car) {

    return res.status(404).json({ message: 'Car not found.' });

  }




  res.json(car);

});


app.put('/api/cars/:id', (req, res) => {

  const carId = req.params.id;

  const { id, model, price, color } = req.body;




  if (!validateForm(id, model, price, color)) {

    return res.status(400).json({ message: 'Please fill in all fields correctly.' });

  }




  const carIndex = carArray.findIndex((car) => car.id === carId);

  if (carIndex === -1) {

    return res.status(404).json({ message: 'Car not found.' });

  }




  const updatedCar = { id, model, price, color };

  carArray[carIndex] = updatedCar;

  console.log(`Car updated: ${id} - ${model} (${color}) - Price: $${price}`);

  console.log('Updated car list:', carArray);




  res.json(updatedCar);

});


app.delete('/api/cars/:id', (req, res) => {

  const carId = req.params.id;

  const carIndex = carArray.findIndex((car) => car.id === carId);




  if (carIndex === -1) {

    return res.status(404).json({ message: 'Car not found.' });

  }




  const deletedCar = carArray.splice(carIndex, 1)[0];

  console.log(`Car deleted: ${deletedCar.id} - ${deletedCar.model} (${deletedCar.color}) - Price: $${deletedCar.price}`);

  console.log('Updated car list:', carArray);




  res.json(deletedCar);

});




function validateForm(id, model, price, color) {

  if (!id || !model || isNaN(price) || price < 0 || !color) {

    return false;

  }

  return true;

}




app.listen(port, () => {

  console.log(`Server running on http://localhost:${port}`);

});