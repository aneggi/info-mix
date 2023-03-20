const numDomande = 12
const numDomandePossibili = 15
const domAperte = 3

const destFolder = 'CODICE TUA CARTELLA'
const institute = 'Istituto XXXXX'
const prof = 'Prof. XXXXX'
const year = '2022-23'

const widthCellName = 125;

// ---------
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('VERIFICHE')
      .addItem('Genera', 'myFunction')
      //.addSeparator()
      //.addSubMenu(ui.createMenu('Sub-menu')
      //    .addItem('Second item', 'menuItem2'))
      .addToUi();
}



function myFunction() {
  //----------------setup-------------------------------------------
  let spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  let info = SpreadsheetApp.getActiveRange().getValues();
  let sheet = spreadSheet.getSheetByName(info[0][3]);
  let classe = info[0][0];
  let data = sheet.getRange("A1:F30").getValues();
  let parentFolder = DriveApp.getFolderById(destFolder);
  let verifica = DocumentApp.create(info[0][3]+'_Tests');
  let idverifica = verifica.getId();

  let answer_sheet = DocumentApp.create(info[0][3]+'_Answers');
  let idanswer_sheet = answer_sheet.getId();

  let correction_Sheet = SpreadsheetApp.create(info[0][3]+'_Answers');
  
  let cor_sheet = correction_Sheet.getId();

  let file = DriveApp.getFileById(idverifica);
  parentFolder.addFile(file);
  file = DriveApp.getFileById(idanswer_sheet);
  parentFolder.addFile(file);
  file = DriveApp.getFileById(cor_sheet);
  parentFolder.addFile(file);

  const normalParagraphStyles = {
    [DocumentApp.Attribute.FONT_FAMILY]: "Droid Sans",
    [DocumentApp.Attribute.FONT_SIZE]: 11,
  };

  let body = verifica.getBody();
  const margin = 18;
  body.setMarginBottom(margin);
  body.setMarginLeft(margin);
  body.setMarginTop(margin);
  body.setMarginRight(margin);

  let bodyAs = answer_sheet.getBody();//student
  bodyAs.setMarginBottom(margin);
  bodyAs.setMarginLeft(margin);
  bodyAs.setMarginTop(margin);
  bodyAs.setMarginRight(margin);
  // Turn the page HORZONTAL
  //bodyAs.setPageHeight(595).setPageWidth(842);
  


  //----------------create/correction answer document----------------------------
  let headerCelles = [ [ institute, prof,'VERIFICA ' ],
                        [ "CODICE VERIFICA: " +info[0][3] , 'Classe: ' + classe,'Anno scolastico ' + year ] ];
  let tab_as = bodyAs.appendTable(headerCelles);
  tab_as = bodyAs.appendTable();
  let rowText = tab_as.appendTableRow();
  let cellX = rowText.appendTableCell('STUDENTE');
  cellX.setWidth(widthCellName);
  for(let i=0; i< 12 ; i++) {
    rowText.appendTableCell((i+1));
  }

  correction_Sheet.appendRow([ institute + ' - '+ prof +' - VERIFICA CODICE: ' + info[0][3] + ' - Classe: ' + classe +' - Anno scolastico ' + year ]);
  correction_Sheet.appendRow([ 'Studente' , 'Tipo', '1','2' ,'3', '4','5','6','7','8','9','10', 'Risp Esatte' , 'Punti Risp. Multipla ' , '13','14' , '15' , 'Totale punti' , 'Voto']);



  //----------------------generation------------------------------------
  let j = 0;
  let student = info[0][4];
  do{
    //do do do 
    createTest(correction_Sheet,data,body,tab_as,student,classe,info[0][1]);
    
    Logger.log(student);
    j++;
    student = info[0][4+j];
    
  }while( student != '' && j<30 );

}
// DATA -> question data | BODY-> Body of question document | TAB_AS -> table answer in answer document | 
function createTest(correction,data,body,tab_as,student,classe,materia) {

  
  let headerCelles = [ [ institute, prof,'Studente: ' + student],
                        [ "DATA: ___/___/______", 'Verifica di ' +  materia + ' ' + classe,'Anno scolastico ' +year ] ];
  let tab_header = body.appendTable(headerCelles);
  body.appendParagraph('La valutazione viene data in base alla griglia di valutazione presentata agli studenti. NON COMPILARE NULLA NELLA TABELLA SOTTOSTANTE');
  headerCelles = [ [ 'RISP.MULTIPLE', 'DOM. 13','DOM 14','DOM 15', 'TOT','VOTO'],
                        [ '', '','', '','',''] ];
  tab_header = body.appendTable(headerCelles);

  headerCelles = [ ['DOM.', '1', '2','3', '4','5','6','7','8','9','10','11','12'],
                   [ 'RISP.','' , '', '' , '',  '','',  '' , '','',  '','',''] ];
  let tab_risp = body.appendTable(headerCelles);

  let selQue;
  let questionSelected = [];
  let answerOrder = [1,2,3,4];
  let answerName = ['A','B','C','D'];
  let correctAnswers = [];
  let questionNumber = 1;

  let tab_domape = body.appendTable();
  while(questionSelected.length <= (numDomande-1)) {
    selQue = randomInteger(1,numDomandePossibili);
    if(!questionSelected.includes(selQue)){
      questionSelected.push(selQue);
      let tab_row = tab_domape.appendTableRow();
      shuffle(answerOrder);
      let rowText = 'DOMANDA ' + (questionNumber)  +' (0,6 punti): ' + data[(selQue+1)][0] + '\n' +
                    'A) ' + data[selQue+1][answerOrder[0]] + '\n'+
                    'B) ' + data[selQue+1][answerOrder[1]]+ '\n'+
                    'C) ' + data[selQue+1][answerOrder[2]]+ '\n'+
                    'D) ' + data[selQue+1][answerOrder[3]];
      tab_row.appendTableCell( rowText);
      let correctAnswerIndex = answerOrder.indexOf(1);
      correctAnswers.push(answerName[correctAnswerIndex]);
      Logger.log('Answer order:' + answerOrder)
      questionNumber++;
    }
    else {
      Logger.log('Domanda gia pescata:' + selQue);
    }
  }
  Logger.log(questionSelected);
  Logger.log(correctAnswers);

  body.appendParagraph('Domande aperte, in caso lo spazio bianco non sia sufficiente scrivere su un foglio bianco il proprio nome e cognome, data, indicare il numero della domanda seguita dalla risposta. Si possono fare schemi o qualsiasi cosa si desideri per rappresentare la risposta.');
  let tab_domape1 = body.appendTable();
  tab_row = tab_domape1.appendTableRow();
  tab_row.appendTableCell('Domanda 13 (1 punto, max 7 righe): ' + data[23][randomInteger(1,2)]);
  tab_row = tab_domape1.appendTableRow();
  tab_row.appendTableCell('Domanda 14 (1 punto, max 7 righe): ' + data[24][randomInteger(1,2)]);
  tab_row = tab_domape1.appendTableRow();
  tab_row.appendTableCell('Domanda 15 (1 punto, max 7 righe): ' + data[25][randomInteger(1,2)]);

  //let rowText = tab_as.appendTableRow();
  let rowAnswer = tab_as.appendTableRow();
  //rowText.appendTableCell('STUDENTE');
  cellX = rowAnswer.appendTableCell(student);
  cellX.setWidth(widthCellName);
  for(let i=0; i< questionSelected.length ; i++) {
    //rowText.appendTableCell((i+1));
    rowAnswer.appendTableCell(correctAnswers[i]);
  }

  correctAnswers.unshift('CORR.');
  correctAnswers.unshift(student)
  correction.appendRow(correctAnswers);
  correction.appendRow([student,'DATA']);
  correction.appendRow(['','']);
  correction.appendRow(['']);// riga vuota per spaziamento
  body.appendPageBreak();
}




//----------------------------------------------------------------------------------------------------------------------------
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
