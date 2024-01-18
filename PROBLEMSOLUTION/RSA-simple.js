// Copyright 2023 Aneggi Alessandro
// https://ladigitale.dev/digisteps/#/s/63df6b2562c75

// Numeri primi scelti
let p = 3
let q = 11

let  n = p*q
console.log("N=" + n)
let z = (p-1)*(q-1)
console.log("Z=" + z)

// Trova un numero 'e' tale che 'e' sia minore di z e sia primo con z
let e = 3

//Trova un numero d tale che la quantità d*e -1 sia multiplo di z
let d = 7

let PublicKEY = [n,e]
let PrivateKey = [n,d]

let lettera = "a"
console.log("Lettera scelta: " + lettera)
let inChiaro = 31//lettera.charCodeAt(0)
console.log("Codice in chiaro: " + inChiaro)
let criptato = coding(inChiaro)
console.log("Codice criptato:" + criptato)
console.log("--------")
let decripted = decode(criptato)
console.log("Codice decriptato:" + decripted)
console.log("Lettera decriptata:" + String.fromCharCode(decripted))


function coding(number) {
  
  let me = number**e
  const men = Math.floor(me/n);
  const menn = men*n
  return me-menn
}

function decode(c) {
  let cd = c**d
  let intcdn = Math.floor(cd/n);
  const remainder = cd % n;
  //console.log("Code rem. " + remainder)
  return remainder
}
