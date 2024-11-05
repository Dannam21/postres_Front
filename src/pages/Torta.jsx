import React, { useState, useEffect, useContext } from 'react'; // Incluye useEffect y useContext
import '../styles/index.css';
import ProductosRelacionados from './ProductosRelacionados'; // Asegúrate de que la ruta es correcta
import { CartContext } from '../context/CartContext'; // Importa el CartContext
import {API_PRODUCTO} from '../../api';

const Torta = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("/src/img/torta.png");
  const [price, setPrice] = useState(0); // Estado para almacenar el precio
  const [description, setDescription] = useState(""); // Estado para almacenar la descripción
  const [name, setName] = useState(""); // Estado para almacenar el nombre del producto

  const { addItemToCart } = useContext(CartContext); // Usa el contexto del carrito

  // UseEffect para obtener los detalles del producto
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${API_PRODUCTO}/productos/2`); // Reemplaza con tu endpoint para obtener el producto por ID
        if (!response.ok) {
          throw new Error("Error al obtener el producto");
        }
        const data = await response.json();
        setName(data.nombre); // Almacena el nombre en el estado
        setPrice(data.precio); // Almacena el precio en el estado
        setDescription(data.descripcion); // Almacena la descripción en el estado
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
      id: 2, 
      name, // Utiliza el nombre desde el estado
      price,
      quantity,
      image: selectedImage,
      size: "Grande", // Puedes agregar más detalles según sea necesario
      description: description,
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
              src="/src/img/torta2.png" 
              alt="Torta de maracuyá" 
              onClick={() => handleImageClick("/src/img/torta2.png")} 
            />
            <img 
              src="/src/img/torta3.png" 
              alt="Torta" 
              onClick={() => handleImageClick("/src/img/torta3.png")} 
            />
            <img 
              src="/src/img/torta.png" 
              alt="Torta" 
              onClick={() => handleImageClick("/src/img/torta.png")} 
            />
          </div>
          
          {/* Imagen principal que cambia según la miniatura seleccionada */}
          <div className="main-image">
            <img src={selectedImage} alt="Imagen de torta" />
          </div>
        </section>

        <section className="product-details">
          <h1>{name}</h1> {/* Muestra el nombre desde el estado */}
          <p>Descripción:</p>
          <p>{description}</p> {/* Muestra la descripción desde el estado */}
          <p>Precio: S/{price.toFixed(2)} </p> {/* Muestra el precio desde el estado */}
          <p>Categoría: Torta</p>

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

export default Torta;
