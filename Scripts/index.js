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