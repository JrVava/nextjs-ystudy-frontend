(function(){
  function $(s,r){return (r||document).querySelector(s)}
  function $all(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
  function toast(msg){var t=$('#saveToast'); if(!t){t=document.createElement('div'); t.id='saveToast'; t.className='save-toast'; document.body.appendChild(t);} t.textContent=msg||'Saved'; t.classList.add('show'); setTimeout(function(){t.classList.remove('show')},2200)}
  function text(sel){var el=$(sel); return el?el.textContent.trim():''}
  function htmlToPlain(el){return (el?el.innerText:'').replace(/\n{3,}/g,'\n\n').trim()}
  window.ystudySaveToolResult=function(type,title,summary,extra){
    var list=[]; try{list=JSON.parse(localStorage.getItem('ystudy_saved_tools')||'[]')}catch(e){}
    var item={type:type||'tool',title:title||document.title.replace(/^YStudy\s*[—|-]\s*/,'')||'YStudy tool',summary:summary||'',url:location.pathname,savedAt:new Date().toISOString(),extra:extra||{}};
    list.unshift(item); localStorage.setItem('ystudy_saved_tools',JSON.stringify(list.slice(0,50))); toast('Saved to dashboard'); return item;
  };
  window.ystudyToolType=window.ystudyToolType||function(){var t=document.title.toLowerCase(); if(t.includes('cv'))return 'cv'; if(t.includes('statement'))return 'statement'; if(t.includes('degree'))return 'degree'; if(t.includes('finance')||t.includes('loan')||t.includes('funding'))return 'funding'; if(t.includes('english'))return 'english'; if(t.includes('salary'))return 'salary'; if(t.includes('career'))return 'career'; return 'tool'};
  window.ystudySummary=window.ystudySummary||function(){return [text('#degreeResultTitle'),text('#degreeResultText'),text('#eligResultTitle'),text('#eligResultText'),text('#scoreText'),text('#levelText'),text('#totalSupport'),text('#maintOut'),text('#salMain'),text('#salGain'),text('#repay'),text('#cvScore'),text('#psScore')].filter(Boolean).join(' · ')||'Tool result saved.'};
  window.ystudySaveCurrentTool=function(){return window.ystudySaveToolResult(window.ystudyToolType(),document.title,window.ystudySummary())};
  window.ystudyPrepareAdviser=function(){var item=window.ystudySaveCurrentTool(); localStorage.setItem('ystudy_adviser_context',JSON.stringify(item)); return true};
  window.prepareAdviser=window.prepareAdviser||function(title){window.ystudySaveToolResult(window.ystudyToolType(),title||document.title,window.ystudySummary()); location.href='../lead/adviser-call.html'};
  window.showAccountModal=function(action){
    // In the static website build, save/copy/print work locally without database/account.
    var label=(action||'Save').toLowerCase();
    if(label.includes('copy')){var area=$('.print-area')||$('#cvPreview')||$('#psPreview'); navigator.clipboard&&navigator.clipboard.writeText(htmlToPlain(area)); toast('Copied'); return;}
    if(label.includes('print')||label.includes('download')){window.print(); return;}
    var area=$('.print-area')||$('#cvPreview')||$('#psPreview'); window.ystudySaveToolResult(window.ystudyToolType(),action||document.title,htmlToPlain(area).slice(0,220));
  };
  window.closeAccountModal=function(){var m=$('#accountModal'); if(m)m.classList.remove('is-open')};
  function patchButtons(){
    $all('button').forEach(function(b){if(!b.getAttribute('type')) b.setAttribute('type','button')});
    $all('form').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault(); window.ystudySaveCurrentTool();});});
    $all('a[href="../dashboard/index.html"],a[href="../lead/adviser-call.html"]').forEach(function(a){if(a.textContent.toLowerCase().includes('save')){a.addEventListener('click',function(e){e.preventDefault(); window.ystudySaveCurrentTool();});}});
  }
  function patchEnglish(){
    var result=$('#resultCard'); if(!result) return;
    var observer=new MutationObserver(function(){ if(!result.classList.contains('hidden')){window.ystudySaveToolResult('english','English Level Checker',window.ystudySummary());}});
    observer.observe(result,{attributes:true,attributeFilter:['class']});
  }
  function patchDegreeAndEligibility(){
    ['#degreeWizard','#eligibilityWizard'].forEach(function(sel){var w=$(sel); if(!w)return; var result=$('.result-screen',w); if(result){new MutationObserver(function(){if(result.classList.contains('show')) window.ystudySaveCurrentTool();}).observe(result,{attributes:true,attributeFilter:['class']});}
    });
  }
  function patchCalculators(){
    if($('#repSalary')&&typeof window.runRepay==='function') window.runRepay();
    if($('#calcFinance')) $('#calcFinance').addEventListener('click',function(){setTimeout(window.ystudySaveCurrentTool,50)});
    if($('#salCareer')) ['salCareer','salCurrent','salLevel','salLoc'].forEach(function(id){var e=document.getElementById(id); if(e)e.addEventListener('change',function(){setTimeout(window.ystudySaveCurrentTool,80)})});
  }
  function patchBuilders(){
    // direct copy/save buttons in builders
    $all('button').forEach(function(b){var t=b.textContent.toLowerCase(); if(t.includes('copy')) b.addEventListener('click',function(e){e.preventDefault(); var area=$('#cvPreview')||$('#psPreview')||$('.print-area'); if(navigator.clipboard) navigator.clipboard.writeText(htmlToPlain(area)); toast('Copied');}); if(t.includes('print')||t.includes('download')) b.addEventListener('click',function(e){e.preventDefault(); window.print();});});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
  function init(){patchButtons();patchEnglish();patchDegreeAndEligibility();patchCalculators();patchBuilders();}
})();
