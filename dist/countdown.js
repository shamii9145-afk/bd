import {countdownAt} from './release.js';
let opening=false,timer;
async function update(){
 const state=countdownAt(Date.now());
 if(state.unlocked){if(opening)return;opening=true;clearInterval(timer);document.querySelector('#countdown-note').textContent='Your birthday surprise is opening...';
 const template=document.querySelector('#birthday-content');document.body.append(template.content.cloneNode(true));document.querySelector('#countdown').remove();template.remove();
 try{await import('./app.js');}catch(error){document.querySelector('#loading').hidden=true;document.querySelector('#error').hidden=false;console.error(error);}return;}
 for(const key of ['days','hours','minutes','seconds'])document.getElementById(key).textContent=String(state[key]).padStart(2,'0');
}
timer=setInterval(update,250);update();document.addEventListener('visibilitychange',()=>{if(!document.hidden)update();});
