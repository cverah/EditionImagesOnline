const RemoveTextComponent = ({ canvasInstance }) => {
  const removeSelectedText = () => {
    const instance = canvasInstance.current;
    if (!instance) return;

    const activeObject = instance.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      instance.remove(activeObject);
      instance.discardActiveObject();
      instance.requestRenderAll();
    }
  };

  return <button onClick={removeSelectedText}>Eliminar Texto</button>;
};

export default RemoveTextComponent;
