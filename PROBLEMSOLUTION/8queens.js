// ----------------------------------------------------
// MIX approach as HILL CLIMBING 
// Aneggi ALessandro © Copyright 2023
// ----------------------------------------------------

const dimension = 45

let scacchiera = []

for (let i = 0; i < dimension; i++) {
  scacchiera[i] = []
  for (let j = 0; j < dimension; j++) {
    scacchiera[i][j] = 0;
  }
}

let placed = 0
while (placed < dimension) {
  let x = Math.floor(Math.random() * dimension); //fra 0 e 9
  let y = Math.floor(Math.random() * dimension); //fra 0 e 9
  if (scacchiera[x][y] != 1) {
    scacchiera[x][y] = 1
    placed++
  }
}


for (let i = 0; i < scacchiera.length; i++) {
  console.log(scacchiera[i])
}

let f,ft = 100;
let tryCount = 0
let tryMax = 5000
while(ft>0 && tryMax>tryCount) {
  f = fitness(scacchiera)
  let tempScac = mutationRandom(scacchiera)
  ft = fitness(tempScac)
  console.log("(" + tryCount+ ")Fitness (original/mutated): " + f + "/" + ft)
  if (ft < f)
    scacchiera = tempScac
  tryCount++
}
if(tryMax>tryCount)
  console.log("Soluzione trovata in " + tryCount +  " tentativi")
else 
  console.log("Soluzione NON trovata in " + tryCount +  " tentativi")
for (let i = 0; i < scacchiera.length; i++) {
  console.log(scacchiera[i])
}


//cambio


function mutationRandom(scac_original) {
  let scac = JSON.parse( JSON.stringify(scac_original) )
  // Trovo una regina e la tolgo
  let x = Math.floor(Math.random() * dimension); //fra 0 e 9
  let y = Math.floor(Math.random() * dimension); //fra 0 e 9
  while (scac[x][y] == 0) {
    x = Math.floor(Math.random() * dimension); //fra 0 e 9
    y = Math.floor(Math.random() * dimension); //fra 0 e 9
  }
  scac[x][y] = 0
  // Trovo uno spazio vuoto e metto una regina
  x = Math.floor(Math.random() * dimension); //fra 0 e 9
  y = Math.floor(Math.random() * dimension); //fra 0 e 9
  while (scac[x][y] == 1) {
    x = Math.floor(Math.random() * dimension); //fra 0 e 9
    y = Math.floor(Math.random() * dimension); //fra 0 e 9
  }
  scac[x][y] = 1
  return scac
}


function fitness(scac) {
  let fit = 0
  for (let x = 0; x < dimension; x++) {
    for (let y = 0; y < dimension; y++) {
      if (scac[x][y] == 1) {
        //vertical
        for (let f = 0; f < dimension; f++)
          if (scac[f][y] == 1 && f != x)
            fit++
        // Orizzontal
        for (let f = 0; f < dimension; f++)
          if (scac[x][f] == 1 && f != y)
            fit++

        //diagonal 
        for(let mov=1; mov<dimension;mov++){
          if((x+mov)<dimension && (y+mov)<dimension )
            if(scac[(x+mov)][(y+mov)] == 1)
              fit++
          if((x-mov)>=0 && (y-mov)>=0 )
            if(scac[(x-mov)][(y-mov)] == 1)
              fit++
          if((x+mov)<dimension && (y-mov)>=0 )
            if(scac[(x+mov)][(y-mov)] == 1)
              fit++
          if((x-mov)>=0 && (y-mov)<dimension )
            if(scac[(x-mov)][(y+mov)] == 1)
              fit++
          
        }
        
      }
    }
  }
  return fit
}
