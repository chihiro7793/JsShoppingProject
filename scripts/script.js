const RAW_DATA = `
{
  "items": [
    {
      "sys": { "id": "1" },
      "fields": {
        "title": "queen panel bed",
        "price": 10.99,
        "image": { "fields": { "file": { "url": "./images/product-1.jpeg" } } }
      }
    },
    {
      "sys": { "id": "2" },
      "fields": {
        "title": "king panel bed",
        "price": 12.99,
        "image": { "fields": { "file": { "url": "./images/product-2.jpeg" } } }
      }
    },
    {
      "sys": { "id": "3" },
      "fields": {
        "title": "single panel bed",
        "price": 12.99,
        "image": { "fields": { "file": { "url": "./images/product-3.jpeg" } } }
      }
    },
    {
      "sys": { "id": "4" },
      "fields": {
        "title": "twin panel bed",
        "price": 22.99,
        "image": { "fields": { "file": { "url": "./images/product-4.jpeg" } } }
      }
    },
    {
      "sys": { "id": "5" },
      "fields": {
        "title": "fridge",
        "price": 88.99,
        "image": { "fields": { "file": { "url": "./images/product-5.jpeg" } } }
      }
    },
    {
      "sys": { "id": "6" },
      "fields": {
        "title": "dresser",
        "price": 32.99,
        "image": { "fields": { "file": { "url": "./images/product-6.jpeg" } } }
      }
    },
    {
      "sys": { "id": "7" },
      "fields": {
        "title": "couch",
        "price": 45.99,
        "image": { "fields": { "file": { "url": "./images/product-7.jpeg" } } }
      }
    },
    {
      "sys": { "id": "8" },
      "fields": {
        "title": "table",
        "price": 33.99,
        "image": { "fields": { "file": { "url": "./images/product-8.jpeg" } } }
      }
    }
  ]
}
`
//Make a builder 
ElementBuilder.getInstance = function () {
  return {
    create: function (name) {
      return new ElementBuilder(name);
    }
  }
}
const builder = ElementBuilder.getInstance();

//Get doc elements
const cartBtn = document.getElementById('cartBtn');
const cartDiv = document.getElementById('cartDiv');
const totalNumber = document.getElementById('totalNumber');
let total = 0;
totalNumber.innerHTML = total;





//Product
class Product {
  constructor(name, id, price, image) {
    this.name = name;
    this.id = id;
    this.price = price;
    this.image = image;
  }

  render() {
    const container = builder.create('article')
      .className('product')
    const imageContainer = builder.create('div')
      .className('img-container')
      .appendTo(container)

    builder.create('img')
      .className('product-img')
      .src(this.image)
      .appendTo(imageContainer)

    builder.create('button')
      .className('bag-btn')
      .html(`<i class="fas fa-shopping-cart"></i>Add to cart<i class="fas fa-shopping-cart"></i>`)
      .onclick(() => {
        //Make a new object of CartItem class when clicking on each product
        const tobuyItem = new CartItem(this.name, this.id, this.price, this.image, 0);
        //If cart is not empty check for duplication else add new item to it.
        if (cart.items.length) {
          if (cart.checkduplicate(tobuyItem)) {
            cart.updatecart();
          } else {
            cart.add(tobuyItem);
          }
        } else {
          cart.add(tobuyItem);
        }
      })
      .appendTo(imageContainer);

    builder.create('h3')
      .text(this.name)
      .appendTo(container);

    return container;
  }
}

//Convert raw data to comprehensible products
const parsedData = JSON.parse(RAW_DATA)
const PRODUCTS = parsedData.items.map(item => {
  return new Product(
    item.fields.title,
    item.sys.id,
    item.fields.price,
    item.fields.image.fields.file.url
  );
})
const productSection = document.getElementById("product-section");
PRODUCTS.forEach(item => item.render().appendTo(productSection));


class CartItem {
  constructor(name, id, price, image, number) {
    this.name = name;
    this.id = id;
    this.image = image;
    this.price = price;
    this.number = number;
    this.increment();

  }

  increment() {
    return this.number++;
  }
  decrement() {
    return this.number--;
  }

