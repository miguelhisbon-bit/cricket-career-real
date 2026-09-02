// router.js - improved SPA router with safer history handling
export default {
  init(){
    document.querySelectorAll('.bottom-nav button').forEach(btn=>{
      btn.addEventListener('click',()=>this.go(btn.dataset.route));
    });
    window.addEventListener('popstate', ()=> this.restore());
    const initial = location.hash.replace('#','')||'home';
    this.go(initial,{push:false});
  },
  go(route, opts={push:true}){
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    const el = document.getElementById('screen-'+route);
    if(el) el.classList.add('active');
    document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.toggle('active', b.dataset.route===route));
    try{
      if(opts.push) history.pushState({route},'',`#${route}`);
      else history.replaceState({route},'',`#${route}`);
    }catch(e){console.warn('History API failed',e)}
  },
  restore(){
    const r = location.hash.replace('#','')||'home';
    this.go(r,{push:false});
  }
}
