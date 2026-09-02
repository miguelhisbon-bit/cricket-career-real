// threeScene.js - initializes three.js scene with fallback and visibility handling
import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';
let scene, camera, renderer, playerMesh, container, _animId=null;
export default {
  async init(){
    try{
      container = document.getElementById('three-container');
      renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
      renderer.setSize(container.clientWidth, container.clientHeight);renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, container.clientWidth/container.clientHeight,0.1,1000);
      camera.position.set(0,1.6,3);
      const light = new THREE.DirectionalLight(0xffffff,1);light.position.set(5,10,7);scene.add(light);
      const amb = new THREE.AmbientLight(0xffffff,0.3);scene.add(amb);
      // stadium floor
      const g = new THREE.PlaneGeometry(20,20);const m=new THREE.MeshStandardMaterial({color:0x0b2a18});const floor=new THREE.Mesh(g,m);floor.rotation.x=-Math.PI/2;floor.position.y=0;scene.add(floor);
      // player - fallback simple model
      try{
        playerMesh = new THREE.Group();
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.6,1.6,0.4), new THREE.MeshStandardMaterial({color:0xf2d6b3}));body.position.y=0.8;playerMesh.add(body);
        const bat = new THREE.Mesh(new THREE.BoxGeometry(0.1,1.1,0.03), new THREE.MeshStandardMaterial({color:0x8b5a2b}));bat.position.set(0.5,0.2,0);bat.rotation.z=-0.4;playerMesh.add(bat);
        scene.add(playerMesh);
      }catch(e){ console.warn('3D player failed, using fallback',e); }
      window.addEventListener('resize',this.onResize.bind(this));
      document.addEventListener('visibilitychange', ()=>{
        if(document.hidden) this._pause(); else this._resume();
      });
      this.animate();
    }catch(e){
      console.error('Three init failed',e);
      const c = document.getElementById('three-container'); c.innerHTML = '<div style="padding:20px;color:#9fb8c9">3D not available — using 2D preview</div>';
    }
  },
  onResize(){ if(!renderer || !camera || !container) return; const w=container.clientWidth,h=container.clientHeight; renderer.setSize(w,h); camera.aspect=w/h; camera.updateProjectionMatrix(); },
  animate(){
    _animId = requestAnimationFrame(()=>this.animate());
    if(playerMesh) playerMesh.rotation.y += 0.005;
    if(renderer && scene && camera) renderer.render(scene,camera);
  },
  _pause(){ if(_animId) cancelAnimationFrame(_animId); _animId = null; },
  _resume(){ if(!_animId) this.animate(); },
  updateAppearance(opts={}){
    try{ if(playerMesh){ if(playerMesh.children[0] && playerMesh.children[0].material){ playerMesh.children[0].material.color.set(opts.skin || 0xf2d6b3); } if(playerMesh.children[1] && playerMesh.children[1].material){ playerMesh.children[1].material.color.set(opts.bat || 0x8b5a2b); } } }catch(e){console.warn('appearance update failed',e)}
  }
}
