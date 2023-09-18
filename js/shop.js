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
function buy(id) { // El ejercicio ya viene configurado con 'id' como parámetro de buy()
    // 1. Loop through the array 'products' to find the item to add to cart
        // Buscamos el producto a través de su propiedad 'id' en el array 'products'
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) { // Encontramos el producto 'i' rastreado en 'products'...
                // ... y lo añadimos al array cartList
                cartList.push(products[i]);
                // Mostramos información en la consola
                console.log(`Se agregó "${products[i].name}" al carrito.`);
                console.log("Producto-objeto añadido al carrito:", products[i]);
                // LLAMAMOS A LA FUNCIÓN calculateTotal Y LE ENVIAMOS 'cartList' PARA QUE CALCULE EL TOTAL
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
// La variable 'total' es de ámbito global y está inicializada con un valor de 0
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
    // Iterar sobre cada elemento del array "cartList"
    for (let i = 0; i < cartList.length; i++) {
        // Guardamos cada elemento en una variable 'currentProduct' para posteriormente...
        let currentProduct = cartList[i];
        console.log("Product:", currentProduct);
        let found = false;

        // ... recorriendo el array 'cart' verificar si el producto ya está en el 'cart'
        for (let j = 0; j < cart.length; j++) {
            if (cart[j].id === currentProduct.id) {
                cart[j].quantity++;
                found = true;
                break;
            }
        }

        // Si el producto no se encontró en el carrito, lo agregamos
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

    // Ahora tenemos el array "cart" actualizado con productos únicos con cantidades
    console.log("Generated cart:", cart);
}

// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"

    total = 0;

    for (let i = 0; i < cart.length; i++) {
        // Se crea una variable `product` que representa el producto actual en el bucle...
        // ...En cada iteración, `product` tomará el valor del producto en la posición `i` del array `cart`.
        let product = cart[i]
        // Verificamos si el objeto `product` tiene una propiedad llamada "offer" usando el método .hasOwnProperty()...
        // ... y verificamos si la cantidad de ese producto en el carrito (product.quantity)...
        // ... es mayor o igual al número requerido para activar la oferta (product.offer.number).
        if (product.hasOwnProperty("offer") && product.quantity >= product.offer.number) {
            // Si la condición en el if es verdadera, se calcula el precio con descuento para ese producto...
            // ... se multiplica la cantidad del producto (product.quantity) por el precio unitario del producto (product.price)...
            // ... y por el porcentaje de descuento de la oferta (product.offer.percent)...
            // ... El resultado se asigna a la propiedad subtotalWithDiscount del producto.
            product.subtotalWithDiscount = product.quantity * product.price * product.offer.percent
            // El subtotal con % se suma al total: acumula el precio total con % para todos los productos en el carrito.
            total += product.subtotalWithDiscount
        // Si el producto no tiene una oferta o la cantidad no es suficiente para activar la oferta:
        } else {
            // Calculamos el subtotal sin % para el producto multiplicando la cantidad por el precio unitario...
            // ... y se asigna a la propiedad `subtotalWithDiscount` del producto.
            product.subtotalWithDiscount = product.quantity * product.price
            // Sumamos el subtotal con o sin % al total en cada iteración del bucle, lo que acumula el precio total 
            // de todos los productos en el carrito, incluyendo aquellos sin descuento.
            total += product.subtotalWithDiscount
        }
    }
    // Actualizamos el HTML con el ID 'total_price' con el valor total calculado, formateado a dos decimales con toFixed(2).
    //document.getElementById('total_price').innerHTML = total.toFixed(2)
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom

    // Llamamos a la función applyPromotionsCart() primero para asegurar de que se aplican las promociones antes de mostrar el carrito.
    applyPromotionsCart();

    // Creamos un array `printedCart` para almacenar el HTML de cada producto en el carrito.
    let printedCart = [];

    // Se itera a través de la matriz `cart` que contiene los productos en el carrito.
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];

        // Para cada producto, se genera una fila de una tabla HTML que muestra el nombre del producto, su precio unitario,
        // la cantidad en el carrito y el subtotal con descuento. Estos detalles se agregan al arreglo printedCart.
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

    // Actualizamos el contenido HTML del elemento con el ID 'cart_list' con el HTML generado.
    // Esto actualiza la interfaz de usuario con la lista de productos en el carrito.
    document.getElementById("cart_list").innerHTML = printedCart.join('');

    // Se actualiza el elemento con el ID 'total_price' con el valor total del carrito (incluyendo descuentos) 
    // para reflejar el precio total en la interfaz.
    document.getElementById('total_price').innerHTML = total.toFixed(2);
}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
        /* `const product` almacenará el producto encontrado en el arreglo `products` que coincida con cierta condición.
            `.find()` método para buscar el primer elemento que cumple con cierta condición en el arreglo.
            `(item => item.id === id)` Arrow function que se pasa como argumento al método .find(): se ejecutará 
            para cada elemento en el arreglo products, y se utilizará para evaluar si el atributo `id` del elemento 
            es igual al valor de `id` que se pasa como argumento a la función `addToCart(id)`.
            `product` es un parámetro que representa cada elemento del arreglo `products` a medida que la función 
            se ejecuta en cada elemento.
            `item.id` accede al atributo `id` del elemento actual en la iteración.
            === es el operador de igualdad estricta que verifica si el `id` del elemento actual es igual al `id` pasado como argumento.
            `id` es el valor pasado como argumento a la función `addToCart(id)` que representa el `id` del producto 
            que se desea agregar al carrito. */
        const product = products.find(product => product.id === id);
    
        if (product) { // Si se encuentra el producto en `products`...
            const existingProduct = cart.find(product => product.id === product.id); // ...verificamos si ya existe en el array `cart`
    
            if (existingProduct) { // Si el producto ya existe en `cart`...
                // Añadimos la propiedad `quantity` de forma dinámica al objeto `products` y le sumamos una unidad
                existingProduct.quantity++;
            } else { // Si no existe el producto en `cart`...
                // ... lo añadimos y añadimos también la propiedad `quantity` con la cantidad en 1
                /* `...product` ("spread operator" en JavaScript), es lo mismo que 
                    {
                    name: product.name,
                    price: product.price,
                    id: product.id,
                    quantity: 1
                } */
                cart.push({ ...product, quantity: 1 });
            }
            // Se agrega el precio del producto al total del carrito (`total`)
            total += product.price;
        }
    
}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array

    // Remove a product from the cart based on its id
    const product = cart.find(product => product.id === id);
    if (product) {
        if (product.quantity === 1) {
            // If there's only one of this product, remove it completely
            cart = cart.filter(item => item.id !== id);
        } else {
            // Otherwise, decrease the quantity
            product.quantity--;
        }
        // Update the total price
        total -= product.price;
    }
}

