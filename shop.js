//Declarations
let cartI = document.getElementById("cartIcon");
let cartT = document.getElementById("Wcart");
let processors = document.querySelector(".processors");
let gpus = document.querySelector(".gpu");
let motherboards = document.querySelector(".motherboard");
let rams = document.querySelector(".ram");
let storaged = document.querySelector(".storage");
let closeT = document.querySelector(".close");
let cartItems = document.querySelector(".listCart");
let checkout = document.getElementById("checkout");
let favButton = document.querySelector(".favorites");
let cartVal =document.querySelector(".cartValue");

let cartOpen = false;

function openCart()//function to open the cart
{
    if (cartOpen == false)
    {
        cartT.style.visibility="visible";
        cartOpen = true;
    }
    

}

function closeCart()//function to close the cart
{
    if (cartOpen == true)
        {
            cartT.style.visibility="hidden";
            cartOpen = false;
        }
}


//fetching data from the json file and displaying them on the webpage

async function getWebData()
{
    try
    {
        const resp = await fetch("shop.json");
        data = await resp.json();
        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
        } 
        return data;
    }
    catch (error) 
    {
        console.error("Error loading directory:", error);
    }
    


}

async function loadData()
{
    pageData = await getWebData();
    
    
    for (const processor of pageData.processors)
    {
        processors.innerHTML +=
        `
            <div class="j">
                <div class="cont1">
                    <img src=${processor.image} class="productImg">
            
                </div>
                    <div class="info1">
                        <div>
                            <a>${processor.name}</a>
                        </div>
                        <a id="price">$${processor.price}</a>
                        
                    </div>
                    <div class="buttonC">
                        <button class="button"  key="${processor.id}" >Add to Cart</button>
                    </div>
            </div>
        `;

    }

    for (const gpu of pageData.GPU)
        {
            gpus.innerHTML += 
            `
                <div class="j">
                    <div class="cont1">
                        <img src=${gpu.image} class="productImg">
                
                    </div>
                        <div class="info1">
                            <div >
                                <a>${gpu.name}</a>
                            </div>
                            <a id="price">$${gpu.price}</a>
                            
                        </div>
                        <div class="buttonC">
                            <button class="button" key="${ gpu.id}" >Add to Cart</button>
                        </div>
                </div>
            `;
    
        }

        
    for (const motherboard of pageData.motherboards)
        {
            motherboards.innerHTML += 
             `
               <div class="j">
                    <div class="cont1">
                        <img src=${motherboard.image} class="productImg">
                    
                    </div>
                        <div class="info1">
                            <div >
                                <a>${motherboard.name}</a>
                            </div>
                            <a id="price">$${motherboard.price}</a>
                                
                        </div>
                        <div class="buttonC">
                            <button class="button" key="${motherboard.id}">Add to Cart</button>
                        </div>
                </div>
                `;
    
        }

    for (const ram of pageData.RAM)
        {
            rams.innerHTML += 
                `
                <div class="j">
                    <div class="cont2">
                        <img src=${ram.image} class="productImg">
                    
                    </div>
                        <div class="info">
                            <div >
                                <a>${ram.name}</a>
                            </div>
                            <a id="price">$${ram.price}</a>
                                
                        </div>
                        <div class="buttonC">
                            <button class="button" key="${ram.id}">Add to Cart</button>
                        </div>
                </div>
                `;
    
        }

        for (const storage of pageData.storage)
            {
                storaged.innerHTML += 
                    `
                    <div class="j">
                        <div class="cont1">
                            <img src=${storage.image} class="productImg">
                        
                        </div>
                            <div class="info1">
                                <div >
                                    <a>${storage.name}</a>
                                </div>
                                <a id="price">$${storage.price}</a>
                                    
                            </div>
                            <div class="buttonC">
                                <button class="button" key="${storage.id}">Add to Cart</button>
                            </div>
                    </div>
                    `;

        
            }

            let Cbutton = document.querySelectorAll(".button");

            Cbutton.forEach(function (button) {
                button.addEventListener("click", AddToCart);
            });

            




}

loadData();


quantNum = {};
let totalPrice=0;

let cartArray = [];

function AddToCart() //fucntion to add items to the cart
{
    let key = parseInt(this.getAttribute('key'));
    

    if (cartArray.includes(key)) //checking if item is already in cart,if item in cart then increase quntity
    {
        console.log("item already in cart");

        let arrayName = getArrayName(key, pageData);
        const product = pageData[arrayName].find(item => item.id === key);

        quantNum[key]+=1;
        cartVal.innerText = parseInt(cartVal.innerText)+1;

        totalPrice += product.price
        disTotal.innerHTML = "Total: $" + totalPrice.toFixed(2);
        console.log(totalPrice);

        document.querySelector(`.quantNum[data-key="${key}"]`).innerText = quantNum[key];
        
    }
    else//if item not in cart add item to cart
    {
        cartArray.push(key);
        quantNum[key] = 1
        let arrayName = getArrayName(key, pageData);

        const product = pageData[arrayName].find(item => item.id === key);


        //adding items to cart using innerhtml
        cartItems.innerHTML += 
        `
        <div class="item">
                    <div>
                        <img src="${product.image}" id="cartImg">
                    </div>
                    
                    <div>
                        <p id="prodName" >${product.name}</p>
                    </div>
                    <div>
                        <p id="cPrice">$${product.price}</p>
                    </div>
                    <div class="quantity">
                        <div>
                            <p class="dec" data-key="${key}"> - </p>
                        </div>
                        <div>
                            <p class="quantNum" data-key="${key}"> ${quantNum[key]} </p>
                        </div>
                        <div>
                            <p class="inc" data-key="${key}"> + </p>
                        </div>
                    </div>

                </div>
        `;
        cartVal.innerText = parseInt(cartVal.innerText)+1;

        totalPrice += product.price
        disTotal.innerHTML = "Total: $" + totalPrice.toFixed(2);
        console.log(totalPrice);
        console.log(cartArray);

        
        
        
    }
    
    reloadPage()
}



cartItems.addEventListener("click", (event) => {
    const key = event.target.dataset.key;

    if (event.target.classList.contains("inc")) {
        Increase(parseInt(key));
    } else if (event.target.classList.contains("dec")) {
        Decrease(parseInt(key));
    }
});

function reloadPage() {
    let cartData = cartArray.map(key => {
        let arrayName = getArrayName(key, pageData);
        let product = pageData[arrayName].find(item => item.id === key);

        return {
            id: key,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantNum[key]
        };
    });

    localStorage.setItem("cartItems", JSON.stringify(cartData));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    localStorage.setItem("cartValue", JSON.stringify(cartVal.innerText));
}





function getArrayName(key, pageData) 
{
    for (const arrName in pageData) 
    {
        const array = pageData[arrName];
        if (array.some(item => item.id === key)) 
        {
            return arrName;
        }
    }
}

cartArray2 = [];

function CheckOut(){
    if(cartArray.length == 0)
    {
        alert("Cart Empty!");
    }
    else{
        let cartSummary = cartArray.map(key => {
            let arrayName = getArrayName(key, pageData);
            let product = pageData[arrayName].find(item => item.id === key);
    
            return {
                id: key,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantNum[key] 
            };
        });
    
        localStorage.setItem("checkoutCart", JSON.stringify(cartSummary));
        localStorage.setItem("finalTotal", JSON.stringify(totalPrice));
        location.href = "checkOut.html";
    }
    
}




function Increase(key) {
    quantNum[key] += 1;

    const increase = document.querySelector(`.quantNum[data-key="${key}"]`);
    if (increase) {
        increase.innerText = quantNum[key];
    }

    const arrayName = getArrayName(key, pageData);
    const product = pageData[arrayName].find(item => item.id === key);

    cartVal.innerText = parseInt(cartVal.innerText) + 1;

    totalPrice += product.price;
    disTotal.innerHTML = "Total: $" + totalPrice.toFixed(2);

    console.log(totalPrice);
    reloadPage()
}



function Decrease(key) {
    if (quantNum[key] > 1) {
        quantNum[key] -= 1;

        let reduce = document.querySelector(`.quantNum[data-key="${key}"]`);
        if (reduce) {
            reduce.innerText = quantNum[key];
        }

        let arrayName = getArrayName(key, pageData);
        const product = pageData[arrayName].find(item => item.id === key);

        cartVal.innerText = parseInt(cartVal.innerText) - 1;

        
        totalPrice -= product.price;
        disTotal.innerHTML = "Total: $" + totalPrice.toFixed(2);

        console.log(`Decreased price: -$${product.price}, New total: $${totalPrice}`);
    } else {
        let Index = cartArray.indexOf(key);
        if (Index > -1) {
            cartArray.splice(Index, 1);
        }

        delete quantNum[key];

        let cartItem = document.querySelector(`.item .quantNum[data-key="${key}"]`)?.closest(".item");
        if (cartItem) {
            cartItem.remove();
        }

        cartVal.innerText = parseInt(cartVal.innerText) - 1;

        if (cartArray.length === 0) {
            totalPrice = 0;
        }

        disTotal.innerHTML = "Total: $" + totalPrice.toFixed(2);
        console.log("Cart updated, New total:", totalPrice);
    }

    reloadPage(); 
}



let disTotal = document.getElementById("displayTotal");

function reloadCart() {
    let savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    let savedTotal = JSON.parse(localStorage.getItem("totalPrice")) || 0;
    let savedCartValue = JSON.parse(localStorage.getItem("cartValue")) || 0;

    cartArray = savedCart.map(item => item.id);
    quantNum = {};
    savedCart.forEach(item => quantNum[item.id] = item.quantity);

    totalPrice = savedTotal;
    cartVal.innerText = savedCartValue;
    disTotal.innerHTML = "Total: $" + totalPrice.toFixed(2);

    savedCart.forEach(product => {
        cartItems.innerHTML += `
        <div class="item">
            <div><img src="${product.image}" id="cartImg"></div>
            <div><p id="prodName">${product.name}</p></div>
            <div><p id="cPrice">$${product.price}</p></div>
            <div class="quantity">
                <p class="dec" data-key="${product.id}"> - </p>
                <p class="quantNum" data-key="${product.id}">${product.quantity}</p>
                <p class="inc" data-key="${product.id}"> + </p>
            </div>
        </div>`;
    });
}




window.addEventListener("load", reloadCart);
checkout.addEventListener("click",CheckOut);
cartI.addEventListener("click",openCart);
closeT.addEventListener("click",closeCart);

//checkout page js

function PersonalInfo() {
    let inputs = document.querySelectorAll("input");
    
    for (let input of inputs) {
        if (input.value.trim() === "") {
            alert("Fill all the fields out!!!");
            return false;
        }
    }
    return true;
}

function Finalization()
{
    let savedTotal = JSON.parse(localStorage.getItem("finalTotal")) || 0;


    alert(`Order placed successfully!\nTotal: $${savedTotal}`);

    localStorage.removeItem("checkoutCart"); 
    localStorage.removeItem("finalTotal");

    location.href = "shop.html";
}

document.querySelector(".submitButton").addEventListener("click", function (event) {
    event.preventDefault(); 

    if (PersonalInfo()) {
        Finalization();
    }
});

