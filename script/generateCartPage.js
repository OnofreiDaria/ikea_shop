import {getData} from "./getData.js";
import userData from "./userData.js";

const sendData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: data
  });
  if (!response.ok) {
    throw new Error(`Error: ${url}, status: ${response}`)
  }
  return await response.json();
};

const sendCart = () => {
  const cartForm = document.querySelector('.cart-form')

  cartForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(cartForm);

    formData.set('order', JSON.stringify(userData.cartList))

    // const cartList = JSON.stringify(data);
    sendData('https://jsonplaceholder.typicode.com/posts', formData)
      .then(() => {
        cartForm.reset();
      })
      .catch(err => {
        console.log(err)
      })
  })
}

const generateCartPage = () => {

  if(location.pathname.includes('cart')) {
    const cartList = document.querySelector('.cart-list');
    const cartTotalPrice = document.querySelector('.cart-total-price');

    const renderCartList = (data) => {
      cartList.textContent = '';
      let totalPrice = 0;

      data.forEach(({name: itemName, id, img, price, description, count}) => {

        let options = '';

        let countUser = userData.cartList.find(item => item.id === id).count;

        if (countUser > count) {
          countUser = count
        }

        for (let i = 1; i <= count; i++) {
          options += `<option value=${i} ${countUser === i ? 'selected' : ''}>${i}</option>`
        }
        totalPrice += countUser * price;

        cartList.insertAdjacentHTML('beforeend', `
      <li class="cart-item">
\t\t\t\t<div class="product">
\t\t\t\t\t<div class="product__image-container">
\t\t\t\t\t\t<img src=${img[0]} alt="${itemName} - ${description}">
\t\t\t\t\t</div>
\t\t\t\t\t<div class="product__description">
\t\t\t\t\t\t<h3 class="product__name">
\t\t\t\t\t\t\t<a href="card.html#${id}">${itemName}</a></h3>
\t\t\t\t\t\t<p class="product_description-text">${description}</p>
\t\t\t\t\t</div>
\t\t\t\t\t<div class="product__prices">
\t\t\t\t\t\t<div class="product__price-type product__price-type-regular">
\t\t\t\t\t\t\t<div>
                <div class="product__total product__total-regular">${price * countUser}.-</div>
                ${countUser > 1 ? `
                <div class="product__price-regular">${price}.-</div>
                ` : ``}
              </div>
</div>
</div>
\t\t\t\t\t<div class="product__controls">

\t\t\t\t\t\t<div class="product-controls__remove">
\t\t\t\t\t\t\t<button type="button" class="btn btn-remove" data-idd=${id}>
\t\t\t\t\t\t\t\t<img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
\t\t\t\t\t\t\t</button>
\t\t\t\t\t\t</div>
\t\t\t\t\t\t<div class="product-controls__quantity">
\t\t\t\t\t\t\t<select title="Выберите количество" aria-label="Выберите количество" data-idd=${id}>
                ${options}
\t\t\t\t\t\t\t</select>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</li>
        `)
      });

      cartTotalPrice.textContent = totalPrice;

    }
    cartList.addEventListener('change', (e) => {
      userData.changeCountCartList = {
        id: e.target.dataset.idd,
        count: parseInt(e.target.value)
      };
      getData.cart(userData.cartList, renderCartList);
    });

    cartList.addEventListener('click', e => {
      const target = e.target;
      const btnRemove = target.closest('.btn-remove');
      if(btnRemove) {
        userData.deleteItemCart = btnRemove.dataset.idd;
        getData.cart(userData.cartList, renderCartList);
      }

    })

    getData.cart(userData.cartList, renderCartList);

    sendCart();
  }
};

export default generateCartPage;
