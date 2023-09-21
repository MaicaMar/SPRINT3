// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
let products = [
   {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
let cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
let cart = [];

let total = 0;

// Exercise 1
function buy(id) {
    // 1. Loop through the array 'products' to find the item to add to cart
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                cartList.push(products[i]);
                console.log(`Se agregó "${products[i].name}" al carrito.`);
                console.log("Producto-objeto añadido al carrito:", products[i]);
                calculateTotal(cartList)
            }
        }
        document.getElementById("count_product").innerHTML = cartList.length
}

// Exercise 2
function cleanCart() {
    // Empty the cartList array to clear the cart
    cartList = [];
    cart = [];

    console.log("El carrito está vacío.");
    console.log("Contenido actual del carrito:", cartList);

    printCart()

    document.getElementById("count_product").innerHTML = cartList.length
    document.getElementById("total_price").innerHTML = "0.00"

}

// Exercise 3
function calculateTotal() {

    total = 0;

    // Calculate total price of the cart using the "cartList" array
    for (let i = 0; i < cartList.length; i++) {
        total += cartList[i].price;
    }

    console.log(`El precio total es ${total}`);
}

// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    for (let i = 0; i < cartList.length; i++) {
        let currentProduct = cartList[i];
        console.log("Product:", currentProduct);
        let found = false;

        for (let j = 0; j < cart.length; j++) {
            if (cart[j].id === currentProduct.id) {
                cart[j].quantity++;
                found = true;
                break;
            }
        }

        if (!found) {
            let newCartItem = {
                id: currentProduct.id,
                name: currentProduct.name,
                price: currentProduct.price,
                type: currentProduct.type,
                quantity: 1,
            };
            cart.push(newCartItem);
        }
    }
    console.log("Generated cart:", cart);
}

// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"

    total = 0;

    for (let i = 0; i < cart.length; i++) {
        let product = cart[i]
        if (product.hasOwnProperty("offer") && product.quantity >= product.offer.number) {
            product.subtotalWithDiscount = product.quantity * product.price * product.offer.percent
            total += product.subtotalWithDiscount
        } else {
            product.subtotalWithDiscount = product.quantity * product.price
            total += product.subtotalWithDiscount
        }
    }
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom

    applyPromotionsCart();

    let printedCart = [];

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];

        printedCart.push(
            `<tr>
                <th>${product.name}</th>
                <td>${product.price.toFixed(2)}</td> 
                <td>${product.quantity}</td>
                <td>${product.subtotalWithDiscount.toFixed(2)}</td>
                <td><a type="button" onclick="removeFromCart(${product.id})">
                <i class="fa fa-trash" aria-hidden="true"></i></a></td>
            </tr>`
        );
    }
    document.getElementById("cart_list").innerHTML = printedCart.join('');
    document.getElementById('total_price').innerHTML = total.toFixed(2);
}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
        const product = products.find(product => product.id === id);
    
        if (product) {
            const existingProduct = cart.find(product => product.id === product.id);
    
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            total += product.price;
        }
    
}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array

    const product = cart.find(product => product.id === id);
    if (product) {
        if (product.quantity === 1) {
            cart = cart.filter(item => item.id !== id);
        } else {
            product.quantity--;
        }
        total -= product.price;
    }
}

function open_modal(){
	console.log("Open Modal");
    generateCart();
	printCart();
}