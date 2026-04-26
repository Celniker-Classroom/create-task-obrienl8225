const toppings = [
    { value: "pepperoni",    price: 1,   calories: 130 },
    { value: "mushrooms",    price: 0.5, calories: 10  },
    { value: "onions",       price: 0.5, calories: 10  },
    { value: "olives",       price: 0.5, calories: 15  },
    { value: "bell-peppers", price: 0.5, calories: 10  },
    { value: "pineapple",    price: 1,   calories: 20  }
];

const sizePrices    = { small: 5, medium: 10, large: 15 };
const crustPrices   = { thin: 0, stuffed: 2, "gluten-free": 3 };
const saucePrices   = { tomato: 0, alfredo: 1.5, pesto: 1.5 };
const cheesePrices  = { mozzarella: 0, cheddar: 0.5, vegan: 1 };

const sizeCalories  = { small: 400, medium: 700, large: 1000 };
const crustCalories = { thin: 0, stuffed: 150, "gluten-free": 50 };
const sauceCalories = { tomato: 30, alfredo: 120, pesto: 100 };
const cheeseCalories= { mozzarella: 80, cheddar: 110, vegan: 60 };


// cart allows for multiple pizzas to be added instead of just one
const cart = [];


// price and calorie calculation

function calculatePrice(size, crust, sauce, cheese, chosenToppings) {
    let total =
        (sizePrices[size] || 0) +
        (crustPrices[crust] || 0) +
        (saucePrices[sauce] || 0) +
        (cheesePrices[cheese] || 0);

    chosenToppings.forEach(tv => {
        const topping = toppings.find(t => t.value === tv);
        if (topping) total += topping.price;
    });

    return total;
}

function calculateCalories(size, crust, sauce, cheese, chosenToppings) {
    let total =
        (sizeCalories[size] || 0) +
        (crustCalories[crust] || 0) +
        (sauceCalories[sauce] || 0) +
        (cheeseCalories[cheese] || 0);

    chosenToppings.forEach(tv => {
        const topping = toppings.find(t => t.value === tv);
        if (topping) total += topping.calories;
    });

    return total;
}


function getCurrentPizza() {
    const size   = document.querySelector('input[name="size"]:checked')?.value;
    const crust  = document.querySelector('input[name="crust"]:checked')?.value;
    const sauce  = document.querySelector('input[name="sauce"]:checked')?.value;
    const cheese = document.querySelector('input[name="cheese"]:checked')?.value;

    const chosenToppings = [];
    document.querySelectorAll('input[name="toppings"]:checked')
        .forEach(t => chosenToppings.push(t.value));

    return { size, crust, sauce, cheese, chosenToppings };
}


//allows for additional pizzas to be added which differs from my orginal create task

function addPizza() {
    const pizza = getCurrentPizza();
    cart.push(pizza);

    updateOrderSummary();
}


//updates total price and calories in cart

function updateOrderSummary() {
    let totalPrice = 0;
    let totalCalories = 0;

    cart.forEach(pizza => {
        totalPrice += calculatePrice(
            pizza.size,
            pizza.crust,
            pizza.sauce,
            pizza.cheese,
            pizza.chosenToppings
        );

        totalCalories += calculateCalories(
            pizza.size,
            pizza.crust,
            pizza.sauce,
            pizza.cheese,
            pizza.chosenToppings
        );
    });

    //discount feature for ordering multiple pizzas
    if (cart.length > 3) {
        totalPrice *= 0.9;
    }

    //tax feature 
    totalPrice *= 1.08;

    document.getElementById("price-display").innerText =
        "$" + totalPrice.toFixed(2);

    document.getElementById("calories-display").innerText =
        totalCalories + " kcal";

    renderCart();
}
//cart that replaced complete order in original create task
function renderCart() {
    const container = document.getElementById("cart");
    container.innerHTML = "";

    cart.forEach((pizza, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <div>
                Pizza ${index + 1}: ${pizza.size}, ${pizza.crust}, ${pizza.sauce}, ${pizza.cheese}
            </div>
            <div class="actions">
                <button onclick="editPizza(${index})">Edit</button>
                <button onclick="removePizza(${index})">Remove</button>
            </div>
        `;

        container.appendChild(div);
    });
}


//allows for pizza to be removed 
//used a chatbot to figure out how ot do this

function removePizza(index) {
    cart.splice(index, 1);
    updateOrderSummary();
}
//allows for pizza to be editied 
//figured out how to do this by watching an explanation on youtube and also using a chatbot to fix errors and understand it better 
function editPizza(index) {
    const pizza = cart[index];

    document.querySelector(`input[name="size"][value="${pizza.size}"]`).checked = true;
    document.querySelector(`input[name="crust"][value="${pizza.crust}"]`).checked = true;
    document.querySelector(`input[name="sauce"][value="${pizza.sauce}"]`).checked = true;
    document.querySelector(`input[name="cheese"][value="${pizza.cheese}"]`).checked = true;

    document.querySelectorAll('input[name="toppings"]').forEach(t => {
        t.checked = pizza.chosenToppings.includes(t.value);
    });

    cart.splice(index, 1);

    updateOrderSummary();
}
//changed complete order ot update pizza
document.querySelector("button").addEventListener("click", addPizza);