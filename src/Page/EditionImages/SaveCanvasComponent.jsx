const SaveCanvasComponent = ({ canvasInstance, navigate, id }) => {
  const saveCanvas = () => {
    const instance = canvasInstance.current;
    if (!instance) return;

    const state = instance.toJSON();
    localStorage.setItem(`canvasState-${id}`, JSON.stringify(state));
    const dataURL = instance.toDataURL();
    localStorage.setItem(`imagePreview-${id}`, dataURL);

    alert("Cambios guardados correctamente.");
    navigate("/");
  };

  return <button onClick={saveCanvas}>Guardar Cambios</button>;
};

export default SaveCanvasComponent;
