import React, { useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';
import { CartContext } from '../context/CartContext';
import { API_ORQUESTADORA } from '../../api';

const CarritoModal = ({ isOpen, onClose }) => {
  const modalRef = useRef();
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, removeItemFromCart, updateCartItemQuantity, clearCart, addOrder } = useContext(CartContext);
  const cliente = {
    nombre: "Nombre del Cliente",
    correoElectronico: "cliente@example.com",
    telefono: "123456789"
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleCreateOrder = async () => {
    const pedido = {
      descripcion: "Pedido de productos",
      productos: cartItems.map(item => ({
        id: item.id,
        nombre: item.name,
        descripcion: item.description || "Sin descripción",
        precio: item.price,
        cantidad: item.quantity,
      })),
      cliente: {
        nombre: cliente.nombre,
        correoElectronico: cliente.correoElectronico,
        telefono: cliente.telefono
      }
    };
  
    try {
      const response = await fetch(`${API_ORQUESTADORA}/create/pedido/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedido),
      });
  
      if (response.ok) {
        const data = await response.json();
        
        const newOrder = {
          idPedido: data.pedido.idPedido,
          productos: cartItems,
          total: getTotalPrice(),
          fecha: new Date().toISOString(),
        };

        addOrder(newOrder);  // Guardar el pedido en la lista de pedidos anteriores
        clearCart();         // Limpiar el carrito después de crear el pedido
        
        navigate(`/pedido-realizado/${data.pedido.idPedido}`, { state: { mensaje: data.message } });
      } else {
        const errorData = await response.json();
        console.error('Error al crear el pedido:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="cart-modal">
      <div className="cart-header">
        <button onClick={onClose} className="close-btn">X</button>
        <h3>{cartItems.length} ITEM{cartItems.length > 1 ? 'S' : ''}</h3>
      </div>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <p>{item.name} - {item.size}</p>
                <p>S/{item.price} c/u</p>
                <div className="quantity-controls">
                  <button onClick={() => updateCartItemQuantity(index, Math.max(1, item.quantity - 1))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartItemQuantity(index, item.quantity + 1)}>+</button>
                  <button onClick={() => removeItemFromCart(index)}>🗑️</button>
                </div>
                <p>Total por producto: S/{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-total">
          <h4>Total: S/{getTotalPrice().toFixed(2)}</h4>
          <button onClick={handleCreateOrder} className="btn-order">Hacer Pedido</button>
        </div>
      )}
    </div>
  );
};

export default CarritoModal;
