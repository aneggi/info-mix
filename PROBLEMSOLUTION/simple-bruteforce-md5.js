// Copyright 2023 Aneggi Alessandro
// 

var md5 = require('md5');
var counter = 0;
var partialCounter = 0;

String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function nextChar(c, index) {
  return String.fromCharCode(c.charCodeAt(index) + 1);
}

function bruteForce(test, cercata, index) {
  if (index == test.length) {
    if (md5(test).localeCompare(cercata) == 0)
      return test;
    else
      return "N U L L";
  }
  while (test.charAt(index) !== stringArrivo) {
    var tmp = bruteForce(test, cercata, index + 1);
    if (tmp.localeCompare("N U L L") !== 0) {
      return tmp;
    }
    test = test.replaceAt(index, nextChar(test, index));
    counter++; partialCounter++;
    if (partialCounter > 25000) {
      partialCounter = 0
      console.log(counter + " tentativi")
    }
  }
  return "N U L L";
}

// -----------------------------------------------------------
// -----------------------------------------------------------
var maxLength = 10;
var stringaCifrata = md5("ciaon"); //questo cambia
var stringaPartenza = "a"; //maiusole e minuscle
//var stringaPartenza = "A"; //solo lettere MAIUSCOLE
//var stringaPartenza = "0"; //è un valore costante 0 include tutto, a solo lettere maiusole e minuscle
var stringArrivo = '{';
var res;
var start = new Date();

for (i = 1; i <= maxLength; i++) {
  tmp = bruteForce(stringaPartenza, stringaCifrata, 0);
  if (tmp.localeCompare("N U L L") !== 0) {
    res = tmp;
    break;
  }
  stringaPartenza = stringaPartenza + "a";
}
console.log("testo cifrato: " + stringaCifrata);
console.log("testo decifrato: " + res);
console.log("Tempo impiegato in Secondi: " + ((new Date() - start) / 1000));
console.log("Tentativi fatti: " + counter);
var shouldtry = Math.pow(stringArrivo.charCodeAt(0) - stringaPartenza.charCodeAt(0), maxLength);//(stringArrivo-stringaPartenza)*
console.log("Tentativi ipotetici: " + shouldtry);

