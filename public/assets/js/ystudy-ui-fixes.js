(function(){
  'use strict';

  var pages = [
    {t:'Search degrees', u:'degrees/index.html', c:'Degrees', d:'Browse courses by subject, route and study mode.', k:'degree course search find programme university'},
    {t:'Business degrees', u:'degrees/business.html', c:'Subject', d:'Business management, marketing, HR and project routes.', k:'business management marketing hr project'},
    {t:'Computing degrees', u:'degrees/computing.html', c:'Subject', d:'Computing, IT, cyber security and data routes.', k:'computing it cyber security data software'},
    {t:'Health & Social Care degrees', u:'degrees/health.html', c:'Subject', d:'Health, social care, public health and care management.', k:'health social care nhs public health'},
    {t:'Construction degrees', u:'degrees/construction.html', c:'Subject', d:'Construction management, site management and surveying routes.', k:'construction site management quantity surveying'},
    {t:'Psychology degrees', u:'degrees/psychology.html', c:'Subject', d:'Psychology and behaviour-related study routes.', k:'psychology behaviour counselling mental'},
    {t:'Law degrees', u:'degrees/law.html', c:'Subject', d:'Law, compliance, paralegal and legal routes.', k:'law legal paralegal compliance'},
    {t:'Foundation Year', u:'degrees/qualifications/foundation-year.html', c:'Qualification', d:'Start university with an integrated foundation route.', k:'foundation year entry route qualification'},
    {t:'HND', u:'degrees/qualifications/hnd.html', c:'Qualification', d:'Higher National Diploma route and progression options.', k:'hnd higher national diploma'},
    {t:'HNC', u:'degrees/qualifications/hnc.html', c:'Qualification', d:'Higher National Certificate route and progression options.', k:'hnc higher national certificate'},
    {t:'Top-Up Degree', u:'degrees/qualifications/top-up-degree.html', c:'Qualification', d:'Convert an HND or equivalent into a full degree.', k:'top up degree final year'},
    {t:'Master’s Degree', u:'degrees/qualifications/masters.html', c:'Qualification', d:'Postgraduate study options and funding routes.', k:'masters postgraduate msc ma mba'},
    {t:'Funding hub', u:'funding/index.html', c:'Funding', d:'Tuition fee loan, maintenance loan, grants and repayment.', k:'funding finance student finance loan maintenance tuition grant'},
    {t:'Maintenance Loan', u:'funding/maintenance-loan.html', c:'Funding', d:'Living cost support while you study.', k:'maintenance loan living costs sfe'},
    {t:'Tuition Fee Loan', u:'funding/tuition-fee-loan.html', c:'Funding', d:'Course fee funding for eligible students.', k:'tuition fee loan fees'},
    {t:'Grants & Support', u:'funding/grants.html', c:'Funding', d:'Extra support such as childcare or disability support.', k:'grant support childcare dsa disability'},
    {t:'Eligibility Checker', u:'tools/eligibility-checker.html', c:'Tool', d:'Check if you are likely to qualify before you choose.', k:'eligibility checker student finance qualify settled british refugee'},
    {t:'Student Finance Calculator', u:'tools/student-finance-calculator.html', c:'Tool', d:'Estimate tuition, maintenance and repayments.', k:'calculator finance maintenance tuition repayment'},
    {t:'Degree Match Finder', u:'tools/degree-match.html', c:'Tool', d:'Get subject and course suggestions based on your goals.', k:'degree match finder quiz subject career'},
    {t:'English Level Checker', u:'tools/english-level-checker.html', c:'Tool', d:'Check B1, B2 or advanced English level.', k:'english test level checker b1 b2 c1'},
    {t:'Salary Checker', u:'tools/salary-checker.html', c:'Tool', d:'Explore likely salary routes by career area.', k:'salary checker earnings career wage'},
    {t:'CV Builder', u:'tools/cv-builder.html', c:'Tool', d:'Build a simple university-ready CV.', k:'cv builder curriculum resume'},
    {t:'Personal Statement Builder', u:'tools/personal-statement-calculator.html', c:'Tool', d:'Structure your university personal statement.', k:'personal statement builder statement'},
    {t:'Apply with YStudy', u:'apply/index.html', c:'Apply', d:'Complete one short form and speak to an adviser.', k:'apply application ystudy form'},
    {t:'Book adviser call', u:'lead/adviser-call.html', c:'Adviser', d:'Request a call about courses, funding or documents.', k:'book call adviser appointment'},
    {t:'Contact adviser', u:'lead/contact-adviser.html', c:'Adviser', d:'Send a message and ask for guidance.', k:'contact adviser help message'},
    {t:'Dashboard', u:'dashboard/index.html', c:'Account', d:'View saved courses, applications, results and next steps.', k:'dashboard account saved applications'},
    {t:'Careers & salaries', u:'careers/index.html', c:'Careers', d:'Explore career outcomes and salary progression.', k:'careers salaries jobs outcomes'},
    {t:'Business careers', u:'careers/business.html', c:'Careers', d:'Business analyst, operations, management and project paths.', k:'business careers manager analyst operations'},
    {t:'Computing careers', u:'careers/computing.html', c:'Careers', d:'Cyber security, data, software and IT support careers.', k:'computing careers cyber data software'},
    {t:'Student guides', u:'guides/index.html', c:'Guide', d:'Helpful guides for mature students and career changers.', k:'guides resources articles'},
    {t:'Mature students guide', u:'guides/mature-students.html', c:'Guide', d:'Returning to education as an adult learner.', k:'mature student adult learner'},
    {t:'Settled Status guide', u:'guides/settled-status.html', c:'Guide', d:'Funding questions for EU settled and pre-settled students.', k:'settled status eu pre settled'},
    {t:'Student Finance guide', u:'guides/student-finance.html', c:'Guide', d:'Understand Student Finance before applying.', k:'student finance guide sfe'}
  ];

  function rootPrefix(){
    var path = location.pathname.replace(/\\/g,'/');
    var dirs = ['apply','business','careers','dashboard','degrees','funding','guides','lead','money','partners','tools','universities'];
    var parts = path.split('/').filter(Boolean);
    var idx = -1;
    for(var i=0;i<parts.length;i++){ if(dirs.indexOf(parts[i])>-1){ idx=i; break; } }
    if(idx < 0) return '';
    var depth = Math.max(0, parts.length - idx - 2); // folder/index.html => 0, degrees/course/x.html => 1
    if(parts[parts.length-1] && parts[parts.length-1].indexOf('.html')>-1){ depth = Math.max(0, parts.length - idx - 2); }
    return '../'.repeat(depth+1);
  }
  function href(u){
    if(/^https?:|^#|^mailto:|^tel:/.test(u)) return u;
    return rootPrefix() + u;
  }
  function score(item, q){
    q=q.toLowerCase().trim();
    if(!q) return 0;
    var hay=(item.t+' '+item.c+' '+item.d+' '+item.k).toLowerCase();
    var s=0;
    q.split(/\s+/).forEach(function(w){
      if(!w) return;
      if(item.t.toLowerCase().indexOf(w)>-1) s += 8;
      if(item.k.toLowerCase().indexOf(w)>-1) s += 5;
      if(hay.indexOf(w)>-1) s += 2;
    });
    return s;
  }
  function renderResults(input, resultsBox, query){
    var q = (query || '').trim();
    var results = q ? pages.map(function(p){return {p:p,s:score(p,q)}}).filter(function(x){return x.s>0}).sort(function(a,b){return b.s-a.s}).slice(0,8).map(function(x){return x.p}) : pages.slice(0,8);
    if(!results.length){
      resultsBox.innerHTML = '<div class="ys-no-results"><b>No exact match.</b><span>Try “funding”, “business”, “eligibility”, “English test” or “apply”.</span></div>';
      return;
    }
    resultsBox.innerHTML = results.map(function(p){
      return '<a class="ys-search-result" href="'+href(p.u)+'"><span>'+p.c+'</span><strong>'+p.t+'</strong><small>'+p.d+'</small></a>';
    }).join('');
  }

  function enhanceSearch(){
    var modal=document.getElementById('ystudySearchModal');
    if(!modal) return;
    modal.innerHTML = '<div aria-label="Search YStudy" aria-modal="true" class="ystudy-search-panel ys-smart-search-panel" role="dialog">'+
      '<button aria-label="Close search" class="ystudy-search-close ys-smart-close" type="button">×</button>'+
      '<div class="ys-smart-search-hero"><span class="ys-search-kicker">Search YStudy</span><h2>What do you want to find?</h2><p>Search degrees, funding pages, tools, guides and adviser support.</p></div>'+
      '<div class="ys-smart-search-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></svg><input class="ystudy-search-input" placeholder="Try: business, funding, eligibility, English test..." type="search" autocomplete="off"/><a class="ys-search-go" href="'+href('degrees/index.html')+'">Search</a></div>'+
      '<div class="ys-smart-quick"><a href="'+href('tools/degree-match.html')+'">Degree Match</a><a href="'+href('tools/eligibility-checker.html')+'">Eligibility</a><a href="'+href('funding/index.html')+'">Funding</a><a href="'+href('apply/index.html')+'">Apply</a><a href="'+href('tools/english-level-checker.html')+'">English Test</a></div>'+
      '<div class="ys-search-results-title">Suggested pages</div><div class="ys-smart-search-results"></div>'+
      '</div>';
    var input=modal.querySelector('.ystudy-search-input');
    var resultsBox=modal.querySelector('.ys-smart-search-results');
    var go=modal.querySelector('.ys-search-go');
    renderResults(input, resultsBox, '');
    input.addEventListener('input', function(){
      renderResults(input, resultsBox, input.value);
      var first=resultsBox.querySelector('a');
      if(first) go.href=first.href;
    });
    input.addEventListener('keydown', function(e){
      if(e.key === 'Enter'){
        var first=resultsBox.querySelector('a');
        if(first){ e.preventDefault(); location.href = first.href; }
      }
    });
    function open(){ modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false'); setTimeout(function(){input.focus();},40); }
    function shut(){ modal.classList.remove('is-open'); modal.setAttribute('aria-hidden','true'); }
    document.querySelectorAll('.ystudy-search-open').forEach(function(btn){ btn.addEventListener('click',function(e){e.preventDefault();open();}); });
    modal.querySelector('.ystudy-search-close').addEventListener('click',shut);
    modal.addEventListener('click',function(e){ if(e.target===modal) shut(); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') shut(); });
  }

  function enhanceForms(){
    document.querySelectorAll('.ystudy-form').forEach(function(form){
      form.addEventListener('submit', function(){
        try{
          var data={};
          form.querySelectorAll('input,select,textarea').forEach(function(el){
            if(!el.name && el.type !== 'checkbox') return;
            if(el.type === 'checkbox') data[el.name || 'consent'] = el.checked;
            else if(el.type === 'radio'){ if(el.checked) data[el.name]=el.value; }
            else data[el.name]=el.value;
          });
          var key='ystudy_lead_'+(form.id||'form');
          localStorage.setItem(key, JSON.stringify({savedAt:new Date().toISOString(),page:location.pathname,data:data}));
        }catch(e){}
      }, true);
    });
  }

  function init(){ enhanceSearch(); enhanceForms(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
