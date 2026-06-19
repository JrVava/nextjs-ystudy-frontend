(function(){
  'use strict';
  function ready(fn){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn,{once:true}); else fn(); }
  ready(function(){
    var body=document.body;
    function getShell(btn){
      var id=btn && btn.getAttribute('aria-controls');
      if(id){ var s=document.getElementById(id); if(s) return s; }
      return document.querySelector('.mobile-nav-shell');
    }
    function openMenu(shell,btn){
      if(!shell) return;
      body.classList.add('mobile-menu-open');
      shell.classList.add('is-open');
      shell.setAttribute('aria-hidden','false');
      if(btn){ btn.setAttribute('aria-expanded','true'); btn.classList.add('is-active'); }
    }
    function closeMenu(shell,btn){
      shell=shell || document.querySelector('.mobile-nav-shell');
      if(!shell) return;
      body.classList.remove('mobile-menu-open');
      shell.classList.remove('is-open');
      shell.setAttribute('aria-hidden','true');
      document.querySelectorAll('.mobile-nav-toggle').forEach(function(b){ b.setAttribute('aria-expanded','false'); b.classList.remove('is-active'); });
    }
    document.querySelectorAll('.mobile-nav-toggle').forEach(function(btn){
      if(!btn.getAttribute('aria-controls')) btn.setAttribute('aria-controls','mobileNav');
      btn.setAttribute('aria-expanded','false');
      btn.type='button';
    });
    document.addEventListener('click',function(e){
      var toggle=e.target.closest('.mobile-nav-toggle');
      if(toggle){
        e.preventDefault(); e.stopPropagation();
        var shell=getShell(toggle);
        if(body.classList.contains('mobile-menu-open')) closeMenu(shell,toggle); else openMenu(shell,toggle);
        return;
      }
      var close=e.target.closest('.mobile-nav-close');
      if(close){ e.preventDefault(); closeMenu(close.closest('.mobile-nav-shell')); return; }
      var title=e.target.closest('.mobile-nav-title');
      if(title){
        var group=title.closest('.mobile-nav-group');
        if(group){ e.preventDefault(); group.classList.toggle('mobile-nav-open'); }
        return;
      }
      var shell=e.target.closest('.mobile-nav-shell');
      if(shell && e.target===shell){ closeMenu(shell); }
      if(e.target.closest('.mobile-nav-links a,.mobile-quick-actions a,.mobile-start a')){ closeMenu(document.querySelector('.mobile-nav-shell')); }
    },true);
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeMenu(document.querySelector('.mobile-nav-shell')); });
    // Make old bottom mobile nav actually navigable when pages forgot hrefs.
    var depth=(location.pathname.split('/').filter(Boolean).length);
    var localPrefix='';
    if(location.protocol==='file:'){
      var parts=location.pathname.split('/').filter(Boolean);
      var idx=parts.lastIndexOf('index.html');
      var htmlDepth=parts.length - (idx>=0?idx:parts.length-1) - 1;
    }
    function relPrefix(){
      var path=location.pathname;
      var rootFile=/\/[^\/]+\.html$/.test(path);
      var segs=path.split('/').filter(Boolean);
      // Count site subfolders after the downloaded folder by inspecting common section names.
      var known=['apply','business','careers','dashboard','degrees','funding','guides','lead','partners','tools'];
      var first=-1; for(var i=0;i<segs.length;i++){ if(known.indexOf(segs[i])>-1){ first=i; break; } }
      if(first<0) return '';
      var d=segs.length-first-1; // includes html file, so folder depth = d-1
      if(rootFile) d=d-1;
      return d>0 ? '../'.repeat(d) : '';
    }
    var p=relPrefix();
    var targets=[['index.html','Home'],['degrees/index.html','Degree'],['funding/index.html','Funding'],['apply/index.html','Apply'],['dashboard/index.html','Account']];
    document.querySelectorAll('.mnav').forEach(function(nav){
      nav.querySelectorAll('a').forEach(function(a,i){ if(!a.getAttribute('href') && targets[i]) a.setAttribute('href',p+targets[i][0]); });
    });
  });
})();
