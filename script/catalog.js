import {getData} from "./getData.js";
import generateSubCatalog from "./generateSubCatalog.js";

export const catalog = () => {
  const updateSubCatalog = generateSubCatalog();
  const btnBurger = document.querySelector('.btn-burger');
  const catalog = document.querySelector('.catalog');
  const catalogList = document.querySelector('.catalog-list');
  const subCatalog = document.querySelector('.subcatalog');
  const subCatalogHeader = document.querySelector('.subcatalog-header');
  const btnReturn = document.querySelector('.btn-return');
  const overlay = document.createElement('div');

  overlay.classList.add('overlay');
  document.body.insertAdjacentElement('beforeend', overlay)

  const openMenu = () => {
    catalog.classList.add('open');
    overlay.classList.add('active');
  }

  const closeMenu = () => {
    catalog.classList.remove('open');
    overlay.classList.remove('active');
    closeSubMenu();
  }

  const handlerCatalog = e => {
    e.preventDefault();
    const target = e.target;
    const itemList = target.closest('.catalog-list__item');
    if (itemList) {
      getData.subCatalog(target.textContent, (data) => {
        updateSubCatalog(itemList.innerText, data);
        subCatalog.classList.add('subopen');
      })
    }
    if(target.closest('.btn-close')) {
      closeMenu();
    }
  }

  const closeSubMenu = () => {
    subCatalog.classList.remove('subopen');
  }


  btnBurger.addEventListener('click', openMenu);
  // btnClose.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  catalogList.addEventListener('click', handlerCatalog);
  subCatalog.addEventListener('click', (e) => {
    const btnReturn = e.target.closest('.btn-return');
    if(btnReturn) closeSubMenu();
  })
  // btnReturn.addEventListener('click', closeSubMenu);

}
