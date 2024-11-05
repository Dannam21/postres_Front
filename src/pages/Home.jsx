import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import "../styles/App.css"; 
import cookieImage from "../img/banner.png"; 
import "../styles/index.css"; 
import {API_PRODUCTO} from '../../api';

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${API_PRODUCTO}/productos/pageable/?skip=0&limit=10`);
        if (!response.ok) {
          throw new Error("Error al obtener productos");
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProductos();
  }, []);

  // Función para desplazarse hacia arriba
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <section className="hero">
        <div className="hero-images">
          <img src={cookieImage} alt="Cookie" className="cookie-image" />
        </div>
      </section>

      <div className="productos-title">
        <h2>Productos</h2>
      </div>

      <section className="productos">
        {productos.map((producto) => (
          <div className="product" key={producto.id}>
            <img 
              src={producto.imagen}  // Aquí se usa la URL de la imagen
              alt={producto.nombre}
              className="producto-image"
            />
            <Link to={`/producto/${producto.id}`} onClick={handleScrollToTop}>
              <button className="producto-btn">{producto.nombre}</button>
            </Link>
          </div>
        ))}
      </section>

      <footer>
        <div className="footer-info">
          <div className="pages"></div>
          <div className="sienna">
            <h4>DOLCE</h4>
            <ul>
              <li><a href="/home">Inicio</a></li>
              <li><a href="/home">DOLCE</a></li>
            </ul>
          </div>
          <div className="information">
            <h4>INFORMACIÓN</h4>
            <ul>
              <li><a href="#envios">Envíos y Devolución</a></li>
              <li><a href="#terms">Términos y Condiciones</a></li>
              <li><a href="#privacy">Política de Privacidad</a></li>
            </ul>
          </div>
          <div className="social">
            <h4>SÍGUENOS</h4>
            <ul>
              <li><a href="#facebook">Facebook</a></li>
              <li><a href="#instagram">Instagram</a></li>
            </ul>
          </div>
        </div>
        <p className="footer-text">© 2024 Dolce Bakery. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
