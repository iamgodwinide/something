import React, { useRef, useEffect, useState } from 'react';
import image from './img/question.png'
import './index2.css'

const App2 = () => {

  const [started, setStarted] = useState(false);
  const canvasRef = useRef(null);
  const images = ['./img/question.png', './img/question.png', './img/question.png' ]; // Replace with your image URLs
  const snowflakeSize = 50; // Adjust the size of the snowflakes
  const colorTransitionDuration = 5000; // Adjust the duration of the color transition (in milliseconds)

  // Define the custom vibration pattern for the melody
  const melodyPattern = [2000000, 200, 400, 400, 400, 800, 400, 800, 400];

  // Function to play the melody
  function playMelody() {
    for (let i = 0; i < melodyPattern.length; i++) {
      // Vibrate the device with the current duration
      navigator.vibrate(melodyPattern[i]);

      // Delay before the next vibration segment
      const nextDelay = melodyPattern[i] + 100;
      setTimeout(() => {
        // Stop vibration after the current duration
        navigator.vibrate(0);
      }, nextDelay);
    }
  }

  // Call the playMelody function to start playing the melody
  
  const handleClick = () => {
    setStarted(true);
    const audio = new Audio("/audio/tone2.mp3");
    audio.currentTime = .07;
    audio.play();
    playMelody()
}


  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let snowflakes = [];
    let currentColor = getRandomColor();
    let targetColor = getRandomColor();

    // Function to create a snowflake
    const createSnowflake = () => {
      const imageSrc = images[Math.floor(Math.random() * images.length)];
      const image = new Image();
      image.src = imageSrc;

      const snowflake = {
        x: Math.random() * canvas.width, // Randomize the horizontal position
        y: 0, // Start at the top of the canvas
        speed: Math.random() * 2 + 1, // Randomize the falling speed
        image,
      };

      snowflakes.push(snowflake);
    };

    // Function to draw snowflakes on the canvas
    const drawSnowflakes = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      snowflakes.forEach((snowflake) => {
        context.drawImage(snowflake.image, snowflake.x, snowflake.y, snowflakeSize, snowflakeSize);
        snowflake.y += snowflake.speed;

        if (snowflake.y > canvas.height) {
          // Remove snowflake if it falls beyond the canvas height
          const index = snowflakes.indexOf(snowflake);
          snowflakes.splice(index, 1);
        }
      });

      requestAnimationFrame(drawSnowflakes);
    };

    // Function to handle window resize and adjust canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize canvas dimensions on component mount and add event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Create snowflakes every 100 milliseconds
    const snowflakeInterval = setInterval(createSnowflake, 100);

    // Start drawing snowflakes on the canvas
    drawSnowflakes();

    // Function to smoothly transition the background color
    const transitionColor = () => {
      currentColor = targetColor;
      targetColor = getRandomColor();

      canvas.style.transition = `background-color ${colorTransitionDuration}ms linear`;
      canvas.style.backgroundColor = targetColor;

      setTimeout(transitionColor, colorTransitionDuration);
    };

    // Start the initial color transition
    transitionColor();

    // Helper function to generate a random color
    function getRandomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    // Clean up on component unmount
    return () => {
      clearInterval(snowflakeInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return(
    <div className='root'>
        <canvas
                    onClick={handleClick}

        ref={canvasRef} style={{ 
            opacity: started ? 1 : 0,
            position: 'fixed', top: 0, left: 0 }} />
            <div
             style={{
                opacity: started ? 0 : 1
            }}
            >
                <img src={image} className='imagea'
                    onClick={handleClick}
                />
            </div>
    </div>
    )

};

export default App2;
