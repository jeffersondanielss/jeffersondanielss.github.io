'use strict';

app.toggleClass = function( el, className ) {
  if(el.classList.contains( className )) {
    el.classList.remove( className );
  } else {
    el.classList.add( className );
  }
};