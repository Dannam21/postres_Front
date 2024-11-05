import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/index.css';
import ProductosRelacionados from './ProductosRelacionados';
import { CartContext } from '../context/CartContext';
import { API_PRODUCTO, API_RESENIA } from '../../api'; 
import CommentForm from './CommentForm';
import CommentSection from './CommentSection';

const Producto = () => {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // Estado para las imágenes
  const [comments, setComments] = useState([]);

  const { addItemToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${API_PRODUCTO}/productos/${id}`);
        if (!response.ok) throw new Error("Error al obtener el producto");
        const data = await response.json();
        setName(data.nombre);
        setDescription(data.descripcion);
        setPrice(data.precio);

        // Almacenar todas las imágenes en un array
        const imageArray = [
          data.imagen, 
          data.imagen1, 
          data.imagen2, 
          data.imagen3
        ].filter(Boolean); // Filtrar imágenes que no existan
        setImages(imageArray);
        setSelectedImage(data.imagen || "/src/img/default.png");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`${API_RESENIA}/products/${id}/reviews`);
        if (!response.ok) throw new Error("Error al obtener los comentarios");
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error al obtener los comentarios:", error);
      }
    };

    fetchProductDetails();
    fetchComments();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleAddToCart = () => {
    const item = {
      id,
      name,
      price,
      description,
      quantity,
      image: selectedImage,
      size: "Mediano",
    };

    addItemToCart(item);
    alert("Producto añadido al carrito!");
  };

  return (
    <div className="product-page">
      <main>
        <section className="product-images">
          <div className="thumbnails">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Imagen ${index + 1}`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>

          <div className="main-image">
            <img src={selectedImage} alt="Imagen del producto" />
          </div>
        </section>

        <section className="product-details">
          <h1>{name}</h1>
          <p>Descripción:</p>
          <p>{description}</p>
          <p>Precio: S/{price.toFixed(2)}</p>
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

          <button className="add-to-cart" onClick={handleAddToCart}>Añadir al Carrito</button>
        </section>
      </main>

      {/* Sección para mostrar los comentarios */}
      <section className="comments-section">
        <h2>Comentarios</h2>
        <CommentSection comments={comments} /> {/* Pasa los comentarios al nuevo componente */}
        <CommentForm productId={id} /> {/* Cambiado a productId */}
      </section>

      <ProductosRelacionados />
    </div>
  );
};

export default Producto;
