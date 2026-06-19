
(function(){
  function wireCarouselButtons(){
    document.querySelectorAll('.sdx-block, .carousel-section, .location-block, .course-section, .guide-section, .story-section').forEach(function(block){
      var row = block.querySelector('.sdx-row, .ys-carousel, .course-carousel, .guide-carousel, .story-carousel, .card-carousel, .jcards');
      var buttons = block.querySelectorAll('.sdx-ctrl, .carousel-btn, .ctrl');
      if(!row || buttons.length < 2) return;
      var amount = function(){ return Math.max(260, Math.round(row.clientWidth * 0.86)); };
      buttons[0].addEventListener('click', function(){ row.scrollBy({left:-amount(), behavior:'smooth'}); });
      buttons[1].addEventListener('click', function(){ row.scrollBy({left: amount(), behavior:'smooth'}); });
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wireCarouselButtons);
  else wireCarouselButtons();
})();
