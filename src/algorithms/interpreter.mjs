// import memory
import memory from './memory.mjs';
import { LDA, STR, AND, OR, NOT, ADD, SUB, DIV, MUL, PUSH, POP, MOD, INC, DEC, JMP, BEQ, BNE, BBG, BSM, SRL, SRR } from './alu.mjs';
import { splitTo2Arrays, fromStringToArray } from './ArrayAndStringManipulation.mjs';
import { createArray, createVariable, emptyMemory } from './memManagement.mjs';

export function ParserData(data) {
    // make sure data is ok
    for (let i = 1; i < data.length; i++) {
        let line = data[i].split(" ");
        if (line.length !== 2) {
            // Check if the line does not contain an array declaration
            if ((!line[0].includes("[")) || line[1] === "") {
                throw new Error("Data is not valid");
            }
        }
    }
}

// Read data Section and set variables in memory
function readData(data) {
    // this function reads an array of strings and sets the values in memory
    for (let i = 1; i < data.length; i++) {
        let variable = data[i].split(" ");
        //console.log(variable)
        if (variable[0].includes("[")) {
            // This is an array
            let arrayName = variable[0].split("[")[0];
            let arraySize = variable[0].split("[")[1].split("]")[0];
            // Create the array
            variable = variable.slice(1);   // Remove the array declaration
            // If variables were not split by spaces, split them
            if (variable.length === 1) {
                variable = variable[0].split(",");
            }
            createArray(arrayName, arraySize, variable);
        } else {
            // This is a variable
            createVariable(variable[0], variable[1]);
        }
    }
}

//Run a single instruction
export function runInstruction(instruction, stopval) {
    // Display
    // console.log("\nExecution of instruction : " + instruction);
    // console.log("Memory before execution: ", memory.variables, memory.registers);

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
        case "SRL": {
            SRL(params[0], params[1]);
            break;
        }
        case "SRR": {
            SRR(params[0], params[1]);
            break;
        }
        default: {
            break;
        }
    };

    // Display
    // console.log("Memory after execution: ", memory.variables, memory.registers);
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
        try {
            if (runInstruction(code[memory.pc], stopval) === -1) {
                memory.pc = code.length;
            };
            memory.pc++;
            iterations++;
        }
        catch (e) {
            throw e
        }
    }

    // Throw error if iterations > 1000
    if (iterations > 1000) {
        throw new Error("Too many iterations");
    }
    if (memory.pc < 0) {
        memory.pc = 0;
    }
}

export function getRunningInstruction(dataAndcode) {
    let output = memory.code[memory.pc - 1];
    if (output === undefined) {
        output = "#CODE\nPress next to move to next step";
    }
    if (memory.code[memory.pc] === 'HLT') {
        output = "HLT\n Execution Ended";
    }
    return "Executed until instruction: \n\n" + output

}

// run("#DATA\na 0\nb 0\nc[10] 1 2 3 4 5 6 7\n#CODE\nLDA T0 c[3]\nSTR a 3\nHLT", 3);
// console.log(memory.mem);