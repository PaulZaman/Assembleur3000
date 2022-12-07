import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ISO from '../ISO.js';
import AboutPage from '../aboutPage.js';
import { Link } from 'react-router-dom';


function Header() {
	return (
		<>
			<header>
				<h1 className="font-medium leading-tight text-4xl mt-5 mb-2 text-yellow-600 text-center" >Assembler - 3000</h1>
			</header>
			<Router>
				<ul className='bg-black flex m-5 rounded-md justify-center'>
					<li className='m-3 text-white font-semibold hover:scale-125 duration-500'><Link to="/">Home</Link></li>
					<li className="m-3 text-white font-semibold hover:scale-125 duration-500"><Link to="about">About</Link></li>
				</ul>
				<Routes>
					<Route path="/" element={<ISO />} />
					<Route path="/about" element={<AboutPage />} />
				</Routes>

			</Router>


		</>

	);
}


export default Header;