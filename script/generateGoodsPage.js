import { getData } from "./getData.js";
import userData from "./userData.js";
const COUNTER = 6;

const generateGoodsPage = () => {

  const mainHeader = document.querySelector('.main-header');

  const generateCards = (data) => {

    const goodsList = document.querySelector('.goods-list');

    goodsList.textContent = '';

    if(!data.length) {
      const goods = document.querySelector('.goods');
      goods.textContent = location.search === '?wishlist' ? 'Wishlist is empty' : 'Unfortunately, nothing not found';
    }

    data.forEach(item => {

      const { name, description, price, count, id, img } = item;

      goodsList.insertAdjacentHTML('afterbegin', `
        <li class="goods-list__item">
          <a class="goods-item__link" href="card.html#${id}">
            <article class="goods-item">
              <div class="goods-item__img">
                <img src=${img[0]}
                  ${img[1] ? `data-second-image=${img[1]}` : '' }
                  alt=${ name }>
              </div>
              ${ count > COUNTER ? '<p class="goods-item__new">NEW</p>' : '' }
              ${ !count  ? '<p class="goods-item__new">Not available</p>' : '' }
              <h3 class="goods-item__header">${ name }</h3>
              <p class="goods-item__description">${ description }</p>
              <p class="goods-item__price">
                <span class="goods-item__price-value">${ price }</span>
                <span class="goods-item__currency"> ₽</span>
              </p>
              ${ count  ? 
                      `<button class="btn btn-add-card" 
                                aria-label="Добравить в корзину" 
                                data-idd="${id}"></button> ` : 
                      '' }
            </article>
          </a>
        </li>
      `)
    })

    goodsList.addEventListener('click', e => {
      const btnAddCart = e.target.closest('.btn-add-card');
      if(btnAddCart) {
        e.preventDefault();
        userData.cartList = btnAddCart.dataset.idd;
        console.log(userData.cartList)
      }
    })
  }

  if (location.pathname.includes('goods') && location.search) {
    const search = decodeURI(location.search);
    const prop = search.split('=')[0].slice(1);
    const value = search.split('=')[1];

    if (prop === 's') {
      getData.search(value,  generateCards);
      mainHeader.textContent = `Search: ${value}`
    }
    else if (prop === 'wishlist') {
      getData.wishList(userData.wishList, generateCards);
      mainHeader.textContent = `Wishlist`
    }
    else if (prop === 'cat' || prop === 'subcat') {
      getData.category(prop, value, generateCards);
      mainHeader.textContent = value
    }
  }
};
export default generateGoodsPage;
