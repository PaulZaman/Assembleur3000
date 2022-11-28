import './App.css';
import { useState } from 'react';

function App() {
  // create variables
  var [code, setCode] = useState('!FELIPE GM - MOD7 COMPUTER ARCHITECTURE CONCORDIA CONTINUING EDUCATION\n!FINAL ASSIGNMENT FOR THE FALL CLASS 2022\n!EXAMPLE OF A SIMPLE ASSEMBLY PROGRAM USING A FEW INSTRUCTIONS. ANY LINE STARTING WITH `!` IS A COMMENT\n#DATA\nA 10\nB 15\nRES 0\n\n!NEXT, WE START THE CODE WITH THE #CODE MACRO\n#CODE\nLDA T0 A\nLDA T1 B\nADD T0 T1\nSTR RES T0\nHLT\n');

  return (
    <div className="Card">
      <div className="input">
        <textarea className="code" value={code} onChange={(e) => setCode(e.target.value)}></textarea>
      </div>
      <div className="console">

      </div>
      <div className="mem">

      </div>
    </div>
  );
}

export default App;
