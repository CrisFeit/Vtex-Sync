(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _categoryMain = _interopRequireDefault(require("./modules/_category-main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.addEventListener('DOMContentLoaded', _categoryMain["default"].init);

},{"./modules/_category-main":3}],2:[function(require,module,exports){
"use strict";

var _globalMain = _interopRequireDefault(require("./modules/_global-main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.addEventListener('DOMContentLoaded', _globalMain["default"].init);

},{"./modules/_global-main":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Methods = {
  init: function init() {
    Methods.getProducts();
  },
  //Cache do Dom
  components: {
    mainShelf: document.querySelector('.js--shelf'),
    cart: document.querySelector('.js--cart'),
    mobileMenu: document.querySelector('.mobile-menu'),
    navMenu: document.querySelector('.header__nav'),
    listMenu: document.querySelector('.header__menu')
  },
  //Cache dos produtos
  products: [],
  //Atributo
  cart: {
    total: 0,
    qty: 0
  },
  //Requisição única da API
  getProducts: function getProducts() {
    fetch('https://raw.githubusercontent.com/CristRocha/Perfumaria/master/src/assets/js/products.json').then(function (res) {
      return res.text();
    }).then(function (data) {
      JSON.parse(data).forEach(function (product) {
        Methods.products.push({
          name: product.name,
          price: product.Value,
          img: product.images[0].imageUrl
        });
      });
      Object.freeze(Methods.products);
      Methods.renderShelf();
    });
  },
  //Montar Prateleiras
  renderShelf: function renderShelf() {
    var _this = this;

    Methods.products.forEach(function (product) {
      var shelfProduct = document.createElement('div');
      var button = document.createElement('button');
      var img = document.createElement('img');
      var name = document.createElement('div');
      var price = document.createElement('div');
      shelfProduct.classList.add('shelf__product');
      img.classList.add('shelf__product-img');
      name.classList.add('shelf__product-name');
      price.classList.add('shelf__product-value');
      button.classList.add('shelf__product-buy');
      img.setAttribute('src', product.img);
      name.textContent = product.name;
      price.textContent = "R$ " + product.price.toFixed(2).replace(".", ",");
      button.addEventListener('click', Methods.addToCart);
      shelfProduct.appendChild(button);
      shelfProduct.appendChild(img);
      shelfProduct.appendChild(name);
      shelfProduct.appendChild(price);

      _this.components.mainShelf.appendChild(shelfProduct);
    });
  },
  //Valida e Adiciona os valores ao Carrinho
  addToCart: function addToCart(ev) {
    ev.preventDefault();
    var val = parseFloat(ev.target.parentNode.lastChild.textContent.replace("R$", "").replace(",", "."));
    var name = ev.target.parentNode.querySelector('.shelf__product-name').textContent; //Verifica se os valores estão corretos

    var chosen = Methods.products.filter(function (item) {
      return name == item.name && val == item.price;
    }); //Se o item existe

    if (chosen.length) {
      Methods.cart.total += chosen[0].price;
      Methods.components.cart.innerText = "R$ " + Methods.cart.total.toFixed(2).replace(".", ",");
    } else {
      alert("Produto Indisponível");
    }
  }
};
var _default = {
  init: Methods.init
};
exports["default"] = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.General = void 0;
var General = {
  init: function init() {
    General.menuMobile();
  },
  //Desk
  menuMobile: function menuMobile() {
    General.components.mobileMenu.addEventListener('click', function () {
      this.classList.toggle("change");
      General.components.navMenu.classList.toggle("change");
      General.components.listMenu.classList.toggle("change");
    });
  }
};
exports.General = General;

},{}],5:[function(require,module,exports){
"use strict";

var _categoryMain = _interopRequireDefault(require("./modules/_category-main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.addEventListener('DOMContentLoaded', _categoryMain["default"].init); //Mobile

},{"./modules/_category-main":7}],6:[function(require,module,exports){
"use strict";

var _globalMain = _interopRequireDefault(require("./modules/_global-main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.addEventListener('DOMContentLoaded', _globalMain["default"].init); //Mobile

},{"./modules/_global-main":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Methods = {
  init: function init() {
    Methods.getProducts();
  },
  //Cache do Dom  //Mobile
  components: {
    mainShelf: document.querySelector('.js--shelf'),
    cart: document.querySelector('.js--cart'),
    mobileMenu: document.querySelector('.mobile-menu'),
    navMenu: document.querySelector('.header__nav'),
    listMenu: document.querySelector('.header__menu')
  },
  //Cache dos produtos
  products: [],
  //Atributo
  cart: {
    total: 0,
    qty: 0
  },
  //Requisição única da API
  getProducts: function getProducts() {
    fetch('https://raw.githubusercontent.com/CristRocha/Perfumaria/master/src/assets/js/products.json').then(function (res) {
      return res.text();
    }).then(function (data) {
      JSON.parse(data).forEach(function (product) {
        Methods.products.push({
          name: product.name,
          price: product.Value,
          img: product.images[0].imageUrl
        });
      });
      Object.freeze(Methods.products);
      Methods.renderShelf();
    });
  },
  //Montar Prateleiras
  renderShelf: function renderShelf() {
    var _this = this;

    Methods.products.forEach(function (product) {
      var shelfProduct = document.createElement('div');
      var button = document.createElement('button');
      var img = document.createElement('img');
      var name = document.createElement('div');
      var price = document.createElement('div');
      shelfProduct.classList.add('shelf__product');
      img.classList.add('shelf__product-img');
      name.classList.add('shelf__product-name');
      price.classList.add('shelf__product-value');
      button.classList.add('shelf__product-buy');
      img.setAttribute('src', product.img);
      name.textContent = product.name;
      price.textContent = "R$ " + product.price.toFixed(2).replace(".", ",");
      button.addEventListener('click', Methods.addToCart);
      shelfProduct.appendChild(button);
      shelfProduct.appendChild(img);
      shelfProduct.appendChild(name);
      shelfProduct.appendChild(price);

      _this.components.mainShelf.appendChild(shelfProduct);
    });
  },
  //Valida e Adiciona os valores ao Carrinho
  addToCart: function addToCart(ev) {
    ev.preventDefault();
    var val = parseFloat(ev.target.parentNode.lastChild.textContent.replace("R$", "").replace(",", "."));
    var name = ev.target.parentNode.querySelector('.shelf__product-name').textContent; //Verifica se os valores estão corretos

    var chosen = Methods.products.filter(function (item) {
      return name == item.name && val == item.price;
    }); //Se o item existe

    if (chosen.length) {
      Methods.cart.total += chosen[0].price;
      Methods.components.cart.innerText = "R$ " + Methods.cart.total.toFixed(2).replace(".", ",");
    } else {
      alert("Produto Indisponível");
    }
  }
};
var _default = {
  init: Methods.init
};
exports["default"] = _default;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.General = void 0;
var General = {
  init: function init() {
    General.menuMobile();
  },
  //Mobile
  menuMobile: function menuMobile() {
    General.components.mobileMenu.addEventListener('click', function () {
      this.classList.toggle("change");
      General.components.navMenu.classList.toggle("change");
      General.components.listMenu.classList.toggle("change");
    });
  }
};
exports.General = General;

},{}]},{},[1,2,5,6]);
