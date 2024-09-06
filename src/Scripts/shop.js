'use strict'
const menuItems = document.querySelector('.Menu-items')
document.getElementById("Menu-button").addEventListener('click', (e) => {
    e.target.name = e.target.name === 'menu' ? 'close' : 'menu'
    menuItems.classList.toggle('top-[6.12%]')
})

const heartIcons= document.getElementsByClassName('heart');
for (const heartIcon of heartIcons) {
    heartIcon.addEventListener('click', () => {
        heartIcon.style.color = heartIcon.style.color === "" ? "red" : "";
    })
}

const shopCart = document.getElementById("Shop-cart");
const shopCartLayer = document.getElementById("Shop-cart-layer");

document.getElementById("cart").addEventListener('click', ()=> {
    shopCart.style.display = shopCart.style.display == "" ? "block" : "";
    shopCartLayer .style.display = shopCartLayer.style.display == "" ? "block" : "";
})

document.getElementById("close").addEventListener('click', ()=> {
    shopCart.style.display = shopCart.style.display == "" ? "block" : "";
    shopCartLayer .style.display = shopCartLayer.style.display == "" ? "block" : "";
})


// ------------------------------ Cart Logic ------------------------- //
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let products = [];
let cart = [];


// add data to HTML
    let addDataToHTML = () => {
    // remove datas default from HTML

        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = `
                <div
            class="card bg-white text-grey-700 w-72 min-h-[10rem] shadow-lg rounded-md overflow-hidden w-fit"
          >
            <img
              class="w-full object-cover"
              src="${product.image}"
              alt="image"
            />
            <div class="p-5 flex flex-col gap-3">
              <div>
                <span class="px-3 py-1 rounded-full bg-[#FFF8EA] text-xs"
                  >Painting Type</span
                >
                <span class="px-3 py-1 rounded-full bg-[#FFF8EA] text-xs"
                  >Artist</span
                >
              </div>
              <h2 class="text-3xl font-bold">${product.name}</h2>

              <div>
                <span>$ 120.00</span>
                <div>
                  <span class="text-xs line-through">$${product.price}</span>
                  <span
                    class="text-xs text-white bg-[#11B78F] px-3 py-1 rounded-full"
                    >Save 20%</span
                  >
                </div>
              </div>
              <div class="flex gap-2 items-center">
                <button
                  class="addCart px-3 py-1 button-in text-white rounded-lg flex items-center gap-2 justify-center"
                >
                  <ion-icon name="cart-outline" class="text-lg"></ion-icon>
                  <span>Add to cart</span>
                </button>

                <ion-icon
                  name="heart"
                  class="heart text-xl duration-50"
                ></ion-icon>
              </div>
            </div>
          </div>
                `;
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })



    // Send Data Product To Cart
let addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
let addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add Data Product To Cart
let addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="flex gap-2 h-1/6 w-full py-2 border-b-2 border-gray-200">
              <img src="${info.image}">
              <div class="flex justify-center flex-col">
                <h3>${info.name}</h3>
                <p>${info.price * item.quantity}</p>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus">+</span>
                </div>
              </div>
              <ion-icon class="ml-auto text-2xl hover:text-red-500" name="close-circle"></ion-icon>
            </div>`;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}


listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})


let changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

// get data from JSON
let initApp = () => {
    // get data product
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();
