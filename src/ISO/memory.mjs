const memory = {
	"pc": 0,
	"registers": {
		"T0": 0,
		"T1": 0,
		"T2": 0,
		"T3": 0,
	},
	"variables": {},
	"byteStack": [],
	"code": [
		"#DATA",
		"A 10",
		"B 15",
		"RES 0",
		"!NEXT ON S'EN TAPE",

		"#CODE",
		"BEQ 2 2 LABEL",
		"INC T0",
		"JMP LABEL2",

		"LABEL:",
		"LDA T0 A",

		"LABEL2:",
		"HLT",
	]
}

export default memory;