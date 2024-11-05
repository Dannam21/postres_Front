import React, { useContext } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Asegúrate de tener la ruta correcta
import '../styles/PedidoRealizado.css';

const PedidoRealizado = () => {
  const { idPedido } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext); // Usa clearCart del contexto

  const handleVolverATienda = () => {
    clearCart(); // Limpiar el carrito al volver a la tienda
    navigate('/'); // Redirigir a la página principal
  };

  return (
    <div className="pedido-container">
      <div className="pedido-card">
        <h1 className="pedido-title">¡Gracias por tu compra!</h1>
        <p className="pedido-message">{location.state?.mensaje || "Tu pedido ha sido procesado exitosamente."}</p>

        <div className="pedido-info">
          <h3>Detalles del Pedido</h3>
          <p><strong>ID del Pedido:</strong> {idPedido}</p>
        </div>

        <div className="pedido-buttons">
          <button onClick={handleVolverATienda} className="pedido-button">Volver a la tienda</button>
          <button className="pedido-button pedido-button-secondary">Ver más detalles</button>
        </div>
      </div>
    </div>
  );
};

export default PedidoRealizado;
