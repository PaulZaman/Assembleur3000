import { useState } from 'react';
import { run, getRunningInstruction } from './ISO/interpreter.mjs';
import { memoryGetAllVariables, emptyMemory } from './ISO/memManagement.mjs';
import memory from './ISO/memory.mjs';
import Memory from './components/Memory.js';
import TextArea from './components/TextArea.js';

function ISO() {
  // create variables
  var [code, setCode] = useState('\n#DATA\nA 10\nB 15\nRES 0\n!NEXT, WE START THE CODE WITH THE #CODE MACRO\n#CODE\nLDA T0 A\nLDA T1 B\nADD T0 T1\nSTR RES T0\nHLT\n');
  var [output, setOutput] = useState('');
  var [registers, setRegisters] = useState(memory.registers);
  var [variables, setVariables] = useState({});
  var [byteStack, setByteStack] = useState({});

  const VariablesReset = () => {
    setVariables(memoryGetAllVariables());
    setByteStack(memory.byteStack);
    setRegisters(memory.registers);
    setOutput(getRunningInstruction(code));
  }

  const Run = (step) => {
    try {
      run(code, step);

    }
    catch (e) {
      setOutput(e);
      memory.pc = 0;
    }
    VariablesReset();
  }

  const handleRun = () => {
    Run('END');
  }

  const handleNextStep = () => {
    memory.pc++;
    Run(memory.pc);
  }

  const handlePrevStep = () => {
    memory.pc--;
    Run(memory.pc);
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
        <div className="input hover:scale-105 duration-500">
          {/* <textarea className="text-white bg-black w-80 h-96 font-[Courier] p-4" value={code} onChange={(e) => setCode(e.target.value)}></textarea> */}
          <TextArea value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        <div className="m-3">
          <div className="flex justify-center h-12 hover:scale-105 duration-500">
            <button><img src="../skip-button.png" alt="PREV" className="rotate-180 w-auto h-9 hover:h-10 m-1 transition-all" onClick={handlePrevStep} /></button>
            <button><img src="../play.png" alt="PLAY" className="h-9 w-auto hover:h-10 m-1 transition-all" onClick={handleRun} /></button>
            <button><img src="../skip-button.png" alt="NEXT" className="w-auto h-9 hover:h-10 m-1 transition-all" onClick={handleNextStep} /></button>
          </div>
          <div className="output flex justify-center m-3 hover:scale-105 duration-500">
            <div>
              <h3 className='text-center font-semibold'>OUTPUT </h3>
              <textarea className="text-white bg-black w-60 h-40 font-[Courier] p-4" value={output} onChange={(e) => setOutput(e.target.value)} readOnly></textarea>
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