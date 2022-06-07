const data = [{
        id: 0,
        img: '/images/redmiK20.jpg',
        name: 'Redmi K20',
        price: 190,
        save: 25,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 1,
        img: '/images/samGalaxynote20.jpg',
        name: 'Samsung Galaxy Note 20',
        price: 300,
        save: 50,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 2,
        img: '/images/oppofindX2.jpg',
        name: 'OPPO Find X2',
        price: 240,
        save: 30,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 3,
        img: '/images/realmeX20pro.jpg',
        name: 'Realme X50 Pro',
        price: 285,
        save: 35,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 4,
        img: '/images/redminote8.jpg',
        name: 'Redmi Note 8',
        price: 200,
        save: 15,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 5,
        img: '/images/redminote9.jpg',
        name: 'Redmi Note 9',
        price: 220,
        save: 25,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 6,
        img: '/images/redmi8.jpg',
        name: 'Redmi 8A Dual',
        price: 160,
        save: 20,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
    {
        id: 7,
        img: '/images/redmi9.jpg',
        name: 'Redmi 9',
        price: 100,
        save: 10,
        delievery: 'In 3 - 4 days',
        itemInCart: false
    },
];

let cartList = []; //array to store cart lists

var i;
var detail = document.getElementsByClassName('card-item');
var detailsImg = document.getElementById('details-img')
var detailTitle = document.getElementById('detail-title')
var detailPrice = document.getElementById('detail-price')
var youSave = document.getElementById('you-save');
var detailsPage = document.getElementById('details-page');
var back = document.getElementById('buy')
back.addEventListener('click', refreshPage)
var addToCarts = document.querySelectorAll('#add-to-cart')
var cart = document.getElementById('cart');

// click event to display cart page
cart.addEventListener('click', displayCart)

var carts = document.getElementById('carts');

//click events to add items to cart from details page
carts.addEventListener('click', () => addToCart(getId))

var home = document.getElementById('logo');

//click event to hide cart page and return to home page
home.addEventListener('click', hideCart);

//events on dynamically created element to remove items from list
document.addEventListener('click', function(e) {
    if (e.target.id == 'remove') {
        var itemId = e.target.parentNode.id
        removeFromCart(itemId)
    }
})


//click event to display details page
for (i = 0; i < data.length; i++) {
    detail[i].addEventListener('click', handleDetail)
}

var getId;

//click events to add items to cart from home page cart icon
addToCarts.forEach(val => val.addEventListener('click', () => addToCart(val.parentNode.id)));

// details function
function handleDetail(e) {
    detailsPage.style.display = 'block'
    getId = this.parentNode.id;
    detailsImg.src = data[getId].img;
    detailTitle.innerHTML = data[getId].name;
    detailPrice.innerHTML = 'Price : $ ' + data[getId].price;
    youSave.innerHTML = 'You save : ($ ' + data[getId].save + ')';
}

// add item to the cart
function addToCart(id) {
    if (!data[id].itemInCart) {
        cartList = [...cartList, data[id]];
        addItem()

        alert('item added to your cart')

    } else {
        alert('your item is already there')
    }
    data[id].itemInCart = true
}

//back to main page
function refreshPage() {
    detailsPage.style.display = 'none'
}

// hide your cart page
function hideCart() {
    document.getElementById('main').style.display = "block";
    document.getElementById('cart-container').style.display = "none";
}

//display your cart page
function displayCart() {
    document.getElementById('main').style.display = "none";
    document.getElementById('details-page').style.display = "none";
    document.getElementById('cart-container').style.display = "block";
    if (cartList.length == 0) {
        document.getElementById('cart-with-items').style.display = "none";
        document.getElementById('empty-cart').style.display = "block";
    } else {
        document.getElementById('empty-cart').style.display = "none";
        document.getElementById('cart-with-items').style.display = "block";

    }
}

var totalAmount;
var totalItems;
var totalSaving;

//add item to the cart
function addItem() {
    totalAmount = 0;
    totalItems = 0;
    totalSaving = 0
    var clrNode = document.getElementById('item-body');
    clrNode.innerHTML = '';
    console.log(clrNode.childNodes)
    cartList.map((cart) => {
        var cartCont = document.getElementById('item-body');
        totalAmount = totalAmount + cart.price;
        totalSaving = totalSaving + cart.save;
        totalItems = totalItems + 1;

        var tempCart = document.createElement('div')
        tempCart.setAttribute('class', 'cart-list');
        tempCart.setAttribute('id', cart.id);

        var listImg = document.createElement('img');
        listImg.setAttribute('id', 'list-img');
        listImg.src = cart.img
        tempCart.appendChild(listImg)

        var listName = document.createElement('h3');
        listName.setAttribute('class', 'list-name');
        listName.innerHTML = cart.name;
        tempCart.appendChild(listName)

        var listPay = document.createElement('h3');
        listPay.setAttribute('class', 'pay');
        listPay.innerHTML = cart.price;
        tempCart.appendChild(listPay);

        var listQuantity = document.createElement('h3');
        listQuantity.setAttribute('class', 'quantity');
        listQuantity.innerHTML = '1';
        tempCart.appendChild(listQuantity);

        var listTrash = document.createElement('i');
        listTrash.setAttribute('class', 'fa fa-trash ');
        listTrash.setAttribute('id', 'remove');
        tempCart.appendChild(listTrash);

        cartCont.appendChild(tempCart)

    })
    document.getElementById('total-amount').innerHTML = 'Total Amount : $ ' + totalAmount;
    document.getElementById('total-items').innerHTML = 'Total Items : ' + totalItems;
    document.getElementById('you-saved').innerHTML = 'You Saved : $ ' + totalSaving;
    document.getElementById('total').style.display = "block";
}

//remove item from the cart
function removeFromCart(itemId) {
    data[itemId].itemInCart = false
    cartList = cartList.filter((list) => list.id != itemId);
    addItem()
    if (cartList.length == 0) {
        document.getElementById('cart-with-items').style.display = "none";
        document.getElementById('empty-cart').style.display = "block";
    }
}







// images sliders




// length of time (in milliseconds) each transition (e.g. fading in) will take

var slideshow_speed = 1000;

// length of time (in milliseconds) each image is shown

var slideshow_delay = 5000;

// global variables

var slideshow_on = true;
var slideshow_timeout;

// slideshow_start
//
// Starts the slideshow up. Call this when the page loads, like
//
//     $(document).ready(function() {
//         slideshow_start();
//     });

function slideshow_start() {
    // jQuery's fadeIn() and fadeOut() seem to work separately from the CSS
    // `opacity` property (although judging from the jQuery source, this should
    // not be the case!). In the page's CSS--which probably loads before
    // slideshow_start() is run--the images other than the first are made
    // invisible so that they are not displayed under the first image. In the
    // next line we restore their CSS opacity to 1, but only after calling
    // jQuery's fadeOut() on them. Fading them out ensures that they are never
    // shown under the first image; setting their opacity back to 1 means they
    // will appear when we get around to calling fadeIn() on them.
    $('ul.slideshow li').not('.show').fadeOut(0).css({ opacity: 1.0 });
    $('ul.slideshow li.show').css({ opacity: 1.0 });

    // Pause the slideshow on mouse over
    $('ul.slideshow').hover(
        function() {
            slideshow_on = false;
            clearTimeout(slideshow_timeout);
        },
        function() {
            slideshow_on = true;
            slideshow_queue_animation();
        }
    );

    slideshow_queue_animation();
}








// slider images 



var slides = document.querySelector('.slider-items').children;
var nextSlide = document.querySelector(".right-slide");
var prevSlide = document.querySelector(".left-slide");
var totalSlides = slides.length;
var index = 0;

nextSlide.onclick = function() {
    next("next");
}
prevSlide.onclick = function() {
    next("prev");
}

function next(direction) {

    if (direction == "next") {
        index++;
        if (index == totalSlides) {
            index = 0;
        }
    } else {
        if (index == 0) {
            index = totalSlides - 1;
        } else {
            index--;
        }
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[index].classList.add("active");

}



















// imagejquery cursole 




$(document).ready(function() {
    function Bounce() {
        $("#myimg").animate({
            top: "100px",
            width: "1000px"
        }, 1000, function() {
            $("#myimg").animate({
                top: "300px",
                width: "250px"
            }, 7000, Bounce)
        });
    }
    Bounce();
})