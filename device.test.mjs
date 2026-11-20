import test from 'node:test';
import assert from 'node:assert/strict';
import {readDevice,readGraphics} from './app/device.mjs';
test('device reports settings without guessing browser or OS',()=>{const x=readDevice({userAgent:'test agent',platform:'test platform',hardwareConcurrency:4,deviceMemory:8,maxTouchPoints:0});assert.deepEqual(x,{userAgent:'test agent',platform:'test platform',logicalProcessors:4,memoryGiB:8,touchPoints:0})});
test('missing device fields stay null',()=>assert.equal(readDevice({}).logicalProcessors,null));
test('restricted UA does not break other reads',()=>{const x=readDevice({get userAgent(){throw Error('blocked')},hardwareConcurrency:2});assert.equal(x.userAgent,null);assert.equal(x.logicalProcessors,2)});
test('no WebGL is unavailable rather than safe',()=>assert.equal(readGraphics({createElement:()=>({getContext:()=>null})}).status,'unavailable'));
test('missing debug extension is limited',()=>assert.equal(readGraphics({createElement:()=>({getContext:()=>({getExtension:()=>null})})}).status,'limited'));
