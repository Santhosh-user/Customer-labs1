import logo from './logo.svg';
import './App.css';
import Popup from './Components/Popup';
import { useState } from 'react';

function App() {

  const[segment, setSegment] = useState(false)
  
  const closePopup = () =>{
    setSegment(false)
  }

  return (
    <div>
      <div className='header-color' >
      <div className='header-text'> View Audience</div>
      </div>
      <button className='save-segment-btn' onClick={()=>setSegment(true)}>Save Segment</button>
    
    

      {segment && <Popup closePopup={closePopup} />}
    </div>
  );


    


}

export default App;

