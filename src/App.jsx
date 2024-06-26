import { useState } from 'react'
import { useTimer } from 'react-timer-hook'
import './styles.css'

// Constants
const SECONDS_TO_JUMP = 1200 

function MyTimer ({ expiryTimestamp }) {
  const [isPaused, setIsPaused] = useState(false)

  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ autoStart: false, expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  const handlePause = () => {
    pause()
    setIsPaused(true)
  }

  const handleResume = () => {
    resume()
    setIsPaused(false)
  }

  const handleStart = () => {
    start()
    setIsPaused(false)
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h1>♡ My Timer ♡ </h1>
      <p>Timer Demo</p>
      <div style={{fontSize: '100px'}}>
        <span>{minutes}</span>:<span>{seconds.toString().padStart(2,'0')}</span>
      </div>
      
      {!isRunning && !isPaused && <button className="button" onClick={handleStart}>Start</button>}
      {isRunning && <button className="button" onClick={handlePause}>Pause</button>}
      {isPaused && <button className="button" onClick={handleResume}>Resume</button>}

      <button className="button" onClick={() => {
        // Restarts timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + SECONDS_TO_JUMP);
        restart(time, false)
        setIsPaused(false)
      }}>Restart</button>
    </div>
  );
}

function App() {
  const time = new Date(); // anchor ourselves in current time
  time.setSeconds(time.getSeconds() + SECONDS_TO_JUMP); // 20 minutes timer <- this updates the date object to exactly 20 mins in the future
  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}

export default App
