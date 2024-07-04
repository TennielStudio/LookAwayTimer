const TimerButtons = ({
  isRunning,
  isPaused,
  handleStart,
  handlePause,
  handleResume,
  timerDuration,
  restart,
  setIsPaused}) =>  {
  return(
    <div>
      {!isRunning && !isPaused && <button className="button" onClick={handleStart}>Start</button>}
      {isRunning && <button className="button" onClick={handlePause}>Pause</button>}
      {isPaused && <button className="button" onClick={handleResume}>Resume</button>}

      <button className="button" onClick={() => {
        // Restarts timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + timerDuration);
        restart(time, true)
        setIsPaused(false)
      }}>Restart</button>
    </div>
  )
}

export default TimerButtons