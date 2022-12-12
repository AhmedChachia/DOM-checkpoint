/*const heart = document.getElementById('heart-icon')
heart.addEventListener("click",togglelike)

function togglelike(){
    if (heart.textContent === "favorite_border"){
        heart.textContent = "favorite"
        heart.style.color = "red"
    } else {
        heart.textContent = "favorite_border"
        heart.style.color = "darkgrey"
    }

}*/
var heart = document.getElementById('heart');
heart.addEventListener('click', () => {
    heart.classList.toggle('heart')
})

/*let addBtn = document.querySelector('#add');
addBtn.addEventListener('click', ()=> {
    qty.value=parseInt(qty.value) +1;
});*/