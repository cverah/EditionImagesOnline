import { Link } from "react-router-dom";

const ImageList = ({ images }) => {
  // Obtener las vistas previas actualizadas de localStorage si están disponibles
  const getUpdatedImages = (index) => {
    const updatedPreview = localStorage.getItem(`imagePreview-${index}`);
    return updatedPreview || images[index].url;
  };

  return (
    <div>
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            display: "inline-block",
            margin: "10px",
          }}
        >
          <img
            src={getUpdatedImages(index)} // Cambia aquí para cargar la imagen actualizada
            alt={`Imagen ${index}`}
            style={{ width: "200px", height: "auto" }}
          />
          <Link
            to={`/edit/${index}`}
            style={{ position: "absolute", top: "5px", right: "5px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
