import React, { useState, useContext } from 'react'; // Asegúrate de incluir useContext
import { Link } from 'react-router-dom';
import CarritoModal from '../pages/CarritoModal';
import cartIcon from '../img/cart-icon.png'; // Asegúrate de que la ruta sea correcta
import { CartContext } from '../context/CartContext'; // Importar el CartContext

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItems, updateCartItemQuantity, removeItemFromCart } = useContext(CartContext); // Obtener los ítems del carrito y las funciones

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <h1>DOLCE BAKERY</h1>
        </Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/home">Dolce</Link></li>
          <li><Link to="/ver-pedido">Ver Pedido</Link></li> {/* Botón para ver el pedido */}
        </ul>
        <button onClick={openModal} className="cart-btn">
          <img src={cartIcon} alt="Carrito" className="cart-icon" />
        </button>
      </nav>

      <CarritoModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        cartItems={cartItems} 
        updateCartItemQuantity={updateCartItemQuantity} // Pasar la función de actualización
        removeItemFromCart={removeItemFromCart} // Pasar la función de eliminar
      />
    </header>
  );
};

export default Navbar;
