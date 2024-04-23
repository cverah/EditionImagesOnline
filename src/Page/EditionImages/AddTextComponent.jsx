import { fabric } from "fabric";

const AddTextComponent = ({ canvasInstance, fontFamily, fontSize }) => {
  const addText = () => {
    const instance = canvasInstance.current;
    if (!instance) return;

    const text = new fabric.IText("Escribe aquí...", {
      left: 50,
      top: 50,
      fontFamily,
      fill: "#fff",
      stroke: "#000",
      strokeWidth: 1,
      fontSize,
      editingBorderColor: "#000000",
    });

    text.on("editing:entered", function () {
      this.selectAll();
      this.removeChars();
    });

    text.on("editing:exited", function () {
      if (this.text.trim() === "") {
        this.text = "Escribe aquí...";
      }
      instance.renderAll();
    });

    instance.add(text);
    instance.setActiveObject(text);
    text.enterEditing();
  };

  return <button onClick={addText}>Añadir Texto</button>;
};

export default AddTextComponent;
