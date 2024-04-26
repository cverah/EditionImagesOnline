import React, { useState } from "react";

const TextControlComponent = ({
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  canvasInstance,
}) => {
  const [textColor, setTextColor] = useState("#000000");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(1);

  //cambiar color a la letra
  const handleColorChange = (color) => {
    const instance = canvasInstance.current;
    const activeObject = instance.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      activeObject.set({ fill: color });
      setTextColor(color);
      instance.renderAll();
    }
  };

  //cambiar tipo de letra
  const handleFontChange = (font) => {
    const instance = canvasInstance.current;
    const activeObject = instance.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      activeObject.set({ fontFamily: font });
      setFontFamily(font);
      instance.renderAll();
    }
  };

  //cambiar el tamaño de la letra
  const handleFontSizeChange = (size) => {
    const instance = canvasInstance.current;
    const activeObject = instance.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      activeObject.set({ fontSize: size });
      setFontSize(size);
      instance.renderAll();
    }
  };

  //poner negrita
  const handleToggleBold = () => {
    const instance = canvasInstance.current;
    const activeObject = instance.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      const newWeight = activeObject.fontWeight === "bold" ? "normal" : "bold";
      activeObject.set({ fontWeight: newWeight });
      instance.renderAll();
    }
  };

  //poner cursiva
  const handleToggleItalic = () => {
    const instance = canvasInstance.current;
    const activeObject = instance.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      const newStyle =
        activeObject.fontStyle === "italic" ? "normal" : "italic";
      activeObject.set({ fontStyle: newStyle });
      instance.renderAll();
    }
  };

  //poner subrayado
  const handleToggleUnderline = () => {
    const instance = canvasInstance.current;
    const activeObject = instance.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      const newStyle = activeObject.underline ? false : true;
      activeObject.set({ underline: newStyle });
      instance.renderAll();
    }
  };

  //activar y desactivar contorno
  const handleToggleStroke = () => {
    const instance = canvasInstance.current;
    const activeObject = instance.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      // Alternar entre stroke visible e invisible
      const hasStroke = activeObject.strokeWidth > 0;
      const newStrokeWidth = hasStroke ? 0 : 1; // Cambia esto a la anchura deseada para el stroke visible
      const newStrokeColor = hasStroke ? "" : "#000000"; // Cambia esto al color deseado para el stroke visible

      activeObject.set({ strokeWidth: newStrokeWidth, stroke: newStrokeColor });
      instance.renderAll();
    }
  };

  //cambiar color al contorno
  const handleStrokeColorChange = (color) => {
    const instance = canvasInstance.current;
    const activeObject = instance.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      activeObject.set({ stroke: color });
      setStrokeColor(color);
      instance.renderAll();
    }
  };

  //cambiar grosor al contorno
  const handleStrokeWidthChange = (width) => {
    const instance = canvasInstance.current;
    const activeObject = instance.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      activeObject.set({ strokeWidth: parseInt(width, 10) });
      setStrokeWidth(width);
      instance.renderAll();
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label>
        Color de Texto:
        <input
          type="color"
          value={textColor}
          onChange={(e) => handleColorChange(e.target.value)}
        />
      </label>
      <button onClick={handleToggleBold}>Negrita</button>
      <button onClick={handleToggleItalic}>Cursiva</button>
      <button onClick={handleToggleUnderline}>Subrayado</button>
      <label>
        Fuente:
        <select
          value={fontFamily}
          onChange={(e) => handleFontChange(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier New">Courier New</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
          <option value="Trebuchet MS">Trebuchet MS</option>
          <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Impact">Impact</option>
          {/* Agrega más opciones según necesites */}
        </select>
      </label>
      <label>
        Tamaño de Fuente:
        <input
          type="number"
          value={fontSize}
          onChange={(e) => handleFontSizeChange(parseInt(e.target.value, 10))}
          min="8"
          max="72"
        />
      </label>
      <button onClick={handleToggleStroke}>Contorno</button>
      <label>
        Color de Stroke:
        <input
          type="color"
          value={strokeColor}
          onChange={(e) => handleStrokeColorChange(e.target.value)}
        />
      </label>
      <label>
        Grosor del Stroke:
        <input
          type="range"
          value={strokeWidth}
          onChange={(e) => handleStrokeWidthChange(e.target.value)}
          min="0"
          max="10"
          step="0.1"
        />
      </label>
    </div>
  );
};

export default TextControlComponent;
