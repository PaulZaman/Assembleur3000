// import memory
import memory from './memory.mjs';
import { LDA, STR, AND, OR, NOT, ADD, SUB, DIV, MUL, PUSH, POP, MOD, INC, DEC } from './isoFunction.mjs';


// read data and set in memory
function readData(data) {
    // this function reads an array of strings and sets the values in memory
    for (let i = 1; i < data.length; i++) {
        let variable = data[i].split(" ");
        let name = variable[0];
        let value = variable[1];
        memory.variables[name] = parseInt(value);
    }
}

//Split dataANDcode array into data and code arrays
function split(dataANDcode) {
    let data = [];
    let code = [];
    let i = 0;
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
function runInstruction(instruction, stopval) {
    // Display
    console.log("---------------------------------------------")
    console.log("Execution of instruction : " + instruction);
    console.log("Memory before execution: ");
    console.log(memory.variables);
    console.log(memory.registers);
    // Call corresponding function to instruction
    const params = instruction.substring(4).split(" ");
    switch (instruction.substring(0, 3)) {
        case "LDA": {
            LDA(params[0], params[1]);
            break;
        }
        case "STR": {
            STR(params[0], params[1]);
            break;
        }
        case "PUS": {
            PUSH(params[1]);
            break;
        }
        case "POP": {
            POP(params[0]);
            break;
        }
        case "HLT": {
            console.log("HLT instruction reached, stopping execution");
            return -1;
        }
        case "MOD": {
            MOD(params[0], params[1]);
            break;
        }
        case "INC": {
            INC(params[0]);
            break;
        }
        case "DEC": {
            DEC(params[0]);
            break;
        }
        case "JMP": {
            const buffer = memory.pc;
            memory.pc = split(memory.code)[1].findIndex((element) => element === params[0] + ":");
            let output = undefined;
            while (output != -1 && memory.pc != stopval) {
                output = runInstruction(split(memory.code)[1][memory.pc], stopval);
                memory.pc++;
            }
            default: {
            break;
        }
    }
};
// Display
console.log("Memory after execution: ");
console.log(memory.variables);
console.log(memory.registers);
console.log("---------------------------------------------")



};

// general run function, recieves a dataANDcode array + pc 
function run(stopval) {
    let [data, code] = split(memory.code);
    readData(data);
    while (memory.pc != stopval && memory.pc <= code.length - 1) {
        // DEV

        if (runInstruction(code[memory.pc], stopval) == -1) {
            return;
        };
        memory.pc++;
    }
}

run(5);


