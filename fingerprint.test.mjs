import test from 'node:test';import assert from 'node:assert/strict';import {webcrypto} from 'node:crypto';
import {digestBytes,canvasSample,audioSample} from './app/fingerprint.mjs';
test('uses standard SHA256 bytes',async()=>assert.equal(await digestBytes(new Uint8Array(),webcrypto.subtle),'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'));
test('missing canvas read access is unavailable',async()=>assert.equal((await canvasSample({createElement:()=>({getContext:()=>null})},webcrypto.subtle)).status,'unavailable'));
test('blocked pixel reads do not break the page',async()=>assert.equal((await canvasSample({createElement:()=>{throw Error('blocked')}},webcrypto.subtle)).status,'unavailable'));
test('unsupported offline audio is unavailable',async()=>assert.equal((await audioSample(null,webcrypto.subtle)).status,'unavailable'));
test('a stuck offline renderer is bounded',async()=>{class Stuck{createOscillator(){return {frequency:{},connect(){},start(){},stop(){},disconnect(){}}}createDynamicsCompressor(){return {threshold:{},knee:{},ratio:{},attack:{},release:{},connect(){},disconnect(){}}}startRendering(){return new Promise(()=>{})}}assert.equal((await audioSample(Stuck,webcrypto.subtle,{timeoutMs:10})).status,'unavailable')});
