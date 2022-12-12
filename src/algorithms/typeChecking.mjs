import { getVariable, getValueOfArrayAtPosition } from "./memManagement.mjs";
import memory from "./memory.mjs";


export function type(param, register, variable, constant, array) {
	// This function checks if the given parameter is of the correct type
	// register: true if the parameter can be a register
	// variable: true if the parameter can be a variable
	// constant: true if the parameter can be a constant
	// If the parameter is not of the correct type an error is thrown
	if (param === undefined || param === " " || param === "") {
		throw new Error("\nMissing argument\n\nLine: " + getIndexOfLineInCode());
	}
	try {
		// Check if the parameter is a variable
		if (variable === true) {
			if (param in memory.variables) {
				return getVariable(param);
			}
		}
		// Check if the parameter is an array
		if (array === true) {
			// Check if the parameter is an element of an array
			if (param.includes("[")) {
				let arrayName = param.split("[")[0];
				let position = param.split("[")[1].split("]")[0];
				return getValueOfArrayAtPosition(arrayName, position);
			}
			if (param.includes("+")) {
				let arrayName = param.split("+")[0];
				let position = param.split("+")[1];
				return getValueOfArrayAtPosition(arrayName, position);
			}
		}

		// Check if the parameter is a register
		if (param in memory.registers && register === true) {
			return memory.registers[param];
		}
		// Check if the parameter is a constant
		if (constant === true && !isNaN(param)) {
			return parseInt(param);
		}
	} catch {
		// If the parameter is not of the correct type throw an error
		throw new Error("\nInvalid type for " + param + "\n\nLine: " + getIndexOfLineInCode());
	}
	// If the parameter is not of the correct type throw an error
	let error = "\n" + param + " is not a valid parameter\n\nLine: " + getIndexOfLineInCode();
	throw new Error(error);
}

export function getIndexOfLineInCode() {
	let code = memory["DataAndCode"].split("\n");
	// Get index of line in code
	for (let i = 0; i < code.length; i++) {
		if (code[i] === memory.code[memory.pc]) {
			return i + 1;
		}
	}
	return "";
}