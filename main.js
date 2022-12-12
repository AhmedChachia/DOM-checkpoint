
let carts = document.querySelectorAll('.add-cart');


let products = [
    {
        name: 'vape1',
        tag: 'vape1',
        price: 45,
        incart: 0
    },
    {
        name: 'vape2',
        tag: 'vape2',
        price: 38,
        incart: 0
    },
    {
        name: 'vape3',
        tag: 'vape3',
        price: 40,
        incart: 0
    },
    {
        name: 'vape4',
        tag: 'vape4',
        price: 50,
        incart: 0
    },
    {
        name: 'vape4',
        tag: 'vape4',
        price: 55,
        incart: 0
    },
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}


function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');



    productNumbers = parseInt(productNumbers);
    if (productNumbers) {

        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);

}
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');

    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }


    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {

    let cartCost = localStorage.getItem('totalCost');


    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost +
            product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product-item">
            <div class="product">
                <ion-icon class="delete" name="trash-outline"></ion-icon>
                <img src="${item.tag}.jpg" class="imgvape"></img>
                <span>${item.name}</span>
            </div>
            <div class="price">
                $${item.price},00
            </div>
            <div class="quantity">
                <ion-icon class="minusButton" name="remove-outline"></ion-icon>
                <span class="qty">${item.inCart}</span>
                <ion-icon class="plusButton" name="add-circle-outline"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div>
        </div>
               `;

        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">Basket Total</h4>
            <h4 class="basketTotal">
                $${cartCost},00
            </h4>
        </div>
       `;
    }
    let plusBtn = document.getElementsByClassName("plusButton");

    for (let i = 0; i < plusBtn.length; i++) {
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        plusBtn[i].addEventListener('click', () => {
            Object.values(cartItems)[i].inCart += 1;
            localStorage.setItem("productsInCart", JSON.stringify(cartItems));
            cartCost = parseInt(cartCost);
            localStorage.setItem("totalCost", cartCost + Object.values(cartItems)[i].price);
            displayCart();
        })
    }

    let minusBtn = document.getElementsByClassName("minusButton");

    for (let i = 0; i < minusBtn.length; i++) {
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        minusBtn[i].addEventListener('click', () => {
            if (Object.values(cartItems)[i].inCart > 1) {
                Object.values(cartItems)[i].inCart -= 1;
                localStorage.setItem("productsInCart", JSON.stringify(cartItems));
                cartCost = parseInt(cartCost);
                localStorage.setItem("totalCost", cartCost - Object.values(cartItems)[i].price);
                displayCart();
            }
        })
    }

    // function ready(){
    var removeBtn = document.getElementsByClassName('delete');
    for (i = 0; i < removeBtn.length; i++) {
        var button = removeBtn[i]
        // console.log(removeBtn)
        button.addEventListener('click', function removeFromCart(e) {
            e.target.parentElement.parentElement.remove();
            
        });
        
    }
    // }
    // function removeFromCart(event){
    //     event.target.parentElement.remove();
    // }

}



onLoadCartNumbers();
displayCart();
/*let plus=document.querySelector(".plus")
minus = document.querySelector(".minus")
num = document.querySelector(".qty")

let a = 1;
 plus.addEventListener("click", ()=> {
    a++;
    
 });*/