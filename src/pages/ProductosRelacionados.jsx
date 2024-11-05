import React, { useEffect, useState } from 'react';
import Slider from "react-slick";  // Importa Slider de react-slick
import "slick-carousel/slick/slick.css";  // Importa el CSS de slick-carousel
import "slick-carousel/slick/slick-theme.css";  // Importa el tema de slick-carousel
import { Link } from 'react-router-dom';  // Importa Link de react-router-dom para la navegación
import '../styles/index.css';  // Tus propios estilos
import {API_PRODUCTO} from '../../api';

const ProductosRelacionados = () => {
  const [productos, setProductos] = useState([]);  // Estado para almacenar productos
  const settings = {
    dots: true,
    infinite: false,  // Evita que se repitan los productos si son menos
    speed: 500,
    slidesToShow: Math.min(4, productos.length),  // Mostrar solo la cantidad de productos disponibles
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, productos.length),  // Ajustar según la cantidad disponible en pantallas medianas
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, productos.length),  // Ajustar para pantallas pequeñas
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(1, productos.length),  // Solo un producto en pantallas muy pequeñas
        }
      }
    ]
  };
  

  // Llamada a la API para obtener productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${API_PRODUCTO}/productos/pageable/?skip=0&limit=10`); // Reemplaza con tu endpoint
        const data = await response.json();
        setProductos(data);  // Actualiza el estado con los productos obtenidos
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();  // Llama a la función
  }, []);  // Ejecutar una vez al montar el componente

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="related-products">
      <h2>Más productos</h2>
      <Slider {...settings}>
        {productos.map((producto) => (
          <div className="related-product" key={producto.id}>
            <Link to={`/producto/${producto.id}`} onClick={handleScrollToTop}>
              <img 
                src={producto.imagen}  // Aquí se usa la URL de la imagen
                alt={producto.nombre}
                className="product-image"
              />
              <p>{producto.nombre}</p>
            </Link>
          </div>
        ))}
      </Slider>

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

export default ProductosRelacionados;
