console.log('app.js');

// window onload
$(() => getProducts());
// end window onload

// 'index page'
const getProducts = async () => {
  $('main').empty();
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
    $('main').append($productContainer);
  }
}

// 'show page'
const showProduct = async (event, id) => {
  if (!id) id = $(event.currentTarget).attr('data');
  const product = await $.ajax('/products/' + id);
  $('main').empty();
  console.log("Show product: ", product);
  $productContainer = $('<div>').addClass('product-container-expanded');
  $productImgContainer = $('<div>').addClass('product-img-container-expanded');
  $productImgContainer.append($('<img>').attr('src', product.img));
  $productContainer.append($('<h1>').text(product.name));
  $productContainer.append($productImgContainer);
  $productContainer.append($('<h3>').text('$' + product.price));
  $link = $('<a href="#">Back to products</a>').on('click', getProducts);
  $('main').append($link);
  $('main').append($productContainer);
  addReview(product);
  showReviews(product);
}

// 'new page' for related data, displayed within main 'show page'
const addReview = (product) => {
  $('#new-review').show();
  $('#new-review-form').on('submit', async (event) => {
    event.preventDefault();
    const data = {
      title: $('input:nth-child(1)').val(),
      author: $('input:nth-child(2)').val(),
      content: $('input:nth-child(3)').val(),
      product: product._id
    }
    try {
      const result = await $.ajax({
        url: '/reviews',
        method: 'post',
        data
      });
      showProduct(event, product._id);
    } catch (err) {
      console.log(err);
    }
  });
}

// 'index page' of related data
const showReviews = (product) => {
  console.log('reviews to display: ', product.reviews);
}
