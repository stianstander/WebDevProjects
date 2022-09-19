let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = ()=>{
    if(basket.length !== 0){
        /* the 'x' is used to parse the data but any word or letter can be used */
        return (shoppingCart.innerHTML = basket.map((x)=>{
            let {id, item} = x;
            let search = shopItemsData.find((y)=>y.id === id) || [];
            let {img, name, price} = search;
            return `
            <div class="cart-item">
            
                <img src=${img}>
                <div class="details">
                <div class="title-price-x">
                    <h4 class="title-price"><p>${name}</p>
                    <p   class="cart-item-price" >$ ${price}</p></h4>
                    <i onclick="removeItem(${id})" class="fa-solid fa-x"></i>
                </div>
                
                <div class="buttons">
                            <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                </div>
                <h3>$ ${item * search.price}</h3>
                </div>
            </div>`
        }).join(""));
    }
    else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html" >
            <button class="HomeBtn">Back to home</button>
        </a>`;
    }
}

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        })
    } else {
        search.item += 1;
    }
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    update(selectedItem.id);
};
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    update(selectedItem.id);
};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

let removeItem = (id)=> {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
    update(selectedItem.id);
};

let totalAmount = ()=>{
    if (basket.length !== 0) {
        let amount = basket.map((x)=>{
            let {item, id} = x;
            let search = shopItemsData.find((y)=>y.id === id) || [];
            return item * search.price;
        }).reduce((x,y)=> x + y, 0);
        label.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button onclick="checkout()" class="checkout">Checkout</button>
        <button onclick="clearCart()" class="remove-all">Remove All</button>
        `
    } else return;
}
totalAmount();

let clearCart = ()=> {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}