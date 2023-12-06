import logo from './logo.svg';
import './App.css';

import {
  orkesConductorClient,
  workflow,
  inlineTask,
  WorkflowExecutor,
} from "@io-orkes/conductor-javascript/browser";

// Server Settings
const serverSettings = {
  keyId: 'aa93cd96-8dfa-4520-8a0d-7d433c70ab46',
  keySecret: 'TBKmUVwLAycExScffcZkRz7aCmmucVKp4hI4lFDHG7RJlvkF',
  serverUrl: 'https://op-uat.orkesconductor.io/api',
};

function App() {
  const clientPromise = orkesConductorClient(serverSettings);

  const execute = async () => {
    const client = await clientPromise;
    const executor = new WorkflowExecutor(client);
  
    const workflowName = "market_news_search";

    const result = await executor.executeWorkflow(
        {
            name: workflowName,
            version: 1,
            input: { "question": "What is Snowflake's growth? Give the associated news url",
            "namespace": "demo",
            "destination": "" },
        },
        workflowName,
        1,
        "123456"
    );
    const output = result.output?.echo;

  };

  return (
    <div className="App">
      <header className="App-header">
        <div className='App-title'>Market News Watcher</div>
        <div className='App-subtitle'>Your market data copilot</div>
        <div>
          <ul className='App-list'>
            <li><button className='App-button' role="button">Option 1</button> <i>Wall Street's most valuable companies?</i></li>
            <li><button className='App-button' role="button">Option 2</button> <i>Performance of Royal Caribbean?</i></li>
            <li><button className='App-button' role="button">Option 3</button> <i>What is Snowflake's growth?</i></li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
