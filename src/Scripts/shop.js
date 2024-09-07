'use strict'


let totalProductCount = document.getElementById("totalProducts");
let carts = [];
let catContainer = document.getElementById('category');
let counter = 0;
let countContainer = document.getElementById('counter')
let products;

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
      if (paintType == paint.category) {
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
          >${paint.category}</span
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
            counter += 1;
      }
    }
}


function addAllProducts(products) {
    for (const paint of products) {
            let price = parseFloat(paint.price.split(" ")[1])
            productContainer.innerHTML +=`
                          <div
        class="card bg-white text-grey-700 min-h-[10rem] shadow-lg rounded-md overflow-hidden w-full" data-id="${paint.id}"
      >
        <img
          class="w-full object-cover h-[400px]"
          src=${paint.src}
          alt="image"
        />
        <div class="p-5 flex flex-col gap-3">
          <div>
            <span class="px-3 py-1 rounded-full bg-[#FFF8EA] text-xs"
              >${paint.category}</span
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
              class="add px-3 py-1 button-in text-white rounded-lg flex items-center gap-2 justify-center"
            >
              Add to cart
            </button>

            <ion-icon
              name="heart"
              class="heart text-xl duration-50"
            ></ion-icon>
          </div>
        </div>
      </div>
                `
        counter += 1;
        }
}

function addToCart(productId) {
  let inCart = carts.findIndex((value)=> value.productId == productId);
  if (carts.length <= 0) {
    carts = [{
      productId: productId,
      quantity: 1
    }]
  } else if (inCart < 0) {
    carts.push(
      {
        productId: productId,
        quantity: 1
      }
    )
  } else {
    carts[inCart].quantity += 1
  }
  addToCartToHtml();
  addCartToMemo();
}

let cartContainer = document.getElementById('Cart-container');

function addToCartToHtml() {
  let totalQuantity = 0;
  cartContainer.innerHTML = ''
  if (carts.length > 0) {
    carts.forEach((cart)=> {
      totalQuantity = totalQuantity + cart.quantity;
      let itemPostion = carts.findIndex((value)=> value.productId == cart.productId);
      let info = products[itemPostion];
      let price = parseFloat(info.price.split(" ")[1])
      cartContainer.innerHTML += `
                  <div
              class="flex gap-2 h-1/6 w-full py-2 border-b-2 border-gray-200" data-id="${cart.productId}"
            >
              <img src="${info.src}" />
              <div class="flex justify-center flex-col">
                <h3>${info.name}</h3>
                <p> 
                $ ${cart.quantity * parseFloat(price).toFixed(2)}
                </p>
                <p>quantity: <span class="minus cursor-pointer bg-gray-500 rounded-full mx-2 text-white px-1 py-1 text-center">-</span>
                ${cart.quantity}
                <span class="plus cursor-pointer bg-gray-500 rounded-full mx-2 text-white px-1 py-1 text-center"> + </span></p>
              </div>
              <ion-icon
                class="ml-auto text-2xl hover:text-red-500"
                name="close-circle"
              ></ion-icon>
            </div>
      `
    })
  }
  totalProductCount.innerHTML = totalQuantity;
}

function addCartToMemo() {
  localStorage.setItem('cart', JSON.stringify(carts))
}

function changeQuantity(productId, type) {
  let inCart = carts.findIndex((value)=> value.productId == productId);
  if (inCart >= 0) {
    if (type == 'plus') {
      carts[inCart].quantity += 1;
    } else {
      carts[inCart].quantity -= 1;
      if (carts[inCart].quantity <= 0) {
        console.log(productId)
        console.log(carts[inCart])
        carts.splice(inCart, 1)
        console.log(carts)
      }
    }
  }
  addCartToMemo();
  addToCartToHtml();
}

xhr.addEventListener('readystatechange', () => {
    if (xhr.status == 200 && xhr.readyState == 4) {

    //! First : Add Products

    products = JSON.parse(xhr.responseText);
    addAllProducts(products);
    countContainer.innerHTML = `Showing All ${counter} Products`

    //! Second : Add Heart Button Animation

    const heartIcons= document.getElementsByClassName('heart');
    for (const heartIcon of heartIcons) {
        heartIcon.addEventListener('click', () => {
        heartIcon.style.color = heartIcon.style.color === "" ? "red" : "";
            })
        }

     //! Third : Add Select Functionality
    selectList.addEventListener('change', () => {
            if (selectList.value == "all") {
                productContainer.innerHTML = ""
                counter = 0;
                addAllProducts(products);
                catContainer.innerHTML = "All Products"
                countContainer.innerHTML = `Showing All ${counter} Products`
            } else {
                productContainer.innerHTML = ""
                counter = 0;
                addOneProduct(selectList.value, products);
                catContainer.innerHTML = selectList.value
                console.log(cartContainer);
                countContainer.innerHTML = `Showing All ${counter} Products`
            }
        })

    //! Fourth : Handle Cart Add and Remove
    productContainer.addEventListener('click', (e)=> {
      let clickPostion = e.target
      if (clickPostion.classList.contains('add')) {
        let productId = clickPostion.parentElement.parentElement.parentElement.dataset.id;
        addToCart(productId);
      }
    })

    //! Check For Local Storage

    if (localStorage.getItem('cart')) {
      carts = JSON.parse(localStorage.getItem('cart'));
      addToCartToHtml();
    }

    //! 

    cartContainer.addEventListener('click', (e)=> {
      let clickPostion = e.target
      if (clickPostion.classList.contains('minus') || clickPostion.classList.contains('plus')) {
        let productId = clickPostion.parentElement.parentElement.parentElement.dataset.id
        console.log(productId)
        let processType = 'minus'
        if (clickPostion.classList.contains('plus')) {
          processType = 'plus'
        }
        changeQuantity(productId, processType);
      }
    })
    }
});

