import test from 'node:test';import assert from 'node:assert/strict';import {habits,habitResponse} from './app/habits.mjs';
test('every choice has nonempty advice',()=>{for(const [kind,h] of Object.entries(habits)){assert.equal(h.options[0][0],'unknown');for(const [value] of h.options)assert.ok(habitResponse(kind,value)?.length>30)}});
test('unexpected or missing answers stay unknown',()=>{for(const kind of Object.keys(habits)){assert.equal(habitResponse(kind,'bogus'),habitResponse(kind,'unknown'));assert.equal(habitResponse(kind,undefined),habitResponse(kind,'unknown'))}});
test('unknown habit returns no invented result',()=>assert.equal(habitResponse('unexpected','anything'),null));
test('responses carry no score fields',()=>{for(const h of Object.values(habits))assert.deepEqual(Object.keys(h).sort(),['label','options','responses'])});

test('prototype keys never become advice',()=>{assert.equal(habitResponse('__proto__','anything'),null);assert.equal(habitResponse('usb','__proto__'),habitResponse('usb','unknown'))});
