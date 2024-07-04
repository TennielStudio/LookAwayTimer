import './styles.css'
import MyTimer from './components/MyTimer'
import { TWENTY_MINUTES_IN_SEC } from './TimerConstants'

function App() {
  const time = new Date(); // anchor ourselves in current time
  time.setSeconds(time.getSeconds() + TWENTY_MINUTES_IN_SEC); // 20 minutes timer <- this updates the date object to exactly 20 mins in the future
  return (
    <div>
      <MyTimer expiryTimestamp={time} timerDuration={TWENTY_MINUTES_IN_SEC} />
    </div>
  );
}

export default App
