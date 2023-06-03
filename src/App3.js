import React, { useEffect, useState } from 'react'

function App3() {
    const date = new Date("June 3, 2023 19:00:00 EST")
    const calculateRemainingTime = () => {
        const now = new Date().getTime();
        const targetTime = date.getTime();
        const distance = targetTime - now;
    
        if (distance < 0) {
          // Countdown has expired
          return { hours: 0, minutes: 0, seconds: 0 };
        }
    
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
        return { hours, minutes, seconds };
      };
    
      const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
    
      useEffect(() => {
        const interval = setInterval(() => {
          const newRemainingTime = calculateRemainingTime();
    
          if (newRemainingTime.hours === 0 && newRemainingTime.minutes === 0 && newRemainingTime.seconds === 0) {
            clearInterval(interval);
          } else {
            setRemainingTime(newRemainingTime);
          }
        }, 1000);
    
        return () => {
          clearInterval(interval);
        };
      }, []);


  return (
    <div className='main'>
        <a className='brand' href='/'>Something</a>
        
        <div className='content'>
            <p>Website under maintenance</p>
            <h1>We're <span>Launching</span> Soon!</h1>
            <div className='launch-timer'>
                <div>
                    <h2>{remainingTime.hours.toString().padStart(2, '0')}</h2>
                    <p>hours</p>
                </div>
                <div>
                    <h2>{remainingTime.minutes.toString().padStart(2, '0')}</h2>
                    <p>minutes</p>
                </div>
                <div>
                    <h2>{remainingTime.seconds.toString().padStart(2, '0')}</h2>
                    <p>seconds</p>
                </div>
            </div>
        </div>
        <img src='/images/rocket.png' className='rocket'/>
    </div>
  )
}

export default App3