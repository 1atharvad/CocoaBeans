function changeQuantity(price) {
    $(".quantity .plus").on("click", function() {
        $(".quantity input").val(parseInt($(".quantity input").val())+1);
        changeAmount(price);
    });

    $(".quantity .minus").on("click", function() {
        if ((parseInt($(".quantity input").val())-1 < 1) === false) {
            $(".quantity input").val(parseInt($(".quantity input").val())-1);
            changeAmount(price);
        }
    });
}

function changeAmount(price) {
    $(".subtotal span").text(price*parseInt($(".quantity input").val()));
}

var price = 300;
changeQuantity(price);
changeAmount(price);