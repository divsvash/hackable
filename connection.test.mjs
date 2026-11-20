import test from 'node:test';import assert from 'node:assert/strict';import {readConnection} from './app/connection.mjs';
test('zero is a valid rounded network estimate',()=>{const x=readConnection({connection:{rtt:0,downlink:0,effectiveType:'4g'}},{protocol:'https:'},true);assert.equal(x.rtt,0);assert.equal(x.downlink,0);assert.equal(x.type,null)});
test('unsupported API stays unknown',()=>assert.equal(readConnection({},{protocol:'http:'},true).supported,false));
test('secure localhost does not become HTTPS',()=>assert.equal(readConnection({},{protocol:'http:'},true).protocol,'http:'));
test('bad estimates and denied fields stay unknown',()=>{const x=readConnection({connection:{rtt:NaN,downlink:-1,get type(){throw Error('blocked')}}},{protocol:'https:'},true);assert.equal(x.rtt,null);assert.equal(x.downlink,null);assert.equal(x.type,null)});
