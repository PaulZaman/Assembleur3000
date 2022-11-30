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

export function AND(register, value) {
	console.log("AND");
	// If value is a variable, get the value from memory
	if (value in memory.variables) {
		value = memory.variables[value];
	}
	if (value in memory.registers) {
		value = memory.registers[value];
	}
	// perform AND operation between value and register
	memory.registers[register] = parseFloat(memory.registers[register] && value);
}

export function OR(register, value) {
	console.log(register, value);
	// If value is a variable, get the value from memory
	if (value in memory.variables) {
		value = memory.variables[value];
	}
	if (value in memory.registers) {
		value = memory.registers[value];
	}
	// perform OR operation between value and register
	memory.registers[register] = parseFloat(memory.registers[register] || value);
}

export function NOT(register) {
	// perform NOT operation on register
	if (memory.registers[register] == 0) {
		memory.registers[register] = 1;
	}
	else {
		memory.registers[register] = 0;
	}
}

export function ADD(register, value) {
	// If value is a variable, get the value from memory
	if (value in memory.variables) {
		value = memory.variables[value];
	}
	if (value in memory.registers) {
		value = memory.registers[value];
	}
	// perform ADD operation between value and register
	memory.registers[register] = memory.registers[register] + parseInt(value);
}

export function SUB(register, value) {
	// If value is a variable, get the value from memory
	if (value in memory.variables) {
		value = memory.variables[value];
	}
	if (value in memory.registers) {
		value = memory.registers[value];
	}
	// perform SUB operation between value and register
	memory.registers[register] = memory.registers[register] - value;
}

export function DIV(register, value) {
	// If value is a variable, get the value from memory
	if (value in memory.variables) {
		value = memory.variables[value];
	}
	if (value in memory.registers) {
		value = memory.registers[value];
	}
	// perform DIV operation between value and register
	if (value != 0) {
		memory.registers[register] = memory.registers[register] / value;
	}
}

export function MUL(register, value) {
	// If value is a variable, get the value from memory
	if (value in memory.variables) {
		value = memory.variables[value];
	}
	if (value in memory.registers) {
		value = memory.registers[value];
	}
	// perform MUL operation between value and register
	memory.registers[register] = memory.registers[register] * value;
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