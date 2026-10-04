// Deterministic choreography: every pose is derived from the movie time.
export const DURATION=30;
const clamp=x=>Math.max(0,Math.min(1,x));
export const smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
export const phase=(t,a,b)=>smooth((t-a)/(b-a));
export const mix=(a,b,p)=>a+(b-a)*p;
const blend=(a,b,p)=>a.map((v,i)=>mix(v,b[i],p));
export function birthdayPose(t){
 t=Math.max(0,Math.min(DURATION,t));
 const walk=phase(t,0,5),around=phase(t,11.5,13.5);
 const girl=blend([-3.1,0,.22],[-.65,0,.22],walk);
 girl[0]=mix(girl[0],-.32,around);girl[2]=mix(girl[2],.57,around);
 const lean=phase(t,6.8,8.3)*(1-phase(t,10.6,11.6));
 let knife=[-.13,1.095,.74],direction=[1,0,0],grip=0;
 if(t>=14){grip=t>=14.6?1:0;knife=blend(knife,[-.055,1.80,.05],phase(t,14.6,16));}
 // Both radial cuts enter all the way to the cake board, then lift clear.
 if(t>=16&&t<18.4){const down=phase(t,16.1,17.0)*(1-phase(t,17.25,18.25));knife=[-.055,mix(1.80,1.185,down),.05];}
 if(t>=18.4&&t<19.2){const p=phase(t,18.4,19.2);knife=blend([-.055,1.80,.05],[.55,1.80,.67],p);direction=[Math.cos(p*Math.PI/2),0,-Math.sin(p*Math.PI/2)];}
 if(t>=19.2&&t<21.4){const down=phase(t,19.25,20.05)*(1-phase(t,20.3,21.25));knife=[.55,mix(1.80,1.185,down),.67];direction=[0,0,-1];}
 if(t>=21.4&&t<22.3){const p=phase(t,21.4,22.3);knife=blend([.55,1.80,.67],[-.13,1.12,.60],p);direction=blend([0,0,-1],[.8,0,-.6],p);}
 const transfer=phase(t,22.3,24.2),lift=Math.sin(transfer*Math.PI)*.20;
 if(t>=22.3&&t<24.5){knife=[-.13+.10*transfer,1.12-.015*transfer+lift,.60+.61*transfer];direction=[.8,0,-.6];}
 if(t>=24.5){const p=phase(t,24.5,25.5);knife=blend([-.03,1.105,1.21],[-.13,1.095,.74],p);direction=[1,0,0];grip=t<25.5?1:0;}
 const roll=t<16?(Math.PI/2)*(1-phase(t,14.6,16)):t<21.4?0:(Math.PI/2)*phase(t,21.4,22.3);
 const handReach=phase(t,14,14.6)*(1-phase(t,25.5,26.3));
 const farewell=phase(t,26.3,27.8);
 return {t,roll,handReach,girl,gaitPhase:walk*Math.PI*8+around*Math.PI*2,wish:phase(t,5.15,5.8)*(1-phase(t,7.5,8.2)),farewell,yaw:mix(mix(Math.PI/2,2.12,around),.57,farewell),lean:lean*.43,walkWeight:phase(t,0,.45)*(1-phase(t,4.2,5))*(t<5?1:0),stepWeight:phase(t,11.5,11.9)*(1-phase(t,13,13.5)),knife,direction,grip,slice:[.10*transfer,-.015*transfer+lift,.61*transfer],cut1:t>=17,cut2:t>=20.05,flames:[t<9.25,t<9.50,t<9.75],blowing:t>=8.8&&t<10.6,celebrate:phase(t,25.6,27),titleOpacity:1-phase(t,4.5,6)+phase(t,26,28)};
}
