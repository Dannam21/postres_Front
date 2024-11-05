import React, { useState, useEffect, useContext } from 'react'; // Asegúrate de incluir useEffect y useContext
import '../styles/index.css';
import ProductosRelacionados from './ProductosRelacionados'; // Asegúrate de que la ruta es correcta
import { CartContext } from '../context/CartContext'; // Importa el CartContext
import {API_PRODUCTO} from '../../api';

const Galleta = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("/src/img/galleta.png");
  const [price, setPrice] = useState(0); // Estado para almacenar el precio
  const [name, setName] = useState(""); // Estado para almacenar el nombre del producto
  const [description, setDescription] = useState(""); // Estado para almacenar la descripción

  const { addItemToCart } = useContext(CartContext); // Ahora esto debería funcionar

  // UseEffect para obtener los detalles del producto
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${API_PRODUCTO}/productos/1`); // Reemplaza con tu endpoint para obtener el producto por ID
        if (!response.ok) {
          throw new Error("Error al obtener el producto");
        }
        const data = await response.json();
        setName(data.nombre); // Almacena el nombre en el estado
        setDescription(data.descripcion); // Almacena la descripción en el estado
        setPrice(data.precio); // Almacena el precio en el estado
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProductDetails();
  }, []); // Ejecutar solo una vez al montar el componente

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc); // Cambiar la imagen principal al hacer clic en una miniatura
  };

  const handleAddToCart = () => {
    const item = {
      id: 1,
      name,  // Utiliza el nombre desde el estado
      price,
      description: description,  // Incluye la descripción desde el estado
      quantity,
      image: selectedImage,
      size: "Mediano", // Puedes agregar más detalles según sea necesario
    };

    addItemToCart(item); // Añadir el producto al carrito
    alert("Producto añadido al carrito!"); // Alerta opcional para notificar al usuario
  };

  return (
    <div className="product-page">
      <main>
        <section className="product-images">
          <div className="thumbnails">
            {/* Las miniaturas que cambian la imagen principal al hacer clic */}
            <img 
              src="/src/img/galleta.png" 
              alt="Galleta de chocolate" 
              onClick={() => handleImageClick("/src/img/galleta.png")} 
            />
            <img 
              src="/src/img/galleta1.png" 
              alt="Galleta" 
              onClick={() => handleImageClick("/src/img/galleta1.png")} 
            />
            <img 
              src="/src/img/galleta2.png" 
              alt="Galleta de chocolate" 
              onClick={() => handleImageClick("/src/img/galleta2.png")} 
            />
            <img 
              src="/src/img/galleta3.png" 
              alt="Galleta de chocolate" 
              onClick={() => handleImageClick("/src/img/galleta3.png")} 
            />
          </div>
          
          <div className="main-image">
            <img src={selectedImage} alt="Imagen de galleta" />
          </div>
        </section>

        <section className="product-details">
          <h1>{name}</h1> {/* Muestra el nombre desde el estado */}
          <p>Descripción:</p>
          <p>{description}</p> {/* Muestra la descripción desde el estado */}
          <p>Precio: S/{price.toFixed(2)} </p> {/* Muestra el precio desde el estado */}
          <p>Categoría: Galletas</p>

          <div className="quantity-control">
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <button className="add-to-cart" onClick={handleAddToCart}>Añadir al Carrito</button> {/* Agregar evento onClick */}
        </section>
      </main>
      <ProductosRelacionados />
    </div>
  );
};

export default Galleta;
