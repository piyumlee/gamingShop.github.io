document.addEventListener("DOMContentLoaded", function () {
    let cartList = document.getElementById("cartList");
    let finalTotal = document.getElementById("Ftotal");

    let savedCart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    let savedTotal = JSON.parse(localStorage.getItem("finalTotal")) || 0;

    if (savedCart.length === 0) {
        cartList.innerHTML = "<p>No items in cart</p>";
        return;
    }

    let tableHTML = "<table><tr><th>Image</th><th>Product</th><th>Price</th><th>Quantity</th></tr>";

    savedCart.forEach(product => {
        tableHTML += `
        <tr>
            <td><img src="${product.image}" style="width:50px;"></td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.quantity}</td>
        </tr>`;
    });

    tableHTML += "</table>";
    cartList.innerHTML = tableHTML;

    finalTotal.innerHTML = `<strong>Total: $${savedTotal.toFixed(2)}</strong>`;
});

document.getElementById("cardNo").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 16); 
});

document.getElementById("cvv").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 3); // Allows only numbers & limits to 3
});


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
    localStorage.removeItem("cartItems");
    localStorage.removeItem("quantities");
    localStorage.removeItem("cartValue");
    localStorage.removeItem("totalPrice"); // 

    
    totalPrice = 0;
    document.getElementById("Ftotal").innerHTML = `<strong>Total: $0.00</strong>`;

    location.href = "shop.html";
    
}

document.querySelector(".submitButton").addEventListener("click", function (event) {
    event.preventDefault(); 

    if (PersonalInfo()) {
        Finalization();
    }
});
