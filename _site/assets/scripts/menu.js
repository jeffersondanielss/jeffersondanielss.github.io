'use strict';

(function(){
  
  var hamburger = document.getElementById('hamburger')
    , menu = document.querySelector('.menu')
    , menuItemBlog = document.querySelector('.menu__item--blog');

  function toggleMenu() {
    app.toggleClass(hamburger, 'open');
    app.toggleClass(menu, 'menu--active');
  }

  hamburger.addEventListener('click', function() {
    toggleMenu();
  }, false);

  menuItemBlog.addEventListener('click', function(e) {
    toggleMenu();
  }, false);

})();