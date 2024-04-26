import { useEffect } from "react";

const RemoveTextComponent = ({ canvasInstance }) => {
  const removeSelectedText = () => {
    const instance = canvasInstance.current;
    if (!instance) return;

    const activeObject = instance.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      // Comprobar si el objeto de texto está en modo de edición
      if (!activeObject.isEditing) {
        // Solo eliminar el objeto si no está en modo de edición
        instance.remove(activeObject);
        instance.discardActiveObject();
        instance.requestRenderAll();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Verificar si la tecla presionada es 'Delete' (código de tecla 46)
      if (event.keyCode === 46) {
        removeSelectedText();
      }
    };

    // Agregar el event listener al documento
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup del event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvasInstance]);

  return <button onClick={removeSelectedText}>Eliminar Texto</button>;
};

export default RemoveTextComponent;
