function Table({ dict, headingRow1, headingRow2, title }) {
	return (
		<div className='m-4'>
			<h3 className='text-center'>{title}</h3>
			<table className="table-auto border">
				<thead>
					<tr>
						<th className="px-4 py-2 border">{headingRow1}</th>
						<th className="px-4 py-2 border">{headingRow2}</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(dict).map((key) => (
						<tr key={key}>
							<td className="border px-4 py-2">{key}</td>
							<td className="border px-4 py-2">{dict[key]}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Table;