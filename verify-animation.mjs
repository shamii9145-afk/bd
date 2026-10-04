import assert from 'node:assert/strict';
import * as T from './dist/three.module.js';
import {birthdayPose} from './dist/choreography.js';
import {createGirl} from './dist/character.js';
const girl=createGirl(T,new T.Scene());let worstReach=0;
for(let t=0;t<=30;t+=.1){const p=birthdayPose(t);girl.pose(p);const rest=girl.restingHand(p,0);const end=rest.lerp(new T.Vector3(...p.knife),p.handReach);const result=girl.solveArm(0,end,p.grip);worstReach=Math.max(worstReach,result.reachError);assert(result.reachError<.005,`Knife hand cannot reach at ${t}: ${result.reachError}`);assert(p.slice.every(Number.isFinite));if(t<22.3)assert.equal(p.slice[0],0,'Slice moved before both cuts');}
for(const t of[17.0,20.05]){const p=birthdayPose(t);assert(Math.abs(p.knife[1]-1.185)<.001,'Blade did not reach cake board');}
const first=birthdayPose(17);assert.deepEqual(first.direction,[1,0,0]);const second=birthdayPose(20.05);assert.deepEqual(second.direction,[0,0,-1]);assert(second.cut1&&second.cut2);
assert.deepEqual(birthdayPose(10).flames,[false,false,false]);assert.deepEqual(birthdayPose(0).flames,[true,true,true]);
const served=birthdayPose(24.2);assert(Math.abs(1.124+served.slice[1]-1.109)<.001,'Slice floats above its plate');assert(Math.abs(served.roll-Math.PI/2)<.001,'Knife must be flat when serving');assert(Math.abs(served.slice[2]-.61)<.001);
console.log(`Verified 301 poses: hand reach, both knife cuts, candle sequence, slice-to-plate contact. Max reach error: ${worstReach.toFixed(6)}.`);
