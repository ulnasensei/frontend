const cart = document.getElementById("cart-summary");
const cartTotal = document.getElementById("cart-total");
const subtotal = document.getElementById("subtotal");
const vat = document.getElementById("vat");
const shipping = document.getElementById("shipping");
const total = document.getElementById("total");
const itemCount = document.getElementById("item-count");
window.addEventListener("load", () => {
    calcPrices();
});

cart.addEventListener("click", (event) => {
    const item = getParentByClass(event.target, "item");
    const itemPrice = parseFloat(item.querySelector("span.price").innerText);
    let amountChange = false;
    if (event.target && event.target.classList.contains("btn-decrease")) {
        let itemCount = Number(item.querySelector(".btn-item-count").innerText);
        if (itemCount > 1) {
            item.querySelector(".btn-item-count").innerText = --itemCount;
            item.querySelector("span.item-total").innerText = (itemPrice * itemCount).toFixed(2);
            amountChange = true;
        }
    } else if (event.target && event.target.classList.contains("btn-increase")) {
        let itemCount = Number(item.querySelector(".btn-item-count").innerText);
        item.querySelector(".btn-item-count").innerText = ++itemCount;
        item.querySelector("span.item-total").innerText = (itemPrice * itemCount).toFixed(2);
        amountChange = true;
    } else if (event.target && event.target.classList.contains("remove")) {
        item.parentNode.removeChild(item);
        if (cart.querySelector(".item") == null) {
            const noItems = document.createElement("h4");
            noItems.innerText = "Your cart is empty.";
            cart.querySelector(".card-body").insertAdjacentElement("afterbegin", noItems);
        }
        amountChange = true;
    }
    if (amountChange) {
        calcPrices();
    }
});

function calcPrices() {
    const [subtotalFee, itemCountInCart] = (function () {
        let subtotal = 0,
            count = 0;
        cart.querySelectorAll(".item").forEach((item) => {
            subtotal += parseFloat(item.querySelector("span.item-total").innerText);
            count += Number(item.querySelector(".btn-item-count").innerText);
        });
        return [subtotal.toFixed(2), count];
    })();
    const vatFee = (subtotalFee * 0.08).toFixed(2);
    const shippingFee = subtotalFee != 0 ? 8.99 : 0;
    const totalFee = Number(subtotalFee) + Number(vatFee) + shippingFee;
    subtotal.innerText = subtotalFee;
    vat.innerText = vatFee;
    shipping.innerText = shippingFee;
    total.innerText = totalFee.toFixed(2);
    cartTotal.innerText = totalFee.toFixed(2);
    itemCount.innerHTML = itemCountInCart;
}

function getParentByClass(el, className) {
    do {
        if (el.classList.contains(className)) {
            return el;
        } else {
            el = el.parentNode;
        }
    } while (el && el.parentNode);
}
