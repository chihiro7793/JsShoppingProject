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
class Product {
  constructor(name, id, price, image) {
    this.name = name;
    this.id = id;
    this.price = price;
    this.image = image;
    this.counter = 0;
    this.cartItemTag = null
      ;
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
        // TODO: Add to cart
        const tobuyItem = new cartItem(this.name, this.id, this.price, this.image, this.counter++);
        this.cartItemTag = tobuyItem.render();

      })
      .appendTo(imageContainer);

    builder.create('h3')
      .text(this.name)
      .appendTo(container);

    return container;
  }
}

class CartItem {
  constructor(name, id, price, image, number) {
    this.name = name;
    this.id = id;
    this.image = image;
    this.price = price;
    this.number = number;
  }

  increment() {
    this.number++;
  }
  decrement() {
    this.number--;
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
        /*TODO*/
      });

    const amountDiv = builder.create('div')
      .appendTo(cartItem);
    const chevronup = builder.create('i')
      .className('fas fa-chevron-up')
      .appendTo(amountDiv);

    builder.create('p')
      .className('item-amount')
      .text('1')
      .appendTo(chevronup);

    const chevrondown = builder.create('i')
      .className('fas fa-chevron-down')
      .appendTo(amountDiv);

    return cartItem;
  }
}
class CartHandler {
  constructor() {
    this.items = [];

  }

  add(name, id, price, image, number) {
    const item = new CartItem(name, id, price, image, number);
    item.push(items);
  }

  remove(id) {
    //TODO
  }

  totalPrice() {
    let totalprice = 0;
    this.items.forEach(item => totalprice = item.price * item.number + totalprice
    );
    return totalprice;
  }

  render() {
    const cartContainer = builder.create('div')
      .className('cart showCart');

    const closeCartSpan = builder.create('span')
      .className('close-cart').appendTo(cartContainer);
    builder.create('i')
      .className('fas fa-window-close')
      .appendTo(closeCartSpan)
      .onclick(() => cartContainer.className('cart'));

    builder.create('h2')
      .text('your cart')
      .appendTo(cartContainer);

    const cartContent = builder.create('div')
      .className('cart-content')
      .appendTo(cartContainer);


    const cartFooter = builder.create('div')
      .className('cart-footer')
      .appendTo(cartContainer);
    const totalPricetag = builder.create('h3')
      .text('Your total is : $')
      .appendTo(cartFooter);
    builder.create('span')
      .className('cart-total')
      .text(this.totalPrice())
      .appendTo(totalPricetag);

    this.items.forEach(item => {
      item.render().appendTo(cartContent);
    });
    return cartContainer;

  }


}

ElementBuilder.getInstance = function () {
  return {
    create: function (name) {
      return new ElementBuilder(name);
    }
  }
}

const builder = ElementBuilder.getInstance();
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
PRODUCTS.forEach(item => item.render().appendTo(productSection))

const cartBtn = document.getElementById('cartBtn');
const cartDiv = document.getElementById('cartDiv')
cartBtn.addEventListener('click', () => {
  console.log('you clicked');
  const cart = new CartHandler();
  cartDiv.className = 'cart-overlay transparentBcg';
  console.log(cart.render().build());
  cartDiv.append(cart.render().build());

});