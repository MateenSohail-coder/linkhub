import { useRef, useState, useEffect } from "react";

const InteractiveLoader = ({ size = 100, color = "#caff57" }) => {
  const loaderRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastAngle = useRef(0);

  const getAngle = (x, y) => {
    const rect = loaderRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    lastAngle.current = getAngle(e.clientX, e.clientY);
    loaderRef.current.style.animationPlayState = "paused"; // pause CSS rotation
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const angle = getAngle(e.clientX, e.clientY);
    const delta = angle - lastAngle.current;
    lastAngle.current = angle;
    setRotation((prev) => prev + delta);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    loaderRef.current.style.animationPlayState = "running"; // resume CSS rotation
  };

  return (
    <div
      className="w-full h-full fixed top-0 left-0 z-50 bg-black/50 flex items-center justify-center"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div
        ref={loaderRef}
        onPointerDown={handlePointerDown}
        style={{
          width: size,
          height: size,
          border: `8px solid ${color}`,
          borderTopColor: "transparent",
          borderRadius: "50%",
          cursor: "grab",
          transform: `rotate(${rotation}deg)`,
          animation: "spin 1s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default InteractiveLoader;
