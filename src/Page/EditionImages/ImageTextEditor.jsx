import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { useNavigate, useParams } from "react-router-dom";

const ImageTextEditor = ({ images }) => {
  const { id } = useParams();
  const imageUrl = images[id].url;
  const canvasRef = useRef(null);
  const canvasInstance = useRef(null); // Mantiene la instancia de fabric.Canvas
  const navigate = useNavigate();

  useEffect(() => {
    if (canvasRef.current && !canvasInstance.current) {
      const instance = new fabric.Canvas(canvasRef.current);
      instance.setHeight(600);
      instance.setWidth(1000);

      // Cargar estado guardado si existe
      const savedState = localStorage.getItem(`canvasState-${id}`);
      if (savedState) {
        instance.loadFromJSON(savedState, instance.renderAll.bind(instance));
      } else {
        fabric.Image.fromURL(imageUrl, function (img) {
          img.scaleToWidth(1000);
          img.scaleToHeight(600);
          instance.setBackgroundImage(img, instance.renderAll.bind(instance));
        });
      }

      instance.on("mouse:dblclick", function (e) {
        const activeObject = instance.getActiveObject();
        if (activeObject && activeObject.type === "i-text") {
          activeObject.enterEditing();
        }
      });

      canvasInstance.current = instance;
    }
  }, [id, imageUrl]);

  const addText = () => {
    const instance = canvasInstance.current;
    if (!instance) return;

    const placeholderText = "Escribe aquí...";
    const text = new fabric.IText(placeholderText, {
      left: 50,
      top: 50,
      fontFamily: "Arial",
      fill: "#fff",
      stroke: "#000",
      strokeWidth: 1,
      fontSize: 24,
      editingBorderColor: "#000000",
    });

    // Evento cuando el texto entra en modo edición
    text.on("editing:entered", function () {
      // Verifica si el texto es igual al placeholder al entrar en edición
      if (this.text === placeholderText) {
        this.selectAll(); // Selecciona todo el texto
        this.removeChars(); // Elimina el texto seleccionado
      }
    });

    // Evento cuando el texto sale del modo edición
    text.on("editing:exited", function () {
      if (this.text.trim() === "") {
        this.text = placeholderText; // Restablece el texto del placeholder si no hay texto
      }
      instance.renderAll(); // Vuelve a renderizar el canvas
    });

    instance.add(text);
    instance.setActiveObject(text);
    text.enterEditing();
  };

  const removeSelectedText = () => {
    const instance = canvasInstance.current;
    if (!instance) return;

    const activeObject = instance.getActiveObject();
    // Verifica que el objeto activo sea un objeto de texto
    if (activeObject && activeObject.type === "i-text") {
      instance.remove(activeObject); // Elimina el objeto activo del canvas
      instance.discardActiveObject(); // Deselecciona cualquier objeto activo
      instance.requestRenderAll(); // Solicita que se vuelva a renderizar el canvas
    }
  };

  const downloadImage = () => {
    const instance = canvasInstance.current;
    if (!instance) return;
    const dataURL = instance.toDataURL({ format: "png", quality: 1 });
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = dataURL;
    link.click();
  };

  const saveCanvas = () => {
    const instance = canvasInstance.current;
    if (!instance) return;

    // Guarda el estado del canvas para su recuperación posterior
    const state = instance.toJSON();
    localStorage.setItem(`canvasState-${id}`, JSON.stringify(state));

    // Guarda la representación de la imagen como Data URL
    const dataURL = instance.toDataURL();
    localStorage.setItem(`imagePreview-${id}`, dataURL);

    alert("Cambios guardados correctamente.");
    navigate("/");
  };

  return (
    <div>
      <canvas ref={canvasRef} id="canvas" width={1000} height={600} />
      <div>
        <button onClick={addText}>Añadir Texto</button>
        <button onClick={removeSelectedText}>Eliminar Texto</button>
        <button onClick={downloadImage}>Descargar imagen</button>
        <button onClick={saveCanvas}>Guardar Cambios</button>
      </div>
    </div>
  );
};

export default ImageTextEditor;
