const sizePrices = { small: 5, medium: 10, large: 15 };
const crustPrices = { thin: 0, stuffed: 2, "gluten-free": 3 };
const saucePrices = { tomato: 0, alfredo: 1.5, pesto: 1.5 };
const cheesePrices = { mozzarella: 0, cheddar: 0.5, vegan: 1 };
const toppingPrices = {
    pepperoni: 1, mushrooms: 0.5, onions: 0.5,
    olives: 0.5, "bell-peppers": 0.5, pineapple: 1
};

const sizeCalories   = { small: 400, medium: 700, large: 1000 };
const crustCalories  = { thin: 0, stuffed: 150, "gluten-free": 50 };
const sauceCalories  = { tomato: 30, alfredo: 120, pesto: 100 };
const cheeseCalories = { mozzarella: 80, cheddar: 110, vegan: 60 };
const toppingCalories = {
    pepperoni: 130, mushrooms: 10, onions: 10,
    olives: 15, "bell-peppers": 10, pineapple: 20
};

function calculatePrice(size, crust, sauce, cheese, toppings) {
    let total = 0;
    if (size)   total += sizePrices[size];
    if (crust)  total += crustPrices[crust];
    if (sauce)  total += saucePrices[sauce];
    if (cheese) total += cheesePrices[cheese];
    toppings.forEach(t => total += toppingPrices[t]);
    return total;
}

function calculateCalories(size, crust, sauce, cheese, toppings) {
    let total = 0;
    if (size)   total += sizeCalories[size];
    if (crust)  total += crustCalories[crust];
    if (sauce)  total += sauceCalories[sauce];
    if (cheese) total += cheeseCalories[cheese];
    toppings.forEach(t => total += toppingCalories[t]);
    return total;
}

function updatePizza() {
    const size   = document.querySelector('input[name="size"]:checked')?.value;
    const crust  = document.querySelector('input[name="crust"]:checked')?.value;
    const sauce  = document.querySelector('input[name="sauce"]:checked')?.value;
    const cheese = document.querySelector('input[name="cheese"]:checked')?.value;

    const toppings = [];
    document.querySelectorAll('input[name="toppings"]:checked')
        .forEach(t => toppings.push(t.value));

    const price    = calculatePrice(size, crust, sauce, cheese, toppings);
    const calories = calculateCalories(size, crust, sauce, cheese, toppings);

    document.getElementById("price-display").innerText    = "$" + price.toFixed(2);
    document.getElementById("calories-display").innerText = calories + " kcal";
}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("change", updatePizza);
});