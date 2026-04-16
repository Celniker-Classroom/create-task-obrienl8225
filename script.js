// add javascript here
//cost for each part of the pizza
const sizePrices = { 
    small: 5,
    medium: 10,
    large: 15
};

const crustPrices = {
    thin: 0,
    stuffed: 2,
    "gluten-free": 3
};

const toppingPrices = {
    pepperoni: 1,
    mushrooms: 0.5,
    onions: 0.5,
    olives: .5,
    "bell-peppers": .5,
    pineapple: 1
};
//function to calculate and update price
function calculatePrice(size, crust, toppings) {
    let total = 0;

   if(size) total += sizePrices[size];
if(crust) total += crustPrices[crust];

    for(let i = 0; i < toppings.length; i++) {
        total += toppingPrices[toppings[i]];
    }

    return total;
}

function updatePizza(){
    const size = document.querySelector('input[name="size"]:checked')?.value;
    const crust = document.querySelector('input[name="crust"]:checked')?.value;

    const checkedToppings = document.querySelectorAll('input[name="toppings"]:checked');
    let toppings = [];

    checkedToppings.forEach( t => toppings.push(t.value));
    const price = calculatePrice(size, crust, toppings);


document.getElementById("price-display").innerText = "$" + price.toFixed(2);

}
//function to display the updated price
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("change", updatePizza);
});
