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
    <div>
      <label>
        Fuente:
        <select
          value={fontFamily}
          onChange={(e) => handleFontChange(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
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
