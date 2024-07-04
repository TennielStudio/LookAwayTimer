import { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'
import DuckLaptop from "../assets/duck-laptop.png"
import TimerButtons from "./TimerButtons"
import { TWENTY_MINUTES_IN_SEC, TWENTY_SECONDS } from '../TimerConstants'

const TimerExpired = ({ timerDuration, setNextTimeInterval, setHasExpired }) => {
  if (timerDuration === TWENTY_MINUTES_IN_SEC) {
    setNextTimeInterval(TWENTY_SECONDS)
  }
  else {
    setNextTimeInterval(TWENTY_MINUTES_IN_SEC)
  }

  setHasExpired(true)
}

const MyTimer = ({expiryTimestamp, timerDuration}) => {
  const [isPaused, setIsPaused] = useState(false)
  const [nextTimeInterval, setNextTimeInterval] = useState(timerDuration)
  const [hasExpired, setHasExpired] = useState(false)

  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    autoStart: false,
    expiryTimestamp,
    onExpire: () => TimerExpired({ timerDuration:nextTimeInterval, setNextTimeInterval, setHasExpired })
  });

  useEffect (() => {
    if (hasExpired) {
      console.log('inside has expired')
      const time = new Date();
      time.setSeconds(time.getSeconds() + nextTimeInterval);
      restart(time, true)
      setIsPaused(false)
      setHasExpired(false)
    }
  }, [nextTimeInterval, restart, hasExpired])

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
    <h1>♡ My Cute Timer ♡ </h1>
      <div className="image-container">
        <img src={DuckLaptop} alt="" />
      </div>
      <p>how the girlies stay on time</p>
      <div style={{fontSize: '100px'}}>
        <span>{minutes}</span>:<span>{seconds.toString().padStart(2,'0')}</span>
      </div>

      <TimerButtons
      isRunning={isRunning}
      isPaused={isPaused}
      handleStart={handleStart}
      handlePause={handlePause}
      handleResume={handleResume}
      timerDuration={timerDuration}
      restart={restart}
      setIsPaused={setIsPaused}/>
    </div>
  );
}

export default MyTimer