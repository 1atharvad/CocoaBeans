var category;
var database = firebase.database();

function createProductGrid(columns) {
    var productContainer = document.querySelector(".product-list");
    var product = document.querySelector(".product-0");

    database.once('value', (snapshot) =>{
        var i=1;
        productContainer.innerHTML = product.outerHTML;
        while (true) {
            var productId = "product-" + i;
            var productData = snapshot.val()[productId];

            if (productData === undefined) {
                if ((i-1) % columns == 0) {
                    break;
                }
                productContainer.innerHTML += "<div class='stub' style='visibility: hidden'></div>";
                if (i % columns == 0) {
                    break;
                }
            } else {
                productContainer.innerHTML += `<div class='${productId}'>${product.innerHTML}</div>`;

                var newProduct = document.querySelector("." + productId);
                newProduct.querySelector("img").src = "/images/" + productData.image;
                newProduct.querySelector("h3").innerHTML = productData.name;
                newProduct.querySelector("h4 span").innerHTML = productData.price;
            }
            i++;
        }
        $(".product-list > div").each(function(index) {
            if (index !== 0) {
                $(this).on("click", () => {
                    productName = $(this).find("h3").text();
                    location.href = `/category/${category}/${productName.toLowerCase().split(" ").join("-")}`;
                });
            }
        });
    });
}

function screenChange() {
    var column;

    if ($(window).width()<700 === true) {
        column = 2;
    } else {
        column = 3;
    }
    createProductGrid(column);
    var flag = column;

    $(window).on("resize", function() {
        if ($(window).width() === true) {
            column = 2;
        } else {
            column = 3;
        }
        if (flag !== column) {
            flag = column;
            createProductGrid(column);
        }
    })
}

function getURL() {
    category = location.pathname.split("/")[2]; 
    $(".taskbar .category").html("> " + category.charAt(0).toUpperCase() + category.slice(1));
    database = database.ref("products/" + category);
    screenChange();
}

getURL()