  render() {
    const cartItem = builder.create('div')
      .className('cart-item');


    builder.create('img')
      .src(this.image)
      .appendTo(cartItem);

    const explanationDiv = builder.create('div')
      .appendTo(cartItem);

    builder.create('h4')
      .text(this.name)
      .appendTo(explanationDiv);
    builder.create('h5')
      .text(this.price)
      .appendTo(explanationDiv);

    builder.create('span')
      .className('remove-item')
      .text('remove')
      .appendTo(explanationDiv)
      .onclick(() => {
        cart.remove(this.id);
      });

    const amountDiv = builder.create('div')
      .appendTo(cartItem);

    builder.create('i')
      .className('fas fa-chevron-up')
      .onclick(() => {
        total++;
        totalNumber.innerHTML = total;
        this.increment();
        cart.updatecart();
      })
      .appendTo(amountDiv);

    builder.create('p')
      .className('item-amount')
      .text(this.number)
      .appendTo(amountDiv);
    builder.create('i')
      .className('fas fa-chevron-down')
      .onclick(() => {
        total--;
        totalNumber.innerHTML = total;
        this.decrement();

        if (this.number === 0)
          cart.remove(this.id);
        else
          cart.updatecart();
      })
      .appendTo(amountDiv);

    return cartItem;
  }
}
class CartHandler {
  constructor() {
    this.items = [];
    this.cartContainer = builder.create('div')
      .className('cart');
    this.cartContent = builder.create('div')
      .className('cart-content');
  }

  checkduplicate(item) {
    let flag = false;

    for (let index = 0; index < this.items.length; index++) {
      if (this.items[index].id === item.id) {
        flag = true;
        this.items[index].increment();
        total++;
        totalNumber.innerHTML = total;
        break;
      } else {
        flag = false;
      }

    }
    return flag;
  }

  //Adds new item to cart
  add(cartItem) {
    total++;
    totalNumber.innerHTML = total;
    this.items.push(cartItem);
    //Rendered Item appends to cart
    cartItem.render().appendTo(this.cartContent);
    //Empty cartcontainer
    this.cartContainer.html("");
    this.render();
  }

  //Renders cart by each change
  updatecart() {
    this.cartContent.html("");
    this.cartContainer.html("");
    this.items.forEach((i) => {
      i.render().appendTo(this.cartContent);

    })
    this.render();
  }

  remove(id) {
    let index = 0;
    this.items.forEach(it => {
      if (it.id === id) {
        index = this.items.indexOf(it);
      }
      return index;
    });
    console.log(this.items[index]);
    total -= this.items[index].number;
    totalNumber.innerHTML = total;
    this.items.splice(index, 1);

    this.updatecart();
  }

  //calculate totalPrice
  totalPrice() {
    let totalprice = 0;
    this.items.forEach(item => {
      totalprice = parseFloat((item.price * item.number + totalprice).toFixed(10));
    });
    return totalprice;
  }

  render() {

    const closeCartSpan = builder.create('span')
      .className('close-cart').appendTo(this.cartContainer);
    builder.create('i')
      .className('fas fa-window-close')
      .appendTo(closeCartSpan)
      .onclick(
        () => {
          this.cartContainer.className('cart');
          cartDiv.className = 'cart-overlay';
        });

    builder.create('h2')
      .text('your cart')
      .appendTo(this.cartContainer);

    this.cartContent.appendTo(this.cartContainer);

    const cartFooter = builder.create('div')
      .className('cart-footer')
      .appendTo(this.cartContainer);
    const totalPricetag = builder.create('h3')
      .text('Your total is : $')
      .appendTo(cartFooter);
    builder.create('span')
      .className('cart-total')
      .text(this.totalPrice())
      .appendTo(totalPricetag);
    builder.create('button')
      .className('clear-cart banner-btn')
      .text('CLEAR CART')
      .onclick(() => {
        if (this.items.length) {
          this.items = [];
          total = 0;
          totalNumber.innerHTML = total;
          this.cartContent.html("");
          this.cartContainer.html("");
          this.render();
        } else {
          this.cartContainer.className('cart');
          cartDiv.className = 'cart-overlay';
        }
      })
      .appendTo(cartFooter);
    return this.cartContainer;

  }
}


//Make a cartHandler
const cart = new CartHandler();
cart.render();
cartBtn.addEventListener('click', () => {
  cart.cartContainer.build().className = 'cart showCart';
  cartDiv.className = 'cart-overlay transparentBcg';
  cartDiv.append(cart.cartContainer.build());
});
