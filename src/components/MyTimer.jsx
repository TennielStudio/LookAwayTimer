import { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'
import RealDuck from "../assets/real-duck.webp"
import Banner from "../assets/banner.png"
import TimerButtons from "./TimerButtons"
import TextBubble from "../assets/text-bubble.png"
import Laptop from "../assets/laptop.webp"
import Toast from "../assets/toast.webp"
import Quack from "../assets/quack.mp3"
import TimerBeep from "../assets/timer-done.mp3"
import { TWENTY_MINUTES_IN_SEC, TWENTY_SECONDS } from '../TimerConstants'

const TimerExpired = ({ timerDuration, setNextTimeInterval, setHasExpired }) => {
  new Audio(TimerBeep).play();

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

  const playQuack = () => {
    new Audio(Quack).play();
  }

  return (
    <div className="full-page" style={{textAlign: 'center'}}>
      <div className="upper-page-container">
        <div className="title-container">
          <h1 className="title">♡ not a staring contest ♡ </h1>
        </div>
        <div className="banner-container">
          <img src={Banner} alt="" />
        </div>

        <div className="credits-container">
            <p className="credits">
            coded with 💖 - <a href="https://twitter.com/tennielstudio" target="_blank" rel="noopener noreferrer">tenniel</a>
            </p>
        </div>

        <div className="timer-container">
          <div className="time"> 
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
        <div className="instructions-container">
          <p className="instructions">
          Every 20 minutes look 20 feet away for 20 seconds.
          </p>
        </div>
      </div>
      
      <div className="duck-text-container">
        <div className="duck-container">
          <img className="real-duck" src={RealDuck} alt="" />
        </div>
        <div className="text-bubble-content-container">
          <p className="text-bubble-content">
            Ducks have <a href="https://www.themeateater.com/hunt/waterfowl/the-truth-about-duck-vision" target="_blank" rel="noopener noreferrer">better vision than humans!</a>
            &nbsp;Why? We take regular screen breaks. And
            we use this timer to do it. Quack.</p>
        </div>
        <div className="text-bubble-container">
          <img className="text-bubble" src={TextBubble} alt=""/>
        </div>
        <div className="laptop-container">
          <img className="laptop" src={Laptop} alt=""/>
        </div>
        <div className="toast-container">
          <a className="yummy-taas-link" href="https://www.yummytaas.com/" target="_blank" rel="noopener noreferrer">
            <img className="toast" src={Toast} alt=""/>
          </a>
        </div>
        <div className="laptop-credit-container">
          <a className="laptop-credit-link" href="https://www.vecteezy.com/free-vector/pixel" target="_blank" rel="noopener noreferrer">Pixel Vectors by Vecteezy</a>
        </div>
      </div>
      
        <div className="notes-container">
          <div className="duck-story-container">
            <p className="duck-story" onClick={playQuack}>
            Click here to watch mr.duckington's story :3
            </p>
          </div>
          <div className="look-away-timer-story-container">
            <p className="look-away-timer-story">
              <b>Tenniel's Sticky Note:</b><br /><br />
              Why do your eyes dry up like little raisins by the end of the day??<br />
              Because you never break eye contact with the screen 😩<br />
              <br />
              This works in romantic relationships but you're not dating your computer, right??<br />
              That's why I built this reminder :)<br />
              <br />
              When the 20-min timer ends, you'll hear a beep. This starts a 20-sec break. After the break ends, you can resume work!<br />
              <br />
              Here are some eye-saving alternatives from my <a href="https://twitter.com/tennielstudio/status/1806350277458411924" target="_blank" rel="noopener noreferrer">x community</a>:<br />
              (These are affiliate links btw)<br /><br />
              1. <a href="https://amzn.to/4dmE8bz" target="_blank" rel="noopener noreferrer">Steamy eye masks</a><br />
              2. <a href="https://amzn.to/4dqNrr1" target="_blank" rel="noopener noreferrer">Eye pillows</a><br />
              3. <a href="https://amzn.to/4fH2bDK" target="_blank" rel="noopener noreferrer">Omega 3s (not medical advice lol)</a><br /><br />
              If you found this helpful, share this with another screen enjoyer to save a life or dm me on <a href="https://twitter.com/tennielstudio" target="_blank" rel="noopener noreferrer">X</a> to let me know!!<br />
              <br />
              Hope this makes your work day a bit brighter!<br />
              Xoxo - Tenniel 💖<br />
            </p>
          </div>
        </div>
    </div>
  );
}

export default MyTimer