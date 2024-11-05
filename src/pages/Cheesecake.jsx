import React, { useState, useEffect, useContext } from 'react';  // Importa useEffect
import '../styles/index.css';
import ProductosRelacionados from './ProductosRelacionados';
import { CartContext } from '../context/CartContext';  // Importa el CartContext
import {API_PRODUCTO} from '../../api';

const Cheesecake = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("/src/img/cheesecake.png");
  const [price, setPrice] = useState(0);  // Estado para almacenar el precio
  const [description, setDescription] = useState("");  // Estado para almacenar la descripción
  const [name, setName] = useState("");  // Estado para almacenar el nombre del producto

  // Obtén la función addItemToCart del contexto
  const { addItemToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${API_PRODUCTO}/productos/3`);  // Reemplaza con tu endpoint para obtener el producto por ID
        if (!response.ok) {
          throw new Error("Error al obtener el producto");
        }
        const data = await response.json();
        setName(data.nombre);  // Almacena el nombre del producto en el estado
        setPrice(data.precio);  // Almacena el precio en el estado
        setDescription(data.descripcion);  // Almacena la descripción en el estado
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProductDetails();
  }, []);  // Ejecutar solo una vez al montar el componente

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  // Función para manejar el clic en "Añadir al Carrito"
  const handleAddToCart = () => {
    const item = {
      id: 3,  // Asegúrate de incluir el ID del producto
      name,  // Utiliza el nombre desde el estado
      description,  // Incluye la descripción desde el estado
      price,
      quantity,
      image: selectedImage,
      size: "Mediano",  // Puedes agregar más detalles según sea necesario
    };

    addItemToCart(item);  // Añadir el producto al carrito
    alert("Producto añadido al carrito!");  // Alerta opcional para notificar al usuario
  };

  return (
    <div className="product-page">
      <main>
        <section className="product-images">
          <div className="thumbnails">
            <img 
              src="/src/img/fresa2.png" 
              alt="Cheesecake de maracuyá" 
              onClick={() => handleImageClick("/src/img/fresa2.png")} 
            />
            <img 
              src="/src/img/cheesecake.png" 
              alt="Cheesecake" 
              onClick={() => handleImageClick("/src/img/cheesecake.png")} 
            />
            <img 
              src="/src/img/fresacheesecake.png" 
              alt="Cheesecake de fresa" 
              onClick={() => handleImageClick("/src/img/fresacheesecake.png")} 
            />
            <img 
              src="/src/img/fresa1.png" 
              alt="Torta" 
              onClick={() => handleImageClick("/src/img/fresa1.png")} 
            />
          </div>

          <div className="main-image">
            <img src={selectedImage} alt="Imagen de cheesecake" />
          </div>
        </section>

        <section className="product-details">
          <h1>{name}</h1>  {/* Muestra el nombre desde el estado */}
          <p>Descripción:</p>
          <p>{description}</p> {/* Muestra la descripción desde el estado */}
          <p>Precio: S/{price.toFixed(2)} </p> {/* Muestra el precio desde el estado */}
          <p>Categoría: Cheesecake</p>

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

          <button className="add-to-cart" onClick={handleAddToCart}>Añadir al Carrito</button>  {/* Agregar evento onClick */}
        </section>
      </main>
      <ProductosRelacionados />
    </div>
  );
};

export default Cheesecake;
