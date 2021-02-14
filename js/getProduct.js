class Product {
  constructor() {
    const _product = [];
  }
  getApi() {
    console.log("api");
    fetch("./products.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.forEach((element, index) => {
          data[index].id = index;
        });

        data.forEach((element) => {
          document.querySelector(".app").append(this.templateHTML(element));
        });

        item.push(data);
        //this.list(data);
      });
  }

  get getList() {
    console.log(this._product);
  }

  set setList(value) {
    this._product = value;
  }
}

class Template extends Product {
  constructor() {
    super();
  }

  templateHTML(value) {
    const cart = new Cart();

    const dom = document.createElement("article");

    dom.classList.add("article");
    dom.id = value.id;

    const string = `
      <figure>
        <img src="${value.image}" alt="image"/>
      </figure>
      <div class="text">
        <h4>${value.name}</h4>
      <div>
        <span>${value.actual_price}</span>
        <span>${value.installments}</span>
      </div> 
      </div>
     `;
    dom.innerHTML = string;
    dom.querySelector("img").addEventListener("error", this.handleErrorImage);
    dom.addEventListener("click", cart.openScreenProduct);
    // dom
    //   .querySelector(".article")
    //   .addEventListener("click", this.reateNewScreen);

    return dom;
  }

  handleAddEventListener() {
    const cart = new Cart();

    const query = (param) => {
      return document.querySelector(param);
    };

    query(".btn-shopping").addEventListener("click", cart.openAsideCart);
    query(".closer-cart").addEventListener("click", cart.openAsideCart);
    query("input").addEventListener("keyup", this.handlerInput);

    //.addEventListener("click", this.openScreenProduct);
  }

  handlerInput(e) {
    const text = e.target.value;
    const dom = document.querySelector(".app");

    const arrFoundItem = [];

    if (text.length > 2) {
      item.forEach((element) => {
        const name = element.name.toLowerCase();
        if (name.includes(text)) {
          while (dom.firstChild) {
            dom.removeChild(dom.firstChild);
          }

          arrFoundItem.push(element);
        }
      });
    }

    const product = new Product();

    arrFoundItem.forEach((element) => {
      dom.append(product.templateHTML(element));
    });

    if (arrFoundItem.length === 0) {
      while (dom.firstChild) {
        dom.removeChild(dom.firstChild);
      }

      const article = document.createElement("article");
      const string = `<h4>Nada foi encontrada ;(</h4>`;
      article.innerHTML = string;
      dom.append(article);
    }
  }

  handleErrorImage() {
    const img =
      "https://image.freepik.com/free-vector/404-error-sign_23-2147508325.jpg";
    this.src = img;
  }

  setColorButton(event) {
    const checked = event.target.parentElement.querySelectorAll(".checked");

    checked.forEach((element) => {
      if (element.classList.value.indexOf("selected") === 8) {
        element.classList.remove("selected");
      }
      if (element.id === this.id) {
        //size.push(element.id);
        document.querySelector(
          ".details-box div h4"
        ).innerHTML = `Tamanho: ${element.id}`;
        element.classList.add("selected");
      }
    });
  }

  templateScreen(value) {
    const html = `
      <button class="close-container">X</button>
      <div class="container-box-buy" id="${value.id}">
      <figure>
      <img src="${value.image}"/>
    </figure>
    <div class="details-box">
      <h4>${value.name}</h4>
      <div>
        <span>${value.actual_price}</span>
        <span>${value.installments}</span>
        <h4>Tamanho</h4>
      </div> 
      <div class="size"></div> 
      <div class="btn"><button>Comprar</button></div>
    </div>
    </div>
    `;

    return html;
  }

  removeItem(e) {
    e.target.parentElement.remove();

    const arr = [];
    itemCart.forEach((el, index) => {
      if (parseInt(e.target.parentElement.id) !== index) {
        arr.push(el);
      }
    });

    const i = 2;
    const filteredItems = itemCart
      .slice(0, i)
      .concat(itemCart.slice(i + 1, itemCart.length));
    itemCart = filteredItems;

    e.target.parentElement.remove();

    document.querySelector(
      ".count-item"
    ).innerHTML = `Sacola (${filteredItems.length})`;
  }
}

