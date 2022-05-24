import Popup from './components/Popup/Popup';
import CookieSettingsWindow from './components/CookieSettingsWindow/CookieSettingsWindow';
import { useState } from 'react';
import './index.css';

function App() {
  const [buttonPopup, setButtonPopup] = useState(true);
  const [buttonSettings, setSettingsPopup] = useState(false);

  return (
    <div className='App'>
      <main>
        <h1>Lrytas.lt</h1>
        <div className='dummy-div'></div>
        <div className='dummy-div'></div>
        <div className='dummy-div'></div>
        <div className='dummy-div'></div>
        <div className='dummy-div'></div>
        <div className='dummy-div'></div>
        <div className='dummy-div'></div>
        <div className='dummy-div'></div>
        <div className='dummy-div'></div>
        <div className='dummy-div'></div>
      </main>
      <Popup
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        setSettingsWindow={setSettingsPopup}
      >
        <h3>popup</h3>
      </Popup>
      <CookieSettingsWindow
        trigger={buttonSettings}
        setSettingsWindow={setSettingsPopup}
      />
    </div>
  );
}

export default App;
