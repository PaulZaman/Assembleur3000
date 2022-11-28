var dataANDcode = ["#DATA", "A 10", "B 15", "RES 0", "!NEXT ON S4EN TAPE", "#CODE", "LDA TO A", "LDA T1 B", "ADD T0 T1", "STR RES TO", "HLT"];


//Split code array into data and code arrays
function split(dataANDcode){
    var data = [];
    var code = [];
    var i = 0;
    while (dataANDcode[i] != "!NEXT ON S4EN TAPE"){
        data.push(dataANDcode[i]);
        i++;
    }
    console.log(data);
    i++;
    while (i < dataANDcode.length){
        code.push(dataANDcode[i]);
        i++;
    }
    console.log(code);

};

console.log(split(dataANDcode));

// function run instructions from code
/*function run(code) {
    for (var i = 5; i < code.length; i++) {
        console.log(code[i]);
        code[i].split(" ");
        console.log(code[i])
    }
}*/