class Cart extends Template {
  constructor() {
    super();
  }

  itemCart(item) {
    console.log(item);
    const itemCart = [];

    return itemCart;
  }

  openAsideCart() {
    const product = new Product();

    //console.log(product.list(...ar));
    const asideCart = document.querySelector("aside");

    asideCart.classList.forEach((element) => {
      if (element === "cart-invisible") {
        const template = new Template();
        console.log("abre");
        asideCart.classList.remove("cart-invisible");
        asideCart.classList.add("cart-visible");

        if (itemCart.length) {
          while (asideCart.querySelector("main div").firstChild) {
            asideCart
              .querySelector("main div")
              .removeChild(asideCart.querySelector("main div").firstChild);
          }
        }

        itemCart.forEach((element, index) => {
          const div = document.createElement("div");
          const string = `  
            <span>${element.name} (${element.tamanho})</span>
            <img src=${element.image}/>
            <button>X</button>
         `;

          div.innerHTML = string;
          div.id = index;
          div.classList.add("aside-div-item");

          div
            .querySelector("button")
            .addEventListener("click", template.removeItem);

          //asideCart.querySelector("main div").removeChild();
          asideCart.querySelector("main div").append(div);
          //  asideCart.querySelector(".div").append(div);
        });

        const div = document.createElement("div");
        div.classList.add("bg");

        div.addEventListener("click", function () {
          this.remove();
          asideCart.classList.remove("cart-visible");
          asideCart.classList.add("cart-invisible");
        });

        document.querySelector(
          ".count-item"
        ).innerHTML = `Sacola (${itemCart.length})`;
        document.querySelector(".app").append(div);
      }

      if (element === "cart-visible") {
        document.querySelector(".bg").remove();
        asideCart.classList.remove("cart-visible");
        asideCart.classList.add("cart-invisible");
      }
    });
  }

  buyProduct() {
    const verifyIsSelected = this.parentElement.parentElement;

    const btn = verifyIsSelected.querySelector(".size .selected");

    if (btn !== null) {
      item[0].forEach((element) => {
        if (element.id === parseInt(verifyIsSelected.id)) {
          const arr = [];
          arr.push(element);
          arr[0].tamanho = btn.id;

          itemCart.push(arr[0]);
          // size = [];
          alert("item adicionado");
        }
      });
    } else {
      alert("selecione o tamanho para fazer a compra");
      return;
    }

    if (itemCart.length > 0) {
      console.log(itemCart.length);
    }
  }

  openScreenProduct(event) {
    const template = new Template();
    const cart = new Cart();

    const dom = document.createElement("div");
    const backgroundGray = document.createElement("div");

    dom.classList.add("box-item");

    backgroundGray.classList.add("screen");
    backgroundGray.id = "screen";

    backgroundGray.addEventListener("click", function (e) {
      if (e.target.id === "screen") {
        document.querySelector("#screen").remove();
      }
    });

    backgroundGray.append(dom);

    const article = event.path[2];

    const find = [];

    item[0].forEach((element) => {
      if (parseInt(article.id) === element.id) {
        find.push(element);
      }
    });

    if (find.length) {
      const html = template.templateScreen(find[0]);

      dom.innerHTML = html;

      dom.querySelector(".btn").addEventListener("click", cart.buyProduct);

      find[0].sizes.forEach((element) => {
        const div = document.createElement("div");
        const string = `<span>${element.size}</span>`;
        div.id = element.size;
        div.innerHTML = string;

        element.available === true
          ? div.classList.add("checked")
          : div.classList.add("not-checked");

        dom.querySelector(".size").append(div);
      });

      const btnPossibleSelected = dom.querySelectorAll(".size .checked");

      btnPossibleSelected.forEach((element) => {
        element.addEventListener("click", template.setColorButton);
      });

      dom.querySelectorAll(".size .checked");
      dom
        .querySelector(".close-container")
        .addEventListener("click", function () {
          document.querySelector("#screen").remove();
        });

      if (document.querySelector(".box-item") === null) {
        document.querySelector(".app").append(backgroundGray);
      }
    }
  }
}
