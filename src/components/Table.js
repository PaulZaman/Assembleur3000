function Table({ dict, headingRow1, headingRow2, headingRow3, title }) {
	let colHeader = null;
	let data = null;
	console.log(dict)
	if (headingRow3) {
		colHeader = (<th className="px-4 py-2 border">{headingRow3}</th>)
		data = (
			Object.keys(dict).map((key) => (
				<tr key={key}>
					<td className="border px-4 py-2">{key}</td>
					<td className="border px-4 py-2">{dict[key][0]}</td>
					<td className="border px-4 py-2">{dict[key][1]}</td>
				</tr>
			))
		)
	}else{
		data = (
			Object.keys(dict).map((key) => (
				<tr key={key}>
					<td className="border px-4 py-2">{key}</td>
					<td className="border px-4 py-2">{dict[key]}</td>
				</tr>
			))
		)
	}
	return (
		<div className='m-4'>
			<h3 className='text-center font-semibold'>{title}</h3>
			<table className="table-auto border">
				<thead>
					<tr>
						<th className="px-4 py-2 border">{headingRow1}</th>
						<th className="px-4 py-2 border">{headingRow2}</th>
						{colHeader}
					</tr>
				</thead>
				<tbody>
					{data}
				</tbody>
			</table>
		</div>
	)
}

export default Table;