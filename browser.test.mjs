import test from 'node:test';
import assert from 'node:assert/strict';
import {readBrowser} from './app/browser.mjs';
const make=(extra={})=>({nav:{languages:['en-GB','en'],language:'en-GB'},screen:{width:390,height:844},ratio:()=>3,timeZone:()=>'Etc/UTC',...extra});
test('reads reported values without changing or fingerprinting them',()=>assert.deepEqual(readBrowser(make()),{languages:['en-GB','en'],width:390,height:844,pixelRatio:3,timeZone:'Etc/UTC'}));
test('falls back to single language when list is absent',()=>assert.deepEqual(readBrowser(make({nav:{language:'fr'}})).languages,['fr']));
test('missing and invalid readings stay unknown',()=>assert.deepEqual(readBrowser(make({nav:{},screen:{width:0,height:-1},ratio:()=>NaN,timeZone:()=>''})),{languages:[],width:null,height:null,pixelRatio:null,timeZone:null}));
test('denied getters fail independently',()=>{const nav={get languages(){throw Error('denied')},language:'en'};const result=readBrowser(make({nav,ratio:()=>{throw Error('denied')},timeZone:()=>{throw Error('denied')}}));assert.equal(result.pixelRatio,null);assert.equal(result.timeZone,null);assert.equal(result.width,390);assert.deepEqual(result.languages,['en'])});
test('limits unusually long text and language lists',()=>{const result=readBrowser(make({nav:{languages:Array(40).fill('x'.repeat(500))}}));assert.equal(result.languages.length,12);assert.equal(result.languages[0].length,160)});
