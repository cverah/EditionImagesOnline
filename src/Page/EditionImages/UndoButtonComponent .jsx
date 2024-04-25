const UndoButtonComponent = ({ canvasInstance }) => {
  return (
    <button
      onClick={() => canvasInstance.current && canvasInstance.current.undo()}
    >
      Deshacer
    </button>
  );
};
export default UndoButtonComponent;
