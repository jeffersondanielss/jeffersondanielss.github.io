'use strict';

(function(){
  
  var hamburger = $('#hamburger')
    , menu = $('.menu')
    , menuItemBlog = $('.menu__item--blog');

  function toggleMenu() {
    hamburger.toggleClass('open');
    menu.toggleClass('menu--active');
  }

  hamburger.click( toggleMenu );
  menuItemBlog.click( toggleMenu );

})();