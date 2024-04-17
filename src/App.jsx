import ImgPrueba from "../src/img/img_prueba.jpg";
import ImgPruebaTexto from "../src/img/img_texto.png";
import ImgIa from "../src/img/img_text_ia.webp";
import { Route, Routes } from "react-router-dom";
import ListImages from "./Page/EditionImages/ListImages";
import ImageTextEditor from "./Page/EditionImages/ImageTextEditor";

const App = () => {
  const images = [
    { url: ImgPrueba },
    { url: ImgPruebaTexto },
    { url: ImgIa },
    // Agrega más imágenes según sea necesario
  ];

  return (
    <div>
      <Routes>
        <Route path="/" element={<ListImages images={images} />} />
        <Route path="/edit/:id" element={<ImageTextEditor images={images} />} />
      </Routes>
    </div>
  );
};

export default App;
