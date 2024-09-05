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