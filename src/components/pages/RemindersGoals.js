import { useState, useEffect } from 'react';
import { renderMatches } from 'react-router-dom';
import '../styles/RemindersGoals.css';

export const RemindersGoals = () => {

  const [newReminder, setNewReminder] = useState('');
  const [reminders, setReminders] = useState([]);
  const [deleteCompleteButtons, setDeleteCompleteButtons] = useState(Array(10).fill(false));
  const [chevronDown, setChevronDown] = useState(Array(10).fill(true));
  const [complete, setComplete] = useState(Array(10).fill(false));

  const saveRemindersToLocalStorage = (reminders) => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  };

  const getRemindersFromLocalStorage = () => {
    const storedReminders = localStorage.getItem('reminders');
    return storedReminders ? JSON.parse(storedReminders) : [];
  };

  useEffect(() => {
    const storedReminders = getRemindersFromLocalStorage();
    if (storedReminders.length > 0) {
      setReminders(storedReminders);
    }
  }, []);

  useEffect(() => {
    saveRemindersToLocalStorage(reminders);
  }, [reminders]);

  const createReminder =  () => {
    if (newReminder !== '') {
      const newItem = {
        name: newReminder,
        id: reminders.length === 0 ? 1 : reminders[reminders.length - 1].id + 1,
        completed: false
      }
      setReminders([...reminders, newItem]);
      const input =  document.getElementById('createReminderInput')
      input.value = '';
      setNewReminder('');
    }
  }

  const toggleButtons = (id, showBtn, showChev) => {
    const updatedButtons = [...deleteCompleteButtons];
    updatedButtons[id - 1] = showBtn;
    setDeleteCompleteButtons(updatedButtons);

    const chevron = [...chevronDown];
    chevron[id - 1] = showChev;
    setChevronDown(chevron);
  }

  const setCompleted = (id) => {
    const completeArray = [...complete];
    completeArray[id - 1] = true;
    setComplete(completeArray);

    const updatedButtons = [...deleteCompleteButtons];
    updatedButtons[id - 1] = false;
    setDeleteCompleteButtons(updatedButtons);
  }

  const setUncompleted = (id) => {
    const completeArray = [...complete];
    completeArray[id - 1] = false;
    setComplete(completeArray);

    const chevron = [...chevronDown];
    chevron[id - 1] = true;
    setChevronDown(chevron);
  }

  const deleteReminder = (id) => {
    setReminders(reminders.filter((item) => item.id !== id));
    toggleButtons(id, false, true);
  }
  
  return (
    <div className="reminders-goals">
      <div className='reminders-goals-inner'>

        <div className='reminders'>
          <h3 className='rg-title'>Add reminders to your list</h3>

          <div className='create-reminder'>
            <input id='createReminderInput' onChange={(e) => setNewReminder(e.target.value)}/>
            <button onClick={createReminder}><i className='fa fa-plus'></i></button>
          </div>

          <div className='reminders-list'>

                <div className='reminder reminder-ghost' style={{'display': reminders.length === 0 ? 'flex' : 'none'}}>
                  <p><i className='fa fa-circle'></i>You have no reminders in your list!</p>
                  <i className='fa fa-chevron-down'></i>
                </div>

            {reminders.map((reminder) => {
              return (
                <div className='reminder' style={{'backgroundColor': complete[reminder.id - 1] ? 'rgb(172, 255, 139)' : 'rgb(238, 238, 238)'}}>

                  <p onClick={() => {toggleButtons(reminder.id, false, true)}}><i className='fa fa-circle'></i>{reminder.name}</p>
                  <i className='fa fa-chevron-down' onClick={() => {toggleButtons(reminder.id, true, false)}} style={{'display': chevronDown[reminder.id - 1] ? 'flex' : 'none'}}></i>

                  <div className='reminder-buttons' 
                       id='reminderButtonDiv' 
                       style={{'display': deleteCompleteButtons[reminder.id - 1] ? 'flex' : 'none'}}>
                    <button className='reminder-delete-button' onClick={() => deleteReminder(reminder.id)}><i className='fa fa-trash'></i></button>
                    <span></span>
                    <button className='reminder-complete-button' onClick={() => setCompleted(reminder.id)}><i className='fa fa-check'></i></button>
                  </div>
                  <i className='fa fa-check reminder-completed-icon' style={{'display': complete[reminder.id - 1] ? 'flex' : 'none'}} onClick={() => setUncompleted(reminder.id)}></i>
                </div>
              )
            })}
          </div>
    
        </div>

      </div>
    </div>
  )
}

