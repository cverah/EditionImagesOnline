import React from "react";

const TextControlComponent = ({
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  canvasInstance,
}) => {
  const handleFontChange = (font) => {
    const instance = canvasInstance.current;
    const activeObject = instance.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      activeObject.set({ fontFamily: font });
      setFontFamily(font);
      instance.renderAll();
    }
  };

  const handleFontSizeChange = (size) => {
    const instance = canvasInstance.current;
    const activeObject = instance.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      activeObject.set({ fontSize: size });
      setFontSize(size);
      instance.renderAll();
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
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
    </div>
  );
};

export default TextControlComponent;
