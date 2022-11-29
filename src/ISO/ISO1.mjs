// import memory
import memory from './memory.mjs';
import { LDA, STR } from './isoFunction.mjs';

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
        console.log("Execution of instruction " + i + ": " + code[i]);
        console.log("Memory before execution: ");
        console.log(memory);
        // Call corresponding function to instruction
        const params = code[i].substring(4).split(" ");
        switch (code[i].substring(0, 3)) {
            case "LDA": {
                LDA(params[0], params[1]);
                break;
            }
            case "STR": {
                STR(params[0], params[1]);
                break
            }
            default: {
                break;
            }
        }
        i++;
        memory.pc++;
        console.log("Memory after execution: ");
        console.log(memory);
    };
};

// general run function, recieves a dataANDcode array + pc 
function run(dataANDcode, pc) {
    const [data, code] = split(dataANDcode);
    readData(data);
    runCode(code, pc);
}

run(dataANDcode, 4);


//LDA("LDA T0 A");
