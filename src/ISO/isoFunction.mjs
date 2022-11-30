// contains the functions for the ISO
// these function manipulate the stack and calls the functions in the isoFunction.js file to do the actual work
import memory from './memory.mjs';

export function LDA(register, value) {
	// If value is a variable, get the value from memory
	if (value in memory.variables) {
		value = memory.variables[value];
	}

	// Load value into register
	memory.registers[register] = value;
}

export function STR(variable, value) {
	// If value is a register, get the value from memory
	if (value in memory.registers) {
		value = memory.registers[value];
	}

	// Store value into variable
	memory.variables[variable] = value;
}

export function PUSH(expression) {
	console.log(expression);

	if (expression in memory.registers) {
		expression = memory.registers[expression];
	}
	if (expression in memory.variables) {
		expression = memory.variables[expression];
	}
	memory.byteStack.push(expression);
}

export function POP(register) {
	memory.registers[register] = memory.byteStack.pop();
}

export function MOD(register, value) {
	if (value in memory.variables) {
		value = memory.variables[value];
	}
	memory.registers[register] = memory.registers[register] % value;
}

export function INC(register) {
	memory.registers[register]++;
}

export function DEC(register) {
	memory.registers[register]--;
}