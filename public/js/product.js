function changeQuantity(stock, price) {
    $(".quantity .plus").on("click", function() {
        if (parseInt($(".quantity input").val()) < stock) {
            $(".quantity input").val(parseInt($(".quantity input").val())+1);
            changeAmount(price);
        }
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

function getData(category, productName) {
    var data = JSON.parse(sessionStorage.getItem(category));
    if (data !== null) {
        getProduct(category, productName);
    }
    firebase.database().ref("products/" + category).on('value', (snapshot) => {
        if (JSON.stringify(data) !== JSON.stringify(snapshot.val())) {
            sessionStorage.setItem(category, JSON.stringify(snapshot.val()));
            getProduct(category, productName);
        }
    });
}

function getProduct(category, productName) {
    const data = JSON.parse(sessionStorage.getItem(category));
    var product;
    Object.keys(data).forEach((key) => {
        if (data[key].name === productName) {
            product = data[key];
        }
    });
    $(".product-info #product-name").text(product.name);
    $(".price span").text(product.price);
    $(".availability span").text(product.stock);
    changeQuantity(parseInt(product.stock), product.price);
    changeAmount(product.price);
}

function convertFormat(text) {
    var textArray = [];
    text.split("-").forEach((element) => {
        textArray.push(element.charAt(0).toUpperCase() + element.slice(1))
    });
    return textArray.join(" ");
}

function getURL() {
    const category = location.pathname.split("/")[2];
    const product = location.pathname.split("/")[3];
    getData(category, convertFormat(product))
    /*
    $(".taskbar .category").html(`> ${cate.join(" ")}`);
    $(".nav h4").each(function(index) {
        if (index !== 0) {
            if(category === $(this).children().text().toLowerCase().replace(" ", "-")) {
                $(this).addClass("selected_category");
                screenChange();
                return false;
            }
        }
        if (index === $(".nav h4").length-1) {
            notFound(category.charAt(0).toUpperCase() + category.slice(1))
        }
    });*/
}

getURL()