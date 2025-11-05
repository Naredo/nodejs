import {suma,resta,multiplicacion as mult,division} from './operaciones.js'
import * as op from  './operaciones.js'
import './menu.js'
import json from "./foo.json" with { type: "json" };
console.log(json)

console.log(suma(5,3)) //8
console.log(resta(5,3)) //2
console.log(mult(5,3)) //15
console.log(division(6,3)) //2

console.log(op.suma(4,4)) //8

//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/import
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
