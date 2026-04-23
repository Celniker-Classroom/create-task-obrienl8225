const toppings = [
    { value: "pepperoni",    price: 1,   calories: 130 },
    { value: "mushrooms",    price: 0.5, calories: 10  },
    { value: "onions",       price: 0.5, calories: 10  },
    { value: "olives",       price: 0.5, calories: 15  },
    { value: "bell-peppers", price: 0.5, calories: 10  },
    { value: "pineapple",    price: 1,   calories: 20  }
];
const sizePrices    = { small: 5,   medium: 10,  large: 15  };
const crustPrices   = { thin: 0,    stuffed: 2,  "gluten-free": 3   };
const saucePrices   = { tomato: 0,  alfredo: 1.5, pesto: 1.5 };
const cheesePrices  = { mozzarella: 0, cheddar: 0.5, vegan: 1 };

const sizeCalories  = { small: 400, medium: 700, large: 1000 };
const crustCalories = { thin: 0,    stuffed: 150, "gluten-free": 50 };
const sauceCalories = { tomato: 30, alfredo: 120, pesto: 100 };
const cheeseCalories= { mozzarella: 80, cheddar: 110, vegan: 60 };

function calculatePrice(size, crust, sauce, cheese, chosenToppings) {
    let total = (sizePrices[size] || 0) + (crustPrices[crust] || 0) + (saucePrices[sauce] || 0) + (cheesePrices[cheese] || 0);

    chosenToppings.forEach(function(tv) {
        const topping = toppings.find(t => t.value === tv);
        if (topping) total += topping.price;
    });

    return total;
}
function calculateCalories(size, crust, sauce, cheese, chosenToppings) {
    let total = (sizeCalories[size] || 0) + (crustCalories[crust] || 0) + (sauceCalories[sauce] || 0) + (cheeseCalories[cheese] || 0);

    chosenToppings.forEach(function(tv) {
        const topping = toppings.find(t => t.value === tv);
        if (topping) total += topping.calories;
    });

    return total;
}
function updatePizza() {
    const size   = document.querySelector('input[name="size"]:checked')?.value;
    const crust  = document.querySelector('input[name="crust"]:checked')?.value;
    const sauce  = document.querySelector('input[name="sauce"]:checked')?.value;
    const cheese = document.querySelector('input[name="cheese"]:checked')?.value;

    const chosenToppings = [];
    document.querySelectorAll('input[name="toppings"]:checked').forEach(function(t) {
        chosenToppings.push(t.value);
    });

    document.getElementById("price-display").innerText    = "$" 
    + calculatePrice(size, crust, sauce, cheese, chosenToppings).toFixed(2);
    document.getElementById("calories-display").innerText = calculateCalories(size, crust, sauce, cheese, chosenToppings) + " kcal";
}
document.querySelector("button").addEventListener("click", updatePizza);
 // discount/tax rate for total price
 let total = 10 + toppings * 1.5;
total *= toppings > 3 ? 0.9 : 1;
total *= 1.08;