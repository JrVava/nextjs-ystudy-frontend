(function(){
  function move(btn,dir){
    var area=btn.closest('.location-course-panel,.ys-carousel-shell,section,.wrap,body');
    var row=area&&area.querySelector('[data-course-carousel],.ys-course-carousel,.ys-card-carousel,.ys-guide-carousel,.ys-story-carousel,.ys-carousel-mobile');
    if(!row)return;
    var card=row.children[0];
    var amount=card?card.getBoundingClientRect().width+12:320;
    row.scrollBy({left:dir*amount,behavior:'smooth'});
  }
  document.addEventListener('click',function(e){
    var prev=e.target.closest('[data-carousel-prev],.ys-carousel-prev');
    var next=e.target.closest('[data-carousel-next],.ys-carousel-next');
    if(prev){e.preventDefault();move(prev,-1)}
    if(next){e.preventDefault();move(next,1)}
  });
})();
