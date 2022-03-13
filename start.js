const fs = require('fs');
const pdf = require('pdf-parse');

//ICI les variables que tu peux modifier
let nomDuPDF = fs.readFileSync('Article.pdf');

const nomDeFichierEnSortie = 'test';

const nombreElement = 20;

const banWord = ['des','les','dans','par','sur','une','est','pour'];


//TOUCHE PAS A CA PTI CON

pdf(nomDuPDF).then(function(data) {
    let texte = ''

    texte = data.text;

    const splitText = texte.split(' ');
    const morethan5 = [];
    splitText.forEach((element)=>{
        if (element.length>2){
            morethan5.push(element);
        }
    });

    const allWord = [];

    for (let i =0;i<morethan5.length;i++){
        let count = 0;
        for (let j =0;j<morethan5.length;j++){
            if (morethan5[i] === morethan5[j] ){
                count++;
            }
        }
        allWord.push({mot:morethan5[i], count: count})
    }

    const orderKeyWord = allWord.sort((a, b) => {
        return b.count - a.count;
    });

    filterKeyWord(orderKeyWord);

});


function filterKeyWord(keyWord){
    let keyWordFilter = [];

    keyWord.forEach((element)=>{
        let present = false
        for (let i =0;i<keyWordFilter.length;i++){
            if (keyWordFilter[i].mot === element.mot){
                present = true;
            }
        }
        if (!present){
            keyWordFilter.push(element)
        }
    });

    const writter = fs.createWriteStream(`${nomDeFichierEnSortie}.txt`);

    let key = 0;
    keyWordFilter.forEach((element)=>{
        let isBan = false;
        banWord.forEach((element2)=>{
            if (element2 === element.mot){
                isBan = true;
            }
        });
        if (key<nombreElement && !isBan){
            key++;
            writter.write(`mot : ${element.mot} , occurence : ${element.count} \n`);
        }
    });
    console.log('Finis !');
}