import memory from "./ISO/memory.mjs";
import Table from './Table.js'

function Memory({registers, variables, byteStack }) {
	return (
		<>
			<div className="MEMORY flex justify-center">
				<Table dict={registers} headingRow1="Register" headingRow2="Value" title="Registers" />
				<Table dict={variables} headingRow1="Variable" headingRow2="Value" title="Variables" />
				<Table dict={byteStack} headingRow1="Byte Stack" headingRow2="Value" title="Byte Stack" />
			</div>
			{/* display the memroy in a table */}
			<h1 className="text-center font-semibold"> MEMORY</h1>
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

			
		</>
	);
}

export default Memory;