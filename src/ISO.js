import { useState } from 'react';
import { run, emptyMemory } from './ISO/interpreter.mjs';
import memory from './ISO/memory.mjs';
import Memory from './Memory.js';

function ISO() {
  // create variables
  var [code, setCode] = useState('\n#DATA\nA 10\nB 15\nRES 0\n\n!NEXT, WE START THE CODE WITH THE #CODE MACRO\n#CODE\nLDA T0 A\nLDA T1 B\nADD T0 T1\nSTR RES T0\nHLT\n');
  var [output, setOutput] = useState('');
  var [registers, setRegisters] = useState(memory.registers);
  var [variables, setVariables] = useState({});
  var [byteStack, setByteStack] = useState({});

  const VariablesReset = () => {
    setVariables(memory.variables);
    setByteStack(memory.byteStack);
    setRegisters(memory.registers);
  }

  const handleRun = () => {
    try {
      run(code, "END");
    }
    catch (e) {
      setOutput(e);
      memory.pc = 0;
    }
    VariablesReset();
  }

  const handleNextStep = () => {
    try {
      memory.pc++
      run(code, memory.pc);
    }
    catch (e) {
      setOutput(e);
      memory.pc = 0;
    }
    VariablesReset();
  }

  const handlePrevStep = () => {
    try {
      memory.pc--;
      run(code, memory.pc);
    }
    catch (e) {
      setOutput(e);
      memory.pc = 0;
    }
    VariablesReset();
  }

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
    emptyMemory();
    VariablesReset();

  }

  return (
    <>
      <div className="flex justify-center">
        <div className="input">
          <textarea className="text-white bg-black w-80 h-96 font-[Courier] p-4" value={code} onChange={(e) => setCode(e.target.value)}></textarea>
        </div>
        <div className="m-3">
          <div className="flex justify-center h-12">
            <button><img src="../skip-button.png" alt="PREV" className="rotate-180 w-auto h-9 hover:h-10 m-1 transition-all" onClick={handlePrevStep} /></button>
            <button><img src="../play.png" alt="PLAY" className="h-9 w-auto hover:h-10 m-1 transition-all" onClick={handleRun} /></button>
            <button><img src="../skip-button.png" alt="NEXT" className="w-auto h-9 hover:h-10 m-1 transition-all" onClick={handleNextStep} /></button>
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

      <Memory variables={variables} registers={registers} byteStack={byteStack} />
    </>

  );
}

export default ISO;