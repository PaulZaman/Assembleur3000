function TextArea({ value, onChange }) {
	let nLines = value.split("\n").length + 1;
	return (
		<div>
			<div className="editor flex flex-row text-white bg-black w-80 h-96 font-[Courier] overflow-auto">
				<div className="line-numbers w-5 h-96 mr-2 text-right flex flex-col text-yellow-600">
					{/* create a span element per line */}
					{Array.from(Array(nLines).keys()).map((i) => (
						<span key={i}>{i + 1}</span>
					))}
				</div>
				<textarea className="bg-black outline-0 pl-2 w-screen object-contain h-screen  overflow-hidden no-underline" value={value} onChange={onChange}></textarea>
			</div>
		</div >
	)
}

export default TextArea;