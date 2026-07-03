
(function(){
  function amt(row){return Math.max(300, Math.round(row.clientWidth*.86));}
  function wire(block){
    var row=block.querySelector('.v735-course-carousel,.course-carousel,.ys-course-carousel,.card-carousel,.guide-carousel,.story-carousel,.sdx-row,.jcards');
    if(!row)return;
    var btns=block.querySelectorAll('.v735-ctrl,.sdx-ctrl,.carousel-btn,.ctrl');
    if(btns.length>=2){
      btns[0].addEventListener('click',function(){row.scrollBy({left:-amt(row),behavior:'smooth'});});
      btns[1].addEventListener('click',function(){row.scrollBy({left:amt(row),behavior:'smooth'});});
    }
  }
  function init(){document.querySelectorAll('.v735-tabs-and-carousel,.sdx-block,.carousel-section,.guide-section,.story-section,.related-section,#journey').forEach(wire);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
