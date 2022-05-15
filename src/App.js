import Popup from './components/Popup/Popup';
import CookieSettingsWindow from './components/CookieSettingsWindow/CookieSettingsWindow';
import { useState } from 'react';
import { useConsentContext } from './store/ConsentContext';
import ParsePurposes from './components/UI/Diagram/PurposesParser';

function App() {
  const [buttonPopup, setButtonPopup] = useState(true);
  const [buttonSettings, setSettingsPopup] = useState(false);

  return (
    <div className='App'>
      <main>
        <h1>React popups</h1>
        <br></br>
        <button onClick={() => setButtonPopup(true)}>Open popup</button>
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
