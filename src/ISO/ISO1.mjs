// import memory
import memory from './memory.mjs';
import { LDA } from './isoFunction.mjs';

// For testing purposes
var dataANDcode = ["#DATA", "A 10", "B 15", "RES 0", "!NEXT ON S'EN TAPE", "#CODE", "LDA T0 A", "LDA T1 B", "ADD T0 T1", "STR RES T0", "HLT"];

// read data and set in memory
function readData(data) {
    // this function reads an array of strings and sets the values in memory
    for (var i = 1; i < data.length; i++) {
        var variable = data[i].split(" ");
        var name = variable[0];
        var value = variable[1];
        memory.variables[name] = value;
    }
}

//Split dataANDcode array into data and code arrays
function split(dataANDcode) {
    var data = [];
    var code = [];
    var i = 0;
    while (dataANDcode[i] != "!NEXT ON S'EN TAPE") {
        data.push(dataANDcode[i]);
        i++;
    }
    //console.log(data);
    i++;
    while (i < dataANDcode.length) {
        code.push(dataANDcode[i]);
        i++;
    }
    //console.log(code);
    return [data, code];
};

//Separate code array and execute correspondign instructions
function runCode(code, pc) {
    var i = 1;
    while (i < pc + 1) {
        // ADD parameters to stack
        const parameters = code[i].substring(4).split(" "); // seperate parameters from instruction
        for (var j = parameters.length - 1; j > -1; j--) {
            memory.byteStack.push(parameters[j]);
        }   // Add parameters to stack

        // Call corresponding function to instruction
        switch (code[i].substring(0, 3)) {
            case "LDA": {
                LDA();
            }
            case "STR":
            case "ADD":
            case "HLT":
            case "JMP":
        }
        i++;
        memory.pc++;
    };
};

// general run function, recieves a dataANDcode array + pc 
function run(dataANDcode, pc) {
    const [data, code] = split(dataANDcode);
    readData(data);
    runCode(code, pc);
}


run(dataANDcode, 1);
//LDA("LDA T0 A");
console.log(memory);
