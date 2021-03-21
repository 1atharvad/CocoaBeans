var category;

function getDatabase(columns) {
    console.log(firebase.database())
    var data = JSON.parse(sessionStorage.getItem(category));
    if (data !== null) {
        createProductGrid(columns, data);
    }
    firebase.database().ref("products/" + category).on('value', (snapshot) => {
        if (JSON.stringify(data) !== JSON.stringify(snapshot.val())) {
            sessionStorage.setItem(category, JSON.stringify(snapshot.val()));
            createProductGrid(columns, snapshot.val());
        }
    });
}

function createProductGrid(columns, data) {
    var i=1;
    $(".product-list").html(`<div class="product-0">${$(".product-list .product-0").html()}</div>`);
    while (true) {
        var productId = "product-" + i;
        var productData = data[productId];

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
}

function screenChange() {
    var column;

    if ($(window).width()<700 === true) {
        column = 2;
    } else {
        column = 3;
    }
    getDatabase(column);
    var flag = column;

    $(window).on("resize", function() {
        if ($(window).width() === true) {
            column = 2;
        } else {
            column = 3;
        }
        if (flag !== column) {
            flag = column;
            getDatabase(column);
        }
    })
}

function notFound(category) {
    $(".not-found").show();
    $(".not-found span").text(category);
}

function getURL() {
    category = location.pathname.split("/")[2];
    var cate = []
    category.split("-").forEach((element) => {
        cate.push(element.charAt(0).toUpperCase() + element.slice(1))
    });
    $(".taskbar .category").html(`> ${cate.join(" ")}`);
    $(".nav h4").each(function(index) {
        console.log(index, $(".nav h4").length-1)
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
    });
}

getURL()