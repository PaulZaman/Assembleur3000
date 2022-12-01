// import memory
import memory from './memory.mjs';
import { LDA, STR, AND, OR, NOT, ADD, SUB, DIV, MUL, PUSH, POP, MOD, INC, DEC, JMP, BEQ, BNE, BBG, BSM } from './alu.mjs';
import { splitTo2Arrays, fromStringToArray } from './ArrayAndStringManipulation.js';

export function emptyMemory() {
    // this function empties the memory
    memory.variables = {};
    for (let i = 0; i < 4; i++) {
        memory.registers["T" + i] = 0;
    }
    memory.byteStack = [];
    memory.pc = 0;
}

export function ParserData(data) {
    // make sure data is ok
    for (let i = 1; i < data.length; i++) {
        if (data[i].split(" ").length !== 2) {
            throw new Error("Data is not valid");
        }
    }
}

// Read data Section and set variables in memory
function readData(data) {
    // this function reads an array of strings and sets the values in memory
    for (let i = 1; i < data.length; i++) {
        let variable = data[i].split(" ");
        memory.variables[variable[0]] = parseInt(variable[1]);
    }
}

//Run a single instruction
export function runInstruction(instruction, stopval) {
    // Display
    console.log("\nExecution of instruction : " + instruction);
    console.log("Memory before execution: ", memory.variables, memory.registers);

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
            JMP(params[0], stopval);
            break;
        }
        case "AND": {
            AND(params[0], params[1]);
            break;
        }
        case "OR ": {
            OR(instruction.substring(3).split(" ")[0], params[1]);
            break;
        }
        case "NOT": {
            NOT(params[0]);
            break;
        }
        case "ADD": {
            ADD(params[0], params[1]);
            break;
        }
        case "SUB": {
            SUB(params[0], params[1]);
            break;
        }
        case "DIV": {
            DIV(params[0], params[1]);
            break;
        }
        case "MUL": {
            MUL(params[0], params[1]);
            break;
        }
        case "BEQ": {
            BEQ(params[0], params[1], params[2], stopval);
            break;
        }
        case "BNE": {
            BNE(params[0], params[1], params[2], stopval);
            break;
        }
        case "BBG": {
            BBG(params[0], params[1], params[2], stopval);
            break;
        }
        case "BSM": {
            BSM(params[0], params[1], params[2], stopval);
            break;
        }
        default: {
            break;
        }
    };

    // Display
    console.log("Memory after execution: ", memory.variables, memory.registers);
};

// general run function, recieves a stop value and runs code until it reaches stopval 
export function run(dataANDcode, stopval) {
    let [data, code] = splitTo2Arrays(fromStringToArray(dataANDcode));
    // Before running, we need to run the data through the interpreter to check wheather
    // it is valid or not
    ParserData(data);

    // Reset memory
    emptyMemory();

    // Save code into memory
    memory.code = code;

    // Set stop value accordingly and read data if needed
    if (stopval === 'END' || stopval > code.length - 1) {
        stopval = code.length - 1;
    }
    if (stopval > 0) {
        readData(data);
    }
    if (stopval < 0) {
        stopval = 0;
    }

    // Run code instructions until stopval is reached or End is reached
    let iterations = 0;
    while (memory.pc !== stopval && memory.pc <= code.length - 1 && iterations < 1000) {
        if (runInstruction(code[memory.pc], stopval) === -1) {
            memory.pc = code.length;
        };
        memory.pc++;
        iterations++;
    }

    // Throw error if iterations > 1000
    if (iterations > 1000) {
        throw new Error("Too many iterations");
    }
    console.log("Execution finished");
    if (memory.pc < 0) {
        memory.pc = 0;
    }
}