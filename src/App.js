import { useEffect, useState } from 'react';
import './App.css';

import {
  orkesConductorClient,
  WorkflowExecutor,
} from "@io-orkes/conductor-javascript/browser";

// Server Settings
const serverSettings = {
  keyId: '985a5e65-a50d-42ef-82ae-be38b0016dbf',
  keySecret: 'XxfJh8YyjYPcMSc1MwhdxB8x4hUwwDicyEZG3FR89FLofufw',
  serverUrl: 'https://op-uat.orkesconductor.io/api',
};

const questions = [
  "What are Wall Street's most valuable companies? Give the associated news url as an href tag with a blank target",
  "What is the performance of Royal Caribbean? Give the associated news url as an href tag with a blank target",
  "What is Snowflake's growth? Give the associated news url as an href tag with a blank target"
];

const clientPromise = orkesConductorClient(serverSettings);

function App() {
      const [answer, setAnswer] = useState('');
    
      const executeFlow = async (idx) => {
        const client = await clientPromise;
        const executor = new WorkflowExecutor(client);
      
        const workflowName = "market_news_search";
    
        const result = await executor.executeWorkflow(
            {
                name: workflowName,
                version: 1,
                input: { "question": questions[idx],
                "namespace": "news",
                "destination": "" },
            },
            workflowName,
            1,
            "123456"
        );
        setAnswer(result.output.answer);
      }

  return (
    <div className="App">
      <header className="App-header">
        <div className='App-title'>Market News Watcher</div>
        <div className='App-subtitle'>Your market data copilot</div>
        <div>
          <ul className='App-list'>
            <li><button className='App-button' role="button" onClick={() => executeFlow(0) }>Option 1</button> <i>Wall Street's most valuable companies?</i></li>
            <li><button className='App-button' role="button" onClick={() => executeFlow(1) }>Option 2</button> <i>Performance of Royal Caribbean?</i></li>
            <li><button className='App-button' role="button" onClick={() => executeFlow(2) }>Option 3</button> <i>What is Snowflake's growth?</i></li>
          </ul>
        </div>
        <div className='App-answer' dangerouslySetInnerHTML={{__html: answer}}></div>
      </header>
    </div>
  );
}

export default App;
