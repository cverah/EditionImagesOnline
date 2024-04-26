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
      fontSize: 35,
      editingBorderColor: "rgb(179, 204, 254)",
      borderColor: "rgb(179, 204, 254)",
      borderScaleFactor: 2,
      padding: 4,
    });

    text.on("editing:entered", function () {
      this.selectAll();
      this.removeChars();
      this.set({
        borderColor: "rgb(179, 204, 254)",
        borderScaleFactor: 2,
        padding: 4,
      });
    });

    text.on("editing:exited", function () {
      if (this.text.trim() === "") {
        this.text = "Escribe aquí...";
      }

      this.set({
        borderColor: "rgb(179, 204, 254)",
        borderScaleFactor: 2,
        padding: 4,
      });

      instance.renderAll();
    });

    instance.add(text);
    instance.setActiveObject(text);
    text.enterEditing();
  };

  return <button onClick={addText}>Añadir Texto</button>;
};

export default AddTextComponent;
