import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const FacePositionValidator = () => {
  const webcamRef = useRef(null);
  const [isPositionedCorrectly, setIsPositionedCorrectly] = useState(false);

  const loadFaceApi = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
  };

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    const img = await faceapi.bufferToImage(imageSrc);
    
    const detections = await faceapi
      .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detections) {
      // You may need to adjust these thresholds based on your use case
      const isFaceCentered = Math.abs(detections.landmarks.getNose().x - img.width / 2) < 50;
      const isFaceVisible = detections.detection._score > 0.5;

      setIsPositionedCorrectly(isFaceCentered && isFaceVisible);
    } else {
      setIsPositionedCorrectly(false);
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full h-full"
      />
      <button onClick={capture}>Capture Image</button>
      {isPositionedCorrectly ? (
        <p>User positioned correctly! Redirecting to home page...</p>
      ) : (
        <p>Please adjust your face position for proper validation.</p>
      )}
    </div>
  );
};

export default FacePositionValidator;
