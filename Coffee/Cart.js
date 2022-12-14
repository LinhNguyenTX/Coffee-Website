
let carts = document.querySelectorAll('.add-cart');

let items = [  /*array of items*/
    {
        name: 'Irish Coffee',
        tag: 'irish',
        price: 5.50,
        inCart: 0
    },
    {
        name: 'Caramel Macchiato',
        tag: 'machiato',
        price: 5.50,
        inCart: 0
    },
    {
        name: 'Americano Coffee',
        tag: 'americano',
        price: 5.50,
        inCart: 0
    },
    {
        name: 'Ice Latte',
        tag: 'ice_latte',
        price: 5.50,
        inCart: 0
    },
    {
        name: 'Egg Coffee',
        tag: 'egg',
        price: 5.00,
        inCart: 0
    },
    {
        name: 'White Chocolate Mocha',
        tag: 'iwhite',
        price: 5.75,
        inCart: 0
    }
];

for(let i=0; i<carts.length; i++)
{
    carts[i].addEventListener('click', () =>{
        console.log("added to cart");
        cartNumbers(items[i]); //pass added item
        total(items[i]);
    })
}

function onLoadCartNumber() //to keep the number of item in cart even refreshing the page
{
    let itemNumbers = localStorage.getItem('cartNumbers'); //check if there is any item in cart

    if (itemNumbers){
        document.querySelector('.cart-icon span').textContent = itemNumbers;
    }
}

function cartNumbers(item){ /*to save the cart number even refesh the page*/

    let itemNumbers = localStorage.getItem('cartNumbers');

    itemNumbers = parseInt(itemNumbers);

    if (itemNumbers){ /*if number of item exists*/ 
        localStorage.setItem('cartNumbers', itemNumbers + 1);
        document.querySelector('.cart-icon span').textContent = itemNumbers + 1; //update cart number next to cart icon
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-icon span').textContent = 1;
    } 

    setItems(item);
}

function setItems(item){ //to add item name, price... to storage
    let cartItems= localStorage.getItem('itemInCart');
    cartItems = JSON.parse(cartItems);
 
    if(cartItems!= null){
        if(cartItems[item.tag] == undefined)
        {
            cartItems= {
                ...cartItems,
                [item.tag]: item
            }
        }
        cartItems[item.tag].inCart +=1;
    }
    else{
        item.inCart = 1;
        cartItems = {
            [item.tag]: item
        }
    }

    localStorage.setItem("itemInCart", JSON.stringify(cartItems));
}

function total(item){
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartCost!=null)
    {
        cartCost = parseFloat(cartCost);
        cartCost = localStorage.setItem("totalCost", cartCost + item.price);
    }
    else{
        localStorage.setItem("totalCost", item.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("itemInCart");
    let cartCost = localStorage.getItem('totalCost');
    cartItems = JSON.parse(cartItems);
    
    let productContainer = document.querySelector(".items-display")
    console.log(cartItems);

    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML +=`
            <div class ="product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src = "${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class = "price">${item.price}</div>
            <div class = "quantity">
                <ion-icon class = "down" name="chevron-back-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class = "up" name="chevron-forward-outline"></ion-icon>
            </div>
            <div class = "total">
                ${item.inCart * item.price}
            </div>
            `
        });

        productContainer.innerHTML+= `
        <div class = "basketTotalContainer">
            <h4 class "basketTotalTitle"> Cart Total </h4>
            <h4 class ="basketTotal">$${cartCost}</h4>
        </div>
        `
    }
}
onLoadCartNumber();
displayCart();