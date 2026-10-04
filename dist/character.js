export function createGirl(T,scene){
 const skin=new T.MeshPhysicalMaterial({color:0xf2bfaa,roughness:.58,sheen:.2,sheenColor:0xffd1bc});
 const hair=new T.MeshStandardMaterial({color:0x30202a,roughness:.7});
 const dress=new T.MeshPhysicalMaterial({color:0xd487ad,roughness:.5,sheen:.65,sheenColor:0xeccfff});
 const satin=new T.MeshStandardMaterial({color:0xf2ccdf,roughness:.35});
 const gold=new T.MeshStandardMaterial({color:0xf8cc85,metalness:.55,roughness:.3});
 const white=new T.MeshStandardMaterial({color:0xfffbf4,roughness:.4});
 const iris=new T.MeshStandardMaterial({color:0x794530,roughness:.25});
 const pupil=new T.MeshStandardMaterial({color:0x251821,roughness:.25});
 const lip=new T.MeshStandardMaterial({color:0xc66c80,roughness:.6});
 const cheek=new T.MeshStandardMaterial({color:0xe99ba4,roughness:.9});
 function group(parent,p=[0,0,0]){const g=new T.Group();g.position.set(...p);parent.add(g);return g;}
 function mesh(g,m,parent,p=[0,0,0],s){const o=new T.Mesh(g,m);o.position.set(...p);if(s)o.scale.set(...s);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
 const sphere=(parent,r,m,p,s)=>mesh(new T.SphereGeometry(r,24,16),m,parent,p,s);
 function tube(parent,points,r,m){return mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p))),20,r,8,false),m,parent);}
 function lathe(parent,points,m,p){return mesh(new T.LatheGeometry(points.map(p=>new T.Vector2(...p)),48),m,parent,p);}
 const girl=group(scene),hips=group(girl,[0,1,0]),torso=group(hips);
 // Tailored silhouette, instead of overlapping primitive body shapes.
 const bodice=lathe(torso,[[0,0],[.16,0],[.17,.10],[.15,.24],[.20,.43],[.235,.52],[.16,.59],[.07,.61],[0,.61]],dress,[0,.16,0]);bodice.scale.z=.72;
 const skirtGeo=new T.LatheGeometry([[.14,.22],[.19,.14],[.23,0],[.28,-.18],[.35,-.40]].reverse().map(p=>new T.Vector2(...p)),64);
 const pos=skirtGeo.attributes.position;for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i),y=pos.getY(i),a=Math.atan2(z,x),fold=1+.022*Math.cos(a*12)*Math.max(0,1-y/.22);pos.setXYZ(i,x*fold,y,z*fold*.88);}skirtGeo.computeVertexNormals();const skirt=mesh(skirtGeo,dress,hips,[0,.06,0]);
 const hem=mesh(new T.TorusGeometry(.348,.012,6,64),satin,hips,[0,-.34,0]);hem.rotation.x=Math.PI/2;hem.scale.y=.88;
 const belt=lathe(torso,[[.163,.0],[.164,.055]],satin,[0,.28,0]);belt.scale.z=.73;
 sphere(torso,.042,gold,[0,.305,.128],[.8,1,.35]);
 mesh(new T.CylinderGeometry(.065,.075,.17,16),skin,torso,[0,.85,0]);
 const head=group(torso,[0,1.19,0]);
 // One continuous face, with a soft jaw, cheeks and forehead.
 const faceGeo=new T.SphereGeometry(1,40,28);const a=faceGeo.attributes.position;
 for(let i=0;i<a.count;i++){const x=a.getX(i),y=a.getY(i),z=a.getZ(i);const jaw=y<-.15?1-.22*Math.min(1,(-y-.15)/.8):1;const cheeks=1+.04*Math.exp(-(((y+.10)/.3)**2));a.setXYZ(i,x*.305*jaw*cheeks,y*.345,z*.277+(z>0&&y<.1?.015:0));}faceGeo.computeVertexNormals();mesh(faceGeo,skin,head);
 sphere(head,.06,skin,[-.30,-.045,-.015],[.65,1,.55]);sphere(head,.06,skin,[.30,-.045,-.015],[.65,1,.55]);
 const eyes=[];
 for(const side of[-1,1]){
   const eye=group(head,[side*.112,.029,.247]);eye.rotation.y=side*.22;eye.rotation.z=side*-.06;
   const closed=group(head,[side*.112,.029,.248]);closed.rotation.copy(eye.rotation);tube(closed,[[-.069,0,.006],[-.035,-.013,.011],[0,-.018,.013],[.035,-.011,.009],[.069,.003,.002]],.005,hair);closed.visible=false;eyes.push({eye,closed});
   sphere(eye,.061,white,[0,0,0],[1.20,.81,.36]);sphere(eye,.040,iris,[side*-.005,-.002,.024],[.82,.98,.27]);sphere(eye,.025,pupil,[side*-.004,-.002,.033],[.75,1,.25]);sphere(eye,.012,white,[-.010,.013,.040],[.7,.7,.25]);sphere(eye,.005,white,[.014,-.012,.041]);
   tube(eye,[[-.073,-.001,.006],[-.047,.041,.010],[0,.049,.009],[.047,.034,.004],[.069,.001,0]],.006,hair);
   for(let j=0;j<3;j++){const x=side*(.047+j*.008);tube(eye,[[x,.032-j*.008,.008],[x+side*.016,.044-j*.005,.004]],.003,hair);}
   tube(head,[[side*.054,.121,.247],[side*.105,.137,.249],[side*.167,.113,.218]],.011,hair);
   sphere(head,.058,cheek,[side*.173,-.078,.219],[1,.43,.08]);sphere(head,.018,gold,[side*.307,-.105,.001],[.6,1,.6]);
 }
 sphere(head,.025,skin,[0,-.031,.283],[.72,1.1,.85]);
 const smiling=group(head,[0,-.119,.260]);tube(smiling,[[-.047,.008,0],[-.026,-.013,.01],[0,-.020,.014],[.026,-.013,.01],[.047,.008,0]],.008,lip);
 const blowing=group(head,[0,-.12,.266]);mesh(new T.TorusGeometry(.017,.005,6,20),lip,blowing);blowing.visible=false;
 // Smooth hair cap, sculpted swoop and long curved locks.
 const cap=mesh(new T.SphereGeometry(.318,40,24,0,Math.PI*2,0,Math.PI*.49),hair,head,[0,.022,-.034],[1.05,1.12,.94]);
 const backGeometry=new T.SphereGeometry(.318,64,40,Math.PI/2+.8,Math.PI*2-1.6,Math.PI*.42,Math.PI*.55);
 const backPos=backGeometry.attributes.position;for(let i=0;i<backPos.count;i++){const y=backPos.getY(i);if(y<0){backPos.setY(i,y*1.65);backPos.setZ(i,backPos.getZ(i)-Math.abs(y)*.17);}}backGeometry.computeVertexNormals();mesh(backGeometry,hair,head,[0,.020,-.035],[1.04,1.1,.94]);
 const locks=group(head);
 function taperedLock(points,r){const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));const geo=new T.TubeGeometry(curve,28,r,10,false);const v=geo.attributes.position;for(let ring=0;ring<=28;ring++){const u=ring/28,c=curve.getPointAt(u),taper=Math.max(.04,1-Math.pow(u,3.5));for(let j=0;j<=10;j++){const i=ring*11+j;v.setXYZ(i,c.x+(v.getX(i)-c.x)*taper,c.y+(v.getY(i)-c.y)*taper,c.z+(v.getZ(i)-c.z)*taper);}}geo.computeVertexNormals();return mesh(geo,hair,locks);}
 for(const side of[-1,1])taperedLock([[side*.18,.18,-.065],[side*.278,.02,-.05],[side*.285,-.19,-.025],[side*.29,-.39,-.06],[side*.22,-.56,-.025]],.052);
 tube(head,[[-.24,.13,.13],[-.19,.235,.20],[-.03,.27,.22],[.12,.225,.205],[.23,.155,.145]],.047,hair);
 tube(head,[[-.20,.205,.17],[-.08,.296,.17],[.09,.268,.19],[.225,.18,.13]],.030,hair);
 const ribbon=group(head,[.26,.19,.075]);sphere(ribbon,.06,satin,[-.04,0,0],[1,.65,.4]);sphere(ribbon,.06,satin,[.04,0,0],[1,.65,.4]);sphere(ribbon,.020,gold,[0,0,.019]);
 // Connected knee joints and planted soles.
 // Delicate pearl neckline and a small satin waist bow.
 for(let i=0;i<9;i++){const a=-1.1+i/8*2.2;sphere(torso,.013,white,[Math.sin(a)*.117,.726-Math.cos(a)*.065,Math.cos(a)*.105]);}
 for(const side of[-1,1]){const loop=sphere(torso,.066,satin,[side*.058,.305,.139],[1,.57,.3]);loop.rotation.z=side*.32;}
 for(let i=0;i<24;i++){const a=i/24*Math.PI*2;sphere(hips,.010,white,[Math.cos(a)*.348,-.325,Math.sin(a)*.306]);}
 const legs=[];for(const side of[-1,1]){const thighPivot=group(hips,[side*.105,-.05,0]);sphere(thighPivot,.071,skin,[0,-.215,0],[1,3,1]);const knee=group(thighPivot,[0,-.43,0]);sphere(knee,.067,skin,[0,0,0]);sphere(knee,.058,skin,[0,-.19,.008],[1,3.4,1]);const foot=group(knee,[0,-.43,.055]);sphere(foot,.10,dress,[0,0,.024],[.75,.46,1.55]);sphere(foot,.072,skin,[0,.034,-.014],[.75,.5,1]);const strap=mesh(new T.TorusGeometry(.063,.009,5,20),satin,foot,[0,.03,-.025]);strap.rotation.x=Math.PI/2;legs.push({thighPivot,knee,foot,side});}
 const arms=[];for(const side of[-1,1]){sphere(torso,.095,dress,[side*.235,.65,0],[1,.92,.82]);const upper=mesh(new T.CylinderGeometry(.058,.048,1,14),skin,scene),lower=mesh(new T.CylinderGeometry(.048,.034,1,14),skin,scene),elbow=sphere(scene,.048,skin,[0,0,0]),wrist=sphere(scene,.034,skin,[0,0,0]);const hand=group(scene);sphere(hand,.064,skin,[0,-.020,0],[.91,1,.48]);const fingers=[];for(let i=0;i<4;i++){const f=group(hand,[(i-1.5)*.027,-.065,0]);const length=[.051,.064,.059,.045][i];sphere(f,.016,skin,[0,-length*.45,0],[.90,length/.032,.86]);sphere(f,.015,skin,[0,-length*.90,.002],[.88,1,.85]);fingers.push(f);}const thumb=sphere(hand,.023,skin,[side*.065,-.028,.008],[.80,1.6,.8]);thumb.rotation.z=-side*.65;arms.push({side,upper,lower,elbow,wrist,hand,fingers});}
 const up=new T.Vector3(0,1,0),L=.44,M=.43;
 function rod(o,p,q){o.position.copy(p).add(q).multiplyScalar(.5);o.scale.y=p.distanceTo(q);o.quaternion.setFromUnitVectors(up,q.clone().sub(p).normalize());}
 function solveArm(index,target,gripping=0,knifeRotation=null){const arm=arms[index];const shoulder=torso.localToWorld(new T.Vector3(arm.side*.25,.64,0));const delta=target.clone().sub(shoulder),distance=delta.length();const d=delta.normalize(),length=Math.min(distance,L+M-.001);const along=(L*L-M*M+length*length)/(2*length),height=Math.sqrt(Math.max(0,L*L-along*along));const pole=new T.Vector3(0,-1,.12).addScaledVector(d,-new T.Vector3(0,-1,.12).dot(d)).normalize();const elbow=shoulder.clone().addScaledVector(d,along).addScaledVector(pole,height);const end=shoulder.clone().addScaledVector(d,length);rod(arm.upper,shoulder,elbow);rod(arm.lower,elbow,end);arm.elbow.position.copy(elbow);arm.wrist.position.copy(end);arm.hand.position.copy(end);if(knifeRotation)arm.hand.quaternion.copy(knifeRotation);else {arm.hand.quaternion.copy(arm.lower.quaternion);arm.hand.rotateZ(Math.PI);}arm.fingers.forEach((f,i)=>{f.position.y=-.065+gripping*.033;f.position.z=gripping*.020;f.rotation.x=-gripping*1.65;f.rotation.z=(i-1.5)*.065*(1-gripping);});return {position:end,reachError:Math.max(0,distance-length)};}
 function pose(p){girl.position.set(...p.girl);girl.rotation.y=p.yaw;const gait=p.walkWeight+p.stepWeight;hips.position.y=.956+Math.sin(p.gaitPhase*2)**2*.014*gait;torso.rotation.x=p.lean;head.rotation.x=-p.lean*.1;head.rotation.z=p.farewell*Math.sin(p.t*2)*.05;head.rotation.y=p.farewell*.05;locks.rotation.x=Math.sin(p.gaitPhase)*.025*gait;skirt.rotation.z=Math.sin(p.t*4)*.018*gait;legs.forEach((l,i)=>{const s=Math.sin(p.gaitPhase+i*Math.PI);l.thighPivot.rotation.x=s*.35*gait;l.knee.rotation.x=Math.max(0,-s)*.48*gait;l.foot.rotation.x=-l.knee.rotation.x*.25;});let blink=p.wish*.98;for(const time of[2.4,11.8,18.5,26.1,28.5])blink=Math.max(blink,Math.max(0,1-Math.abs(p.t-time)/.13));if(p.blowing)blink=Math.max(blink,.86);eyes.forEach(({eye,closed})=>{eye.scale.y=Math.max(.04,1-blink);eye.visible=blink<.80;closed.visible=blink>=.80;});
 smiling.visible=!p.blowing;blowing.visible=p.blowing;girl.updateWorldMatrix(true,true);}
 function restingHand(p,index){const side=arms[index].side,swing=Math.sin(p.gaitPhase+(index?Math.PI:0))*.14*(p.walkWeight+p.stepWeight);const hand=torso.localToWorld(new T.Vector3(side*.275,-.14,.045+swing));const wish=torso.localToWorld(new T.Vector3(side*.035,.46,.31));hand.lerp(wish,p.wish);hand.lerp(new T.Vector3(index===0?0:-.04,1.12,index===0?.36:-.15),Math.min(1,p.lean/.43));return hand;}
 return {girl,torso,head,arms,pose,solveArm,restingHand,shoulder:index=>torso.localToWorld(new T.Vector3(arms[index].side*.25,.64,0)),mouth:()=>head.localToWorld(new T.Vector3(0,-.12,.29))};
}
