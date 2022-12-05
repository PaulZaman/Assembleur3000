import { getVariable } from "./memManagement.mjs";
import memory from "./memory.mjs";


export function type(param, register, variable, constant) {
	try {
		if (param in memory.variables && variable === true) {
			return getVariable(param);
		}
		if (param in memory.registers && register === true) {
			return memory.registers[param];
		}
		if (constant === true && !isNaN(param)) {
			return parseInt(param);
		}
	} catch {
		throw new Error("Invalid type for " + param);
	}
	let error = param + " is not a valid parameter in line " + memory.pc;
	throw error
}