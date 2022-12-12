import { useState, useRef } from 'react';
import { run, getRunningInstruction, findMaxNofIterations } from './algorithms/interpreter.mjs';
import { memoryGetAllVariables, emptyMemory } from './algorithms/memManagement.mjs';
import memory from './algorithms/memory.mjs';
import Memory from './components/Memory.js';
import TextArea from './components/TextArea.js';

function ISO() {
  // create variables
  const [code, setCode] = useState('\n#DATA\nA 10\nB 15\nRES 0\n!NEXT, WE START THE CODE WITH THE #CODE MACRO\n#CODE\nLDA T0 A\nLDA T1 B\nADD T0 T1\nSTR RES T0\nHLT\n');
  const [output, setOutput] = useState('');
  const [registers, setRegisters] = useState(memory.registers);
  const [variables, setVariables] = useState({});
  const [byteStack, setByteStack] = useState({});
  const nInstructions = useRef(0);

  const VariablesReset = () => {
    setVariables(memoryGetAllVariables());
    setByteStack(memory.byteStack);
    setRegisters(memory.registers);
    setOutput(getRunningInstruction(code));
  }

  const Run = () => {
    try {
      run(code, nInstructions.current);
      VariablesReset();
    }
    catch (e) {
      VariablesReset();
      setOutput(e);
      nInstructions.current = 0;
    }
  }

  const handleRun = () => {
    nInstructions.current = findMaxNofIterations(code);
    Run();
  }

  const handleNextStep = () => {
    nInstructions.current++;
    if (nInstructions.current > findMaxNofIterations(code)) {
      nInstructions.current = findMaxNofIterations(code);
    }
    Run();
  }

  const handlePrevStep = () => {
    nInstructions.current--;
    if (nInstructions.current < 0) {
      nInstructions.current = 0;
    }
    Run();
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
          {/* <textarea className="text-white bg-black w-80 h-96 font-[Courier] p-4" value={code} onChange={(e) => setCode(e.target.value)}></textarea> */}
          <TextArea value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        <div className="m-3">
          <div className="flex justify-center h-12">
            <button><img src="../skip-button.png" alt="PREV" className="rotate-180 w-auto h-9 hover:h-10 m-1 transition-all" onClick={handlePrevStep} /></button>
            <button><img src="../play.png" alt="PLAY" className="h-9 w-auto hover:h-10 m-1 transition-all" onClick={handleRun} /></button>
            <button><img src="../skip-button.png" alt="NEXT" className="w-auto h-9 hover:h-10 m-1 transition-all" onClick={handleNextStep} /></button>
          </div>
          <div className="output flex justify-center m-3">
            <div>
              <h3 className='text-center font-semibold'>OUTPUT </h3>
              <textarea className="text-white bg-black w-60 h-60 font-[Courier] p-4" value={output} readOnly></textarea>
            </div>
          </div>
          {/* Input file */}
          <div className="flex justify-center hover:scale-105 duration-500">
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