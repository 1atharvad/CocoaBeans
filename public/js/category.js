var category;
var database = firebase.database();

function createProductGrid(columns) {
    database.once('value', (snapshot) =>{
        var i=1;
        $(".product-list").html(`<div class="product-0">${$(".product-list .product-0").html()}</div>`);
        while (true) {
            var productId = "product-" + i;
            var productData = snapshot.val()[productId];

            if (productData === undefined) {
                if ((i-1) % columns == 0) {
                    break;
                }
                $(".product-list").append("<div class='stub' style='visibility: hidden'></div>");
                if (i % columns == 0) {
                    break;
                }
            } else {

                $(".product-list").append(`<div class='${productId}'>${$(".product-list .product-0").html()}</div>`);
                $(`.product-list .${productId} img`).attr("src", `/images/${productData.image}`);
                $(`.product-list .${productId} h3`).text(productData.name);
                $(`.product-list .${productId} h4 span`).text(productData.price);
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