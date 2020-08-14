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
    const cartContent = builder.create('div')
      .className('cart-content')

    const cartItem = builder.create('div')
      .className('cart-item')
      .appendTo(cartContent);

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
      .text('::before')
      .appendTo(amountDiv);

    builder.create('p')
      .className('item-amount')
      .text('1')
      .appendTo(chevronup);

    const chevrondown = builder.create('i')
      .className('fas fa-chevron-down')
      .text('::before')
      .appendTo(amountDiv);

    return cartContent;
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
    //TODO
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
