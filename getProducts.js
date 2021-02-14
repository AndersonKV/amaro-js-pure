fetch("./products.json")
  .then((response) => {
    return response.json();
  })
  .then((resp) => {
    resp.forEach((element, index) => {
      resp[index].id = index;
      products.push(resp[index]);
    });
    init(products);
  });
