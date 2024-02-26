import React from 'react';
import Webcam from 'react-webcam';

const MyWebcamComponent = () => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("url: " + imageSrc);
  }, [webcamRef]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: 'user' }}
      />
      <button onClick={capture}>Capture Photo</button>
    </div>
  );
};

export default MyWebcamComponent;
