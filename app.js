const carForm = document.getElementById('carForm');

const carArray = [];




carForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const id = document.getElementById('id').value;

    const model = document.getElementById('model').value;

    const price = parseFloat(document.getElementById('price').value);

    const color = document.getElementById('color').value;




    if (validateForm(id, model, price, color)) {

        const car = { id, model, price, color };

        carArray.push(car);

        console.log(`Car added: ${id} - ${model} (${color}) - Price: $${price}`);

        console.log('Updated car list:', carArray);

        carForm.reset();

    }

});




function validateForm(id, model, price, color) {

    if (!id || !model || isNaN(price) || price < 0 || !color) {

        alert('Please fill in all fields correctly.');

        return false;

    }

    return true;

}