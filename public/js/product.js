function changeQuantity() {
    var plusBtn = document.querySelector(".quantity .plus");
    var minusBtn = document.querySelector(".quantity .minus");
    var quantity = document.querySelector(".quantity input");

    plusBtn.addEventListener("click", function() {
        quantity.value = parseInt(quantity.value)+1;
        changeAmount(300);
    });

    minusBtn.addEventListener("click", function() {
        if ((parseInt(quantity.value)-1 < 1) === false) {
            quantity.value = parseInt(quantity.value)-1;
            changeAmount(300);
        }
    });
}

function changeAmount(amount) {
    var quantity = document.querySelector(".quantity input");
    var subtotal = document.querySelector(".subtotal span");
    
    subtotal.innerHTML = amount*parseInt(quantity.value);
}

changeQuantity();
changeAmount(300);