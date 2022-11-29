// import memory
import { memory } from "./memory.js";


// For testing purposes
var dataANDcode = ["#DATA", "A 10", "B 15", "RES 0", "!NEXT ON S'EN TAPE", "#CODE", "LDA TO A", "LDA T1 B", "ADD T0 T1", "STR RES TO", "HLT"];
data = split[0];
code = split[1];

// read data and set in memory
function readData(data) {
    for (var i = 0; i < data.length; i++) {
        var variable = data[i].split(" ");
        var name = variable[0];
        var value = variable[1];
        memory.variables[name] = value;
    }
}

//Split code array into data and code arrays
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

console.log(split(dataANDcode));
console.log(separate(code));

//Separate code array into instructions and arguments
function run(code, pc) {
    var i = 0;
    while (i < pc) {
        switch (separate(code[i])) {
            case "LDA":
                LDA(separate(code[i + 1]));
                break;
            case "ADD":
                ADD(separate(code[i + 1]));
                break;
            case "STR":
                STR(separate(code[i + 1]));
                break;
            default:
                console.log("Error");
                i++;
        };
    };
};



// get instructions
function separate(code) {
    var instruction = " ";
    var i = 0;
    while (i < 2) {
        instruction += code[i];
        i++;
    }
    return instruction;
}