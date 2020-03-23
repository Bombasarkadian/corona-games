import React, { useState, useEffect } from "react";
import Drawing from "./Drawing";
import Toolbar from "./Toolbar";
import simplify from "simplify-path";

const DrawArea = ({initialLines, width, height, onUpdate}) => {
  const [lines, setLines] = useState(initialLines || []);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#424953");
  const [penSize, setPenSize] = useState(3);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const addPointFromEvent = (event, addLine=false) => {
    const point = relativeCoordsForEvent(event);
    const newLines = [...lines];
    if (addLine) newLines.push({points: [], color: penColor, width: penSize});
    const lastLine = newLines[newLines.length - 1];
    lastLine.points = simplify([...lastLine.points, point], 1.05);

    setLines(newLines);
    if(onUpdate) {
      window.requestAnimationFrame(() => onUpdate(newLines));
    }
  }

  const relativeCoordsForEvent = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    return [clientX - left, clientY - top];
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    addPointFromEvent(e, true);
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      addPointFromEvent(e);
    }
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
  };

  const handleClearAll = () => {
    setLines([]);
    if(onUpdate) onUpdate([]);
  }

  const handleUndo = () => {
    lines.pop();
    setLines(lines);
    if(onUpdate) onUpdate(lines);
  }

  return (
    <div style={{
      width: `${width}px`,
      height: `${parseFloat(height) + 43}px`,
      margin: "0 auto",
    }}>
      <Toolbar currentColor={penColor} onColorChange={setPenColor} onSizeChange={setPenSize} onClearAll={handleClearAll} onUndoDrawing={handleUndo} width={width} height={20} />
      <div id="draw-area"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        style={{cursor: "crosshair"}}>
        <Drawing width={width} height={height} lines={lines} />
      </div>
    </div>
  )
};

export default DrawArea;
