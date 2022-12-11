import { useEffect, useState } from "react";
import memory from "../algorithms/memory.mjs";
import Table from './Table.js'

function handleStack(byteStack) {
	// Function returns stack table if stack is not empty
	if (Object.keys(byteStack).length > 0) {
		return (
			<Table dict={byteStack} headingRow1="N°" headingRow2="Value" title="Byte Stack" />
		)
	}
	return (
		<h1 className=' pt-32 w-60 text-center'>Byte stack is Empty</h1>
	)
}

function handleVariables(variables) {
	// Function returns stack table if stack is not empty
	if (Object.keys(variables).length > 0) {
		return (
			<Table dict={variables} headingRow1="Variable" headingRow2="Value" title="Variables" />
		)
	}
	else return (
		<h1 className='pt-32 w-60 text-center'>No declared variables yet</h1>
	)
}


function Memory({ registers, variables, byteStack }) {
	const [variableTable, setVariabletable] = useState(handleVariables(variables));
	const [stackTable, setStackTable] = useState(handleStack(byteStack));

	useEffect(() => {
		// Update the document title using the browser API
		setVariabletable(handleStack(byteStack));
		setStackTable(handleVariables(variables));
	}, [registers, variables, byteStack]);

	return (
		<>
			<div className="MEMORY flex justify-center">
				<Table dict={registers} headingRow1="Register" headingRow2="Value" title="Registers" />
				{stackTable}
				{variableTable}
			</div>
			{/* display the memroy in a table */}
			<div className="hover:scale-105 duration-500">
				<h1 className="text-center font-semibold m-5"> MEMORY</h1>
				<div className="MEMORY flex justify-center">
					<table className="table-auto border mb-8">
						<tbody>
							{memory.mem.map((row, i) => (
								<tr key={i}>
									{row.map((cell, j) => (
										<td key={j} className="border px-4 py-2 text-sm">{cell}</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default Memory;