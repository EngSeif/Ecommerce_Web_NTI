'use strict'

//* NavBar Menu Icon Logic

const menuItems = document.querySelector('.Menu-items')
document.getElementById("Menu-button").addEventListener('click', (e) => {
    e.target.name = e.target.name === 'menu' ? 'close' : 'menu'
    menuItems.classList.toggle('top-[6.12%]')
})

//* Shop Cart Open And Close

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

//* Add Products

let productContainer = document.getElementById('ProductList');
let selectList = document.getElementById('Selector');

let xhr = new XMLHttpRequest();
xhr.open('GET', './products.json');
xhr.send();

function addOneProduct(paintType, products) {
    for (const paint of products) {
        let price = parseFloat(paint.price.split(" ")[1])
        productContainer.innerHTML +=`
                      <div
    class="card bg-white text-grey-700 min-h-[10rem] shadow-lg rounded-md overflow-hidden w-full"
  >
    <img
      class="w-full object-cover h-[400px]"
      src=${paint.src}
      alt="image"
    />
    <div class="p-5 flex flex-col gap-3">
      <div>
        <span class="px-3 py-1 rounded-full bg-[#FFF8EA] text-xs"
          >${paintType}</span
        >
        <span class="px-3 py-1 rounded-full bg-[#FFF8EA] text-xs"
          >${paint.artist}</span
        >
      </div>
      <h2 class="text-3xl font-bold">${paint.name}</h2>

      <div>
        <span>$ ${(price - (price * 0.2)).toFixed(2)}</span>
        <div>
          <span class="text-xs line-through">$ ${price.toFixed(2)}</span>
          <span
            class="text-xs text-white bg-[#11B78F] px-3 py-1 rounded-full"
            >Save 20%</span
          >
        </div>
      </div>
      <div class="flex gap-2 items-center">
        <button
          class="px-3 py-1 button-in text-white rounded-lg flex items-center gap-2 justify-center"
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
            `
    }
}


function addAllProducts(products) {
    for (const paintType in products) {
        for (const paint of products[paintType]) {
            let price = parseFloat(paint.price.split(" ")[1])
            productContainer.innerHTML +=`
                          <div
        class="card bg-white text-grey-700 min-h-[10rem] shadow-lg rounded-md overflow-hidden w-full"
      >
        <img
          class="w-full object-cover h-[400px]"
          src=${paint.src}
          alt="image"
        />
        <div class="p-5 flex flex-col gap-3">
          <div>
            <span class="px-3 py-1 rounded-full bg-[#FFF8EA] text-xs"
              >${paintType}</span
            >
            <span class="px-3 py-1 rounded-full bg-[#FFF8EA] text-xs"
              >${paint.artist}</span
            >
          </div>
          <h2 class="text-3xl font-bold">${paint.name}</h2>

          <div>
            <span>$ ${(price - (price * 0.2)).toFixed(2)}</span>
            <div>
              <span class="text-xs line-through">$ ${price.toFixed(2)}</span>
              <span
                class="text-xs text-white bg-[#11B78F] px-3 py-1 rounded-full"
                >Save 20%</span
              >
            </div>
          </div>
          <div class="flex gap-2 items-center">
            <button
              class="px-3 py-1 button-in text-white rounded-lg flex items-center gap-2 justify-center"
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
                `
        }
    }
}


xhr.addEventListener('readystatechange', () => {
    if (xhr.status == 200 && xhr.readyState == 4) {

    //! First : Add Products

    let products = JSON.parse(xhr.responseText);
    for (const paintType in products) {
        selectList.innerHTML += `<option value="${paintType}">${paintType.charAt(0).toUpperCase() + paintType.slice(1)}</option>`;
    }
    addAllProducts(products); 

    //! Second : Add Heart Button Animation

    const heartIcons= document.getElementsByClassName('heart');
    for (const heartIcon of heartIcons) {
        heartIcon.addEventListener('click', () => {
        heartIcon.style.color = heartIcon.style.color === "" ? "red" : "";
            })
        }

     //! Add Select Functionality
    selectList.addEventListener('change', () => {
            if (selectList.value == "all") {
                productContainer.innerHTML = ""
                addAllProducts(products);
            } else {
                productContainer.innerHTML = ""
                addOneProduct(selectList.value, products[selectList.value]);
            }
        })
    }
});

