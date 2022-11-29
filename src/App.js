import './App.css';
import { useRef, useState } from 'react';

function openfile(file, setCode) {
  var reader = new FileReader();
  reader.onload = function () {
    var text = reader.result;
    setCode(text);
  };
  reader.readAsText(file);
}

function App() {
  // create variables
  var [code, setCode] = useState('!FELIPE GM - MOD7 COMPUTER ARCHITECTURE CONCORDIA CONTINUING EDUCATION\n!FINAL ASSIGNMENT FOR THE FALL CLASS 2022\n!EXAMPLE OF A SIMPLE ASSEMBLY PROGRAM USING A FEW INSTRUCTIONS. ANY LINE STARTING WITH `!` IS A COMMENT\n\n#DATA\nA 10\nB 15\nRES 0\n\n!NEXT, WE START THE CODE WITH THE #CODE MACRO\n#CODE\nLDA T0 A\nLDA T1 B\nADD T0 T1\nSTR RES T0\nHLT\n');
  var [output, setOutput] = useState('');
  var [t0, setT0] = useState('empty');
  var [t1, setT1] = useState('empty');
  var [t2, setT2] = useState('empty');
  var [t3, setT3] = useState('empty');
  var [variables, setVariables] = useState({});
  var [byteStack, setByteStack] = useState({});


  const handleFileChange = (e) => {
    // 👇️ get file from event
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      var text = reader.result;
      setCode(text);
    };
    reader.readAsText(file);
    e.target.value = null;
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="input">
          <textarea className="text-white bg-black w-80 h-96 font-[Courier] p-4" value={code} onChange={(e) => setCode(e.target.value)}></textarea>
        </div>
        <div className="m-3">
          <div className="flex justify-center h-12">
            <button><img src="../skip-button.png" alt="PREV" className="rotate-180 w-auto h-9 hover:h-10 m-1 transition-all" /></button>
            <button><img src="../play.png" alt="PLAY" className="h-9 w-auto hover:h-10 m-1 transition-all" /></button>
            <button><img src="../skip-button.png" alt="NEXT" className="w-auto h-9 hover:h-10 m-1 transition-all" /></button>
          </div>
          <div className="output flex justify-center m-3">
            <div>
              <h3 className='text-center'>OUTPUT </h3>
              <textarea className="text-white bg-black w-60 h-40 font-[Courier] p-4" value={output} onChange={(e) => setOutput(e.target.value)} readOnly></textarea>
            </div>
          </div>
          {/* Input file */}
          <div className="flex justify-center">
            <input type="file" id="file" className='hidden' onChange={handleFileChange} />
            <label htmlFor="file" className="bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 cursor-pointer">Upload File</label>
          </div>
        </div>
      </div>

      <div className="MEMORY flex justify-center">
        <div className='m-4'>
          <h3 className='text-center'>Registers</h3>
          <table className="table-auto border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Register</th>
                <th className="px-4 py-2 border">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">T0</td>
                <td className="border px-4 py-2">{t0}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">T1</td>
                <td className="border px-4 py-2">{t1}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">T2</td>
                <td className="border px-4 py-2">{t2}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">T3</td>
                <td className="border px-4 py-2">{t3}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='m-4'>
          <h3 className='text-center'>Variables</h3>
          <table>
            <thead>
              <tr>
                <th className="px-4 py-2 border">Variable</th>
                <th className="px-4 py-2 border">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(variables).map((key) => {
                return (
                  <tr>
                    <td className="border px-4 py-2">{key}</td>
                    <td className="border px-4 py-2">{variables[key]}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className='m-4'>
          <h3 className='text-center'>Byte stack</h3>
          <table>
            <thead>
              <tr>
                <th className="px-4 py-2 border">Variable</th>
                <th className="px-4 py-2 border">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(byteStack).map((key) => {
                return (
                  <tr>
                    <td className="border px-4 py-2">{key}</td>
                    <td className="border px-4 py-2">{variables[key]}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>

  );
}

export default App;
