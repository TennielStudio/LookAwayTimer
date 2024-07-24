import { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'
import RealDuck from "../assets/real-duck.webp"
import Banner from "../assets/banner.png"
import TimerButtons from "./TimerButtons"
import TextBubble from "../assets/text-bubble.png"
import Laptop from "../assets/laptop.webp"
import Toast from "../assets/toast.webp"
import Quack from "../assets/quack.mp3"
import { TWENTY_MINUTES_IN_SEC, TWENTY_SECONDS } from '../TimerConstants'

const TimerExpired = ({ timerDuration, setNextTimeInterval, setHasExpired }) => {
  new Audio(Quack).play();

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
    <div className="full-page" style={{textAlign: 'center'}}>
      <div className="title-container">
        <h1 className="title">♡ DuckyVision 3000 ♡ </h1>
        <div className="banner-container">
            <img src={Banner} alt="" />
        </div>
      </div>

      <div className="credits-container">
          <p className="credits">
          made with 💖 - <a href="https://twitter.com/tennielstudio" target="_blank" rel="noopener noreferrer">tenniel</a>
          </p>
      </div>

      <div className="timer">
        <div className="time" style={{fontSize: '100px'}}> 
          <span>{minutes}</span>:<span>{seconds.toString().padStart(2,'0')}</span>
      </div>
    
        <div className="timer-buttons">
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
      </div>

      <div className="lower-page-container">
        <div className="instructions-container">
          <p className="instructions">
          Every 20 minutes look 20 feet away for 20 seconds.
          </p>
        </div>
        <div className="duck-container">
          <img className="real-duck" src={RealDuck} alt="" />
        </div>
        <div className="text-bubble-content-container">
          <p className="text-bubble-content">
            Ducks have <a href="https://www.themeateater.com/hunt/waterfowl/the-truth-about-duck-vision" target="_blank" rel="noopener noreferrer">better vision than humans!</a>
            &nbsp;Why? We take regular screen breaks.
            And we use this timer to do it. Quack.</p>
          </div>
        <div className="text-bubble-container">
          <img className="text-bubble" src={TextBubble} alt=""/>
        </div>
        <div className="laptop-container">
          <img className="laptop" src={Laptop} alt=""/>
        </div>
        <div className="toast-container">
          <img className="toast" src={Toast} alt=""/>
        </div>
        <div className="yummy-taas-link-container">
          <a className="yummy-taas-link" href="https://www.yummytaas.com/" target="_blank" rel="noopener noreferrer"/>
        </div>
        <div className="laptop-credit-container">
          <a className="laptop-credit-link" href="https://www.vecteezy.com/free-vector/pixel" target="_blank" rel="noopener noreferrer">Pixel Vectors by Vecteezy</a>
        </div>
      </div>
    </div>
  );
}

export default MyTimer