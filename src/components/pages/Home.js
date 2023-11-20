import { useState, useEffect, useRef } from 'react'; 
import '../styles/Home.css'

export const Home = () => {
  const [inputValues, setInputValues] = useState({});
  const [focusedInput, setFocusedInput] = useState(null);
  const [buttonShow, setButtonShow] = useState(Array(39).fill(false));
  const [cover, setCover] = useState(false);
  const [title, setTitle] = useState(true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      setCover(false);
      setTitle(true);
    }
  });

  useEffect(() => {
    const savedValues = {};
    for (let i = 1; i <= 39; i++) {
      const savedValue = localStorage.getItem(i.toString());
      if (savedValue !== null) {
        savedValues[i] = savedValue;
      }
    }
    setInputValues(savedValues);
  }, []);

  const saveText = (id, value) => {
    setInputValues(prevInputValues => ({
      ...prevInputValues,
      [id]: value
    }));
    localStorage.setItem(id, value);
  }

  const reset = (id) => {
    localStorage.removeItem(id);
    setInputValues(prevInputValues => ({
      ...prevInputValues, [id]: ''
    }))
  }

  const clearInputs = () => {
    for (let i = 1; i <= 39; i++) {
      localStorage.removeItem(i.toString());
    }
    setInputValues({});
    setFocusedInput(null);
  };

  const expand = () => {
    setCover(true);
    setTitle(false);
  }

  const Section = (props) => {

    const inputRef = useRef(null); 

    useEffect(() => {
      if (focusedInput === props.id) {
        inputRef.current.focus(); 
      }
    }, [focusedInput, props.id]);

    return (
      <div className='section'>
        <p>{props.time}</p>
        <input
          ref={inputRef} 
          value={inputValues[props.id] || ''}
          onChange={(e) => saveText(props.id, e.target.value)}
          onFocus={() => setFocusedInput(props.id)} 
        />
        <div className='reset' onClick={() => reset(props.id)}></div>
      </div>
    )
  }

  return (
    <div className="home">
      <h1 className='title' style={{display: title ? 'block' : 'none'}}>Todays S<span onClick={clearInputs}>c</span>hedul<span onClick={expand}>e</span></h1>

      <div className={cover ? 'schedule schedule-expanded' : 'schedule'}>
        <div className='schedule-inner'>
          <Section time='05:30 - 06:00' id='1'/>
          <Section time='06:00 - 06:30' id='2'/>
          <Section time='06:30 - 07:00' id='3'/>
          <Section time='07:00 - 07:30' id='4'/>
          <Section time='07:30 - 08:00' id='5'/>
          <Section time='08:00 - 08:30' id='6'/>
          <Section time='08:30 - 09:00' id='7'/>
          <Section time='09:00 - 09:30' id='8'/>
          <Section time='09:30 - 10:00' id='9'/>
          <Section time='10:00 - 10:30' id='10'/>
          <Section time='10:30 - 11:00' id='11'/>
          <Section time='11:00 - 11:30' id='12'/>
        </div>
        <div className='schedule-inner'>
          <Section time='11:30 - 12:00' id='13'/>
          <Section time='12:00 - 12:30' id='14'/>
          <Section time='12:30 - 13:00' id='15'/>
          <Section time='13:00 - 13:30' id='16'/>
          <Section time='13:30 - 14:00' id='17'/>
          <Section time='14:00 - 14:30' id='18'/>
          <Section time='14:30 - 15:00' id='19'/>
          <Section time='15:00 - 15:30' id='20'/>
          <Section time='15:30 - 16:00' id='21'/>
          <Section time='16:00 - 16:30' id='22'/>
          <Section time='16:30 - 17:00' id='23'/>
          <Section time='17:00 - 17:30' id='24'/>
        </div>
        <div className='schedule-inner'>
          <Section time='17:30 - 18:00' id='25'/>
          <Section time='18:00 - 18:30' id='26'/>
          <Section time='18:30 - 19:00' id='27'/>
          <Section time='19:00 - 19:30' id='28'/>
          <Section time='19:30 - 20:00' id='29'/>
          <Section time='20:00 - 20:30' id='30'/>
          <Section time='20:30 - 21:00' id='31'/>
          <Section time='21:00 - 21:30' id='32'/>
          <Section time='21:30 - 22:00' id='33'/>
          <Section time='22:00 - 22:30' id='34'/>
          <Section time='22:30 - 23:00' id='35'/>
          <Section time='23:00 - 23:30' id='36'/>
        </div>
      </div>
    </div>
  )
}