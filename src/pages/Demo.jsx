import React, { useEffect } from "react";
import Canvas from "../templates/Canvas";

export const Demo2D = () => {
  
    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'

        // Adjust the pulsation frequency and amplitude as needed
        const pulseAmplitude = 20;
        const pulseFrequency = 0.02;
        const pulse = pulseAmplitude * Math.sin(frameCount * pulseFrequency);

        ctx.beginPath();
        ctx.moveTo(75, 40 - pulse);
        ctx.bezierCurveTo(75, 37 - pulse, 70, 25 - pulse, 50, 25 - pulse);
        ctx.bezierCurveTo(20, 25 - pulse, 20, 62.5 - pulse, 20, 62.5 - pulse);
        ctx.bezierCurveTo(20, 80 - pulse, 40, 102 - pulse, 75, 120 - pulse);
        ctx.bezierCurveTo(110, 102 - pulse, 130, 80 - pulse, 130, 62.5 - pulse);
        ctx.bezierCurveTo(130, 62.5 - pulse, 130, 25 - pulse, 100, 25 - pulse);
        ctx.bezierCurveTo(85, 25 - pulse, 75, 37 - pulse, 75, 40 - pulse);
        ctx.fill();
    }
      
    return (
        <div className="dif2">
    <Canvas draw={draw} />
        </div>
    )
}

export default Demo2D;
