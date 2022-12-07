function aboutPage() {
	return (
		<>
			<h1 className="text-2xl text-center m-12 font-semibold">About Page</h1>
			<h2 className="m-6 font-semibold">Welcome to our website</h2>
			<p className="m-6">
				We are a group of students from the University of Efrei Paris, studying Computer Science.
				We are currently in our 3rd year of study and we are working on a project for our Computer architecture course.
				Our project is to create an assembler in the language of our choice. We chose to create an assembler in JavaScript.
				We chose to use React to create the interface of our assembler.
			</p>
			<h3 className="m-6 font-semibold">Our team:</h3>
			<ul className="m-6 ml-14">
				<li>Capucine Foucher</li>
				<li>Paul Zamanian</li>
			</ul>
			<h3 className="m-6">
				In order to see the code of our project, link of our report or subject you can navigate to these links:
			</h3>
			<ul className="ml-14 font-semibold">
				<li>
					<a href="https://github.com/pythking/Assembleur3000" classname="mb-10" >GitHub</a>
				</li>
				<li>
					<a href="https://drive.google.com/file/d/1ntT4kHUpR_vFn-15Wt-PGU_MVx20kh3m/view?usp=sharing" classname="mb-17" >Subject</a>
				</li>
			</ul>



		</>
	);
}

export default aboutPage;