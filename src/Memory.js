import Table from './Table.js'

function Memory({ registers, variables, byteStack }) {
	return (
		<>
			<div className="MEMORY flex justify-center">
				<Table dict={registers} headingRow1="Register" headingRow2="Value" title="Registers" />
				<Table dict={variables} headingRow1="Variable" headingRow2="Value" title="Variables" />
				<Table dict={byteStack} headingRow1="Byte Stack" headingRow2="Value" title="Byte Stack" />
			</div>
		</>
	);
}

export default Memory;