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

function addOneProduct(products) {
    for (const paint of products) {
      if (ids.includes(paint.id)) {
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
      }
    }
}



let ids = [1, 6, 10, 15, 19, 25];
let productContainer = document.getElementById('Products-container');
let products;

let xhr = new XMLHttpRequest();
xhr.open('GET', './products.json');
xhr.send();

xhr.addEventListener('readystatechange', () => {
    if (xhr.status == 200 && xhr.readyState == 4) {

    //! First : Add Products

    products = JSON.parse(xhr.responseText);
    addOneProduct(products)

    //! Second : Add Heart Button Animation

    const heartIcons= document.getElementsByClassName('heart');
    for (const heartIcon of heartIcons) {
        heartIcon.addEventListener('click', () => {
        heartIcon.style.color = heartIcon.style.color === "" ? "red" : "";
            })
        }

    }
});