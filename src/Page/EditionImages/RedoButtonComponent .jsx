const RedoButtonComponent = ({ canvasInstance }) => {
  return (
    <button
      onClick={() => canvasInstance.current && canvasInstance.current.redo()}
    >
      Rehacer
    </button>
  );
};

export default RedoButtonComponent;
