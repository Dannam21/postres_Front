import './styles/App.css';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  Navigate 
} from 'react-router-dom';
import Navbar from './layout/Navbar'; // Ruta correcta para Navbar
import Home from './pages/Home';  // Importación correcta de Home
import Galleta from './pages/Galleta';
import Torta from './pages/Torta';
import Cheesecake from './pages/Cheesecake';
import Producto from './pages/Producto'; // Usar un único componente para productos
import './styles/index.css'; // Esta importación ya está correcta
import { CartProvider } from './context/CartContext';
import CarritoModal from './pages/CarritoModal';
import PedidoRealizado from './pages/PedidoRealizado';
import VerPedido from './pages/VerPedido'; // Importa la página de ver pedido




function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/producto/cheesecake" element={<Cheesecake />} /> 
          <Route path="/producto/galleta" element={<Galleta />} /> 
          <Route path="/producto/torta" element={<Torta />} /> 
          {/* <Route path="/producto/1" element={<Galleta />} />
          <Route path="/producto/2" element={<Torta />} />
          <Route path="/producto/3" element={<Cheesecake />} /> */}
          <Route path="/producto/:id" element={<Producto />} /> {/* Ruta genérica para productos */}
          <Route path="/carrito" element={<CarritoModal />} />
          <Route path="/ver-pedido" element={<VerPedido />} /> {/* Ruta para ver pedido */}

        <Route path="/pedido-realizado/:idPedido" element={<PedidoRealizado />} />

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
