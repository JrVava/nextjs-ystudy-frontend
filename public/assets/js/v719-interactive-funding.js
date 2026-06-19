
(function(){
  'use strict';
  function money(n){return '£'+Number(n||0).toLocaleString('en-GB');}
  function toast(msg){
    var t=document.querySelector('.ys-toast');
    if(!t){t=document.createElement('div');t.className='ys-toast';document.body.appendChild(t);}
    t.textContent=msg; t.classList.add('show');
    clearTimeout(t._timer); t._timer=setTimeout(function(){t.classList.remove('show');},2600);
  }
  function get(widget,key){var el=widget.querySelector('[data-ysf="'+key+'"]');return el?el.value:'';}
  function setResult(widget,label,big,note,data){
    var res=widget.querySelector('.result'); if(!res) return;
    var lbl=res.querySelector('.lbl'); var b=res.querySelector('.big');
    if(lbl) lbl.textContent=label;
    if(b) b.textContent=big;
    var noteEl=widget.querySelector('.ysf-mini-note');
    if(!noteEl){noteEl=document.createElement('div'); noteEl.className='ysf-mini-note'; res.after(noteEl);} 
    noteEl.textContent=note||'Indicative only. Final entitlement depends on SFE assessment.';
    res.classList.remove('is-updated'); void res.offsetWidth; res.classList.add('is-updated');
    try{localStorage.setItem('ystudyFundingEstimate', JSON.stringify(Object.assign({savedAt:new Date().toISOString()}, data||{})));}catch(e){}
  }
  function calculateHome(widget){
    var age=get(widget,'age'), residency=get(widget,'residency'), previous=get(widget,'previous');
    var tuition=9790, maintenance=14135, eligible=true, label="You're likely eligible for";
    var note='Based on a London away-from-home example. Final entitlement depends on your full SFE assessment.';
    if(residency==='under3'){eligible=false; maintenance=0; label='Needs adviser check'; note='Less than 3 years UK residence can be complex. Speak to an adviser before applying.';}
    if(previous==='complete'){maintenance=0; label='Previous study risk'; note='Previous higher education can affect tuition and maintenance entitlement. Check this before applying.';}
    if(age==='50plus' && eligible){maintenance=10830; note='Age and course type can affect funding. Check the full eligibility tool before applying.';}
    var big=eligible && maintenance ? money(maintenance)+' + tuition' : 'Speak to adviser';
    setResult(widget,label,big,note,{source:'home quick funding',age:age,residency:residency,previous:previous,tuition:tuition,maintenance:maintenance,eligible:eligible});
  }
  function calculateCourse(widget){
    var loc=get(widget,'location'), mode=get(widget,'mode'), income=get(widget,'income');
    var tuition=9790, maintenance=14135, label='Indicative total support', note='Indicative only. Final entitlement depends on SFE assessment, household income, location, course intensity and study mode.';
    if(loc==='outside') maintenance=10830;
    if(loc==='home') maintenance=9118;
    if(income==='medium') maintenance=Math.round(maintenance*.86);
    if(income==='high') maintenance=Math.round(maintenance*.55);
    if(mode==='online'){ maintenance=0; label='Maintenance risk'; note='Distance/online routes usually need careful checking. Tuition support may still be possible, but maintenance may not be available.'; }
    var total=tuition+maintenance;
    setResult(widget,label, mode==='online' ? 'Check route first' : money(total), note,{source:'course quick estimate',location:loc,mode:mode,income:income,tuition:tuition,maintenance:maintenance,total:total});
  }
  function initWidget(widget){
    if(widget.dataset.ysfReady==='1') return; widget.dataset.ysfReady='1';
    var scope=widget.dataset.ysfScope || (widget.querySelector('[data-ysf="age"]')?'home':'course');
    function calc(){ scope==='home' ? calculateHome(widget) : calculateCourse(widget); }
    widget.querySelectorAll('.ysf-quick-select').forEach(function(sel){ sel.addEventListener('change', calc); });
    var btn=widget.querySelector('.ysf-quick-button');
    if(btn){ btn.addEventListener('click', function(e){ e.preventDefault(); calc(); toast('Estimate updated and saved to your dashboard.'); }); }
    calc();
  }
  document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('.widget[data-ysf-scope], .widget .ysf-quick-select').forEach(function(x){ initWidget(x.classList && x.classList.contains('widget') ? x : x.closest('.widget')); });
  });
})();
