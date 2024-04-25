import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useNavigate, useParams } from "react-router-dom";
import AddTextComponent from "./AddTextComponent";
import RemoveTextComponent from "./RemoveTextComponent";
import DownloadImageComponent from "./DownloadImageComponent";
import SaveCanvasComponent from "./SaveCanvasComponent";
import TextControlComponent from "./TextControlsComponent";
import UndoButtonComponent from "./UndoButtonComponent ";
import RedoButtonComponent from "./RedoButtonComponent ";

const ImageTextEditor = ({ images }) => {
  const { id } = useParams();
  const imageUrl = images[id].url;
  const canvasRef = useRef(null);
  const canvasInstance = useRef(null); // Mantiene la instancia de fabric.Canvas
  const navigate = useNavigate();
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(24);

  useEffect(() => {
    if (canvasRef.current && !canvasInstance.current) {
      const instance = new fabric.Canvas(canvasRef.current);
      instance.setHeight(600);
      instance.setWidth(1000);

      // Inicializar las pilas aquí
      instance.undoStack = [];
      instance.redoStack = [];

      // Define funciones de deshacer y rehacer
      instance.undo = function () {
        if (this.undoStack.length > 0) {
          const lastAction = this.undoStack.pop();
          this.redoStack.push(lastAction);
          requestAnimationFrame(() => {
            this.loadFromJSON(lastAction, this.renderAll.bind(this));
          });
        }
      };

      instance.redo = function () {
        if (this.redoStack.length > 0) {
          const nextAction = this.redoStack.pop();
          this.undoStack.push(nextAction);
          requestAnimationFrame(() => {
            this.loadFromJSON(nextAction, this.renderAll.bind(this));
          });
        }
      };

      // Añade el estado inicial al undoStack después de definir `undo` y `redo`
      if (localStorage.getItem(`canvasState-${id}`)) {
        instance.loadFromJSON(localStorage.getItem(`canvasState-${id}`), () => {
          instance.renderAll.bind(instance);
          instance.undoStack.push(instance.toJSON()); // Guardar estado inicial
        });
      } else {
        fabric.Image.fromURL(imageUrl, (img) => {
          img.scaleToWidth(1000);
          img.scaleToHeight(600);
          instance.setBackgroundImage(img, () => {
            instance.renderAll.bind(instance);
            instance.undoStack.push(instance.toJSON()); // Guardar estado inicial
          });
        });
      }

      instance.on("object:modified", function () {
        this.undoStack.push(this.toJSON());
      });

      instance.on("selection:created", (e) => {
        setIsTextSelected(
          e.selected && e.selected[0] && e.selected[0].type === "i-text"
        );
      });

      instance.on("selection:updated", (e) => {
        setIsTextSelected(
          e.selected && e.selected[0] && e.selected[0].type === "i-text"
        );
      });

      instance.on("selection:cleared", () => {
        setIsTextSelected(false);
      });

      instance.on("mouse:dblclick", function (e) {
        const activeObject = instance.getActiveObject();
        if (activeObject && activeObject.type === "i-text") {
          activeObject.enterEditing();
        }
      });

      canvasInstance.current = instance;
    }
  }, [id, imageUrl]);

  return (
    <div>
      <div>
        {isTextSelected && (
          <TextControlComponent
            canvasInstance={canvasInstance}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        )}
      </div>
      <canvas ref={canvasRef} id="canvas" width={1000} height={600} />
      <div>
        <AddTextComponent
          canvasInstance={canvasInstance}
          fontFamily={fontFamily}
          fontSize={fontSize}
        />
        <RemoveTextComponent canvasInstance={canvasInstance} />
        <DownloadImageComponent canvasInstance={canvasInstance} />
        <SaveCanvasComponent
          canvasInstance={canvasInstance}
          navigate={navigate}
          id={id}
        />
        <UndoButtonComponent canvasInstance={canvasInstance} />
        <RedoButtonComponent canvasInstance={canvasInstance} />
      </div>
    </div>
  );
};

export default ImageTextEditor;
