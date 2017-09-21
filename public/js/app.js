console.log('app.js');

// window onload
$(() => getProducts());
// end window onload

// 'index page'
const getProducts = async () => {
  $('main').empty();
  const products = await $.ajax('/products');
  console.log(products);
  for (let i=0; i < products.length; i++) {
    $productContainer = $('<div>').addClass('product-container');
    $productImgContainer = $('<div>').addClass('product-img-container');
    $productImgContainer.append($('<img>').attr('src', products[i].img));
    $productContainer.append($('<h1>').text(products[i].name));
    $productContainer.append($productImgContainer);
    $productContainer.append($('<h3>').text('$' + products[i].price));
    $productContainer.on('click', () => showProduct(products[i]));
    $('main').append($productContainer);
  }
}

// 'show page'
const showProduct = (product) => {
  $('main').empty();
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
      product.reviews.push(result);
      showProduct(product);
    } catch (err) {
      console.log(err);
    }
  });
}

// 'index page' of related data
const showReviews = (product) => {
  $reviewsContainer = $('<div>');
  console.log('reviews to display: ', product.reviews);
  product.reviews.forEach((review) => {
    $oneReview = $('<div>');
    $oneReview.append('<h1>' + review.title + '</h1>');
    $reviewsContainer.append($oneReview);
  });
  $('.product-container-expanded').append($reviewsContainer);
}

const editReview = (review) => {
  console.log('edit review');
}

const deleteReview = (review) => {
  console.log('delete review');
}





