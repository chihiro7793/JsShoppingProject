ElementBuilder.getInstance = function () {
  return {
    create: function (name) {
      return new ElementBuilder(name);
    }
  }
}

const builder = ElementBuilder.getInstance();