import hello from 'hello';
import world from 'world';
var a = undefined;
var b = a;
var c = a;
var d = hello;
var e = world;
export {
    e as baz,
    d as bar
};