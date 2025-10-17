import React from "react";

function ServiceVideo() {
  return (
    <div className="flex items-center justify-center">
      <video
        src="https://framerusercontent.com/assets/X4WMcgpwDRngGVOj4ArVeLJWQ.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full max-w-4xl"
      />
    </div>
  );
}

export default ServiceVideo;
