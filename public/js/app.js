console.log('app.js');

$(() => getProducts());

// 'index page'
const getProducts = async () => {
  const products = await $.ajax('/products');
  for (let i=0; i < products.length; i++) {
    $productContainer = $('<div>').addClass('product-container');
    $productContainer.attr('data', products[i]._id);
    $productImgContainer = $('<div>').addClass('product-img-container');
    $productImgContainer.append($('<img>').attr('src', products[i].img));
    $productContainer.append($('<h1>').text(products[i].name));
    $productContainer.append($productImgContainer);
    $productContainer.append($('<h3>').text('$' + products[i].price));
    $productContainer.on('click', showProduct);
    $('#products-index').append($productContainer);
  }
}

// 'show page'
const showProduct = async (event) => {
  const id = $(event.currentTarget).attr('data');
  const product = await $.ajax('/products/' + id);
}
