const DownloadImageComponent = ({ canvasInstance }) => {
  const downloadImage = () => {
    const instance = canvasInstance.current;
    if (!instance) return;
    const dataURL = instance.toDataURL({ format: "png", quality: 1 });
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = dataURL;
    link.click();
  };

  return <button onClick={downloadImage}>Descargar imagen</button>;
};

export default DownloadImageComponent;
