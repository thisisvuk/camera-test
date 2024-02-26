import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

const MyWebcamComponent = () => {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    // Update the live feed or perform other actions with the captured image
  };

  // Use requestAnimationFrame to continuously capture frames
  const startCapture = () => {
    requestAnimationFrame(() => {
      capture();
      startCapture();
    });
  };

  useEffect(() => {
    // Start the live feed when the component mounts
    startCapture();

    // Cleanup: Stop the live feed when the component unmounts
    return () => cancelAnimationFrame(startCapture);
  }, []);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: 'user' }}
      />
      {/* You can add a button or other UI elements here if needed */}
    </div>
  );
};

export default MyWebcamComponent;