function open_modal(){
	console.log("Open Modal");
    generateCart();
	printCart();
}








/* "modal" es un término conceptual que se refiere a un tipo de ventana emergente o componente de interfaz 
de usuario que se utiliza para diversos propósitos en aplicaciones web. Puede contener contenido personalizado, 
formularios, botones y lógica personalizada. La función open_modal() de este código es una forma de abrir 
o mostrar un modal personalizado en esta aplicación web, y la función printCart() probablemente se encarga 
de generar el contenido que se mostrará en ese modal. */

/*

1. `buy(id)`: 
Esta función se llama cuando alguien quiere comprar un producto. 
Recorre la matriz `products` en busca del producto con el `id` proporcionado y lo agrega a la matriz `cartList`. 
Luego, llama a la función `calculateTotal(cartList)` para calcular el precio total de los productos en el carrito 
y actualiza la cantidad de productos en el carrito que se muestra en la interfaz.

2. `cleanCart()`: 
Esta función se encarga de vaciar el carrito. Simplemente establece las matrices `cartList` y `cart` 
en un arreglo vacío, lo que significa que el carrito estará completamente vacío. 
Luego, llama a la función `printCart()` para actualizar la interfaz del carrito 
y muestra la cantidad de productos en 0.

3. `calculateTotal()`: 
Esta función calcula el precio total de los productos en el carrito utilizando la matriz `cartList`. 
Itera a través de los productos en `cartList` y suma sus precios individuales para obtener el total. 
Luego, actualiza el elemento en la interfaz que muestra el precio total.

4. `generateCart()`: 
Esta función toma la matriz `cartList`, que contiene todos los elementos en el carrito, 
y genera la matriz `cart`, que no contiene elementos repetidos y en su lugar muestra la cantidad de cada producto 
en el carrito. Por ejemplo, si tienes 3 productos idénticos en el carrito, `cart` tendrá un solo elemento 
para ese producto con la cantidad igual a 3.

5. `applyPromotionsCart()`: 
Esta función aplica promociones a los productos en el carrito. Itera a través de la matriz `cart` 
y verifica si un producto tiene una oferta. Si es así, se aplica el descuento según la oferta 
y se calcula el precio subtotal con descuento. 
Luego, suma estos subtotales para calcular el nuevo precio total con descuento y actualiza la interfaz.

6. `printCart()`: 
Esta función actualiza la interfaz del carrito. Genera una lista de productos en el carrito 
con detalles como nombre, precio, cantidad y subtotal con descuento. 
Luego, muestra esta lista en la interfaz.

7. `addToCart(id)`: 
Esta función simplifica el proceso de agregar productos al carrito. 
Busca el producto con el `id` proporcionado en la matriz `products`. 
Si lo encuentra, verifica si ya está en el carrito (en la matriz `cart`). 
Si no está en el carrito, lo agrega con una cantidad inicial de 1. 
Si ya está en el carrito, aumenta la cantidad en 1. 
Luego, agrega el producto a la matriz `cartList`, recalcula el total 
y actualiza la cantidad de productos en el carrito que se muestra en la interfaz.

8. `removeFromCart(id)`: 
Esta función se utiliza para eliminar productos del carrito. 
Busca el producto con el `id` proporcionado en las matrices `cart` y `cartList`. 
Si encuentra el producto, reduce su cantidad en 1 en `cart` y elimina completamente el producto de `cartList`. 
Luego, actualiza la interfaz del carrito y la cantidad de productos en el carrito que se muestra en la interfaz.

9. `open_modal()`: 
Esta función se utiliza para abrir la lista del carrito cuando se hace clic en su icono correspondiente. 
Genera la matriz `cart`, actualiza la interfaz del carrito y la muestra.
*/

/*
Ejemplo de una función tradicional:

function suma(a, b) {
    return a + b;
}

Ejemplo equivalente con una arrow function:

const suma = (a, b) => a + b;
*/