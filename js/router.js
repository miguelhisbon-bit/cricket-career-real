// router.js - simple SPA router
export default {
  init(){
    document.querySelectorAll('.bottom-nav button').forEach(btn=>{
      btn.addEventListener('click',()=>this.go(btn.dataset.route));
    });
    window.addEventListener('popstate', ()=> this.restore());
    this.go('home');
  },
  go(route){
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    const el = document.getElementById('screen-'+route);
    if(el) el.classList.add('active');
    document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.toggle('active', b.dataset.route===route));
    history.pushState({route},'',`#${route}`);
  },
  restore(){
    const r = location.hash.replace('#','')||'home';
    this.go(r);
  }
}
