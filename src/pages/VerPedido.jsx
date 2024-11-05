import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext'; 

const VerPedido = () => {
  const { previousOrders } = useContext(CartContext);

  return (
    <div>
      <h1>Tus Pedidos Anteriores</h1>
      {previousOrders.length > 0 ? (
        previousOrders.map((order, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h3>Pedido ID: {order.idPedido}</h3>
            <p><strong>Fecha:</strong> {new Date(order.fecha).toLocaleString()}</p>
            {order.productos.map((item, idx) => (
              <div key={idx}>
                <p><strong>Producto:</strong> {item.name}</p>
                <p><strong>Cantidad:</strong> {item.quantity}</p>
                <p><strong>Precio por unidad:</strong> S/{item.price}</p>
                <p><strong>Subtotal:</strong> S/{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <h4>Total: S/{order.total.toFixed(2)}</h4>
          </div>
        ))
      ) : (
        <p>No tienes pedidos anteriores.</p>
      )}
    </div>
  );
};

export default VerPedido;

