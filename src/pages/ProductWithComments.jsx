import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductWithComments = ({ product }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [score, setScore] = useState(1);

  useEffect(() => {
    // Obtener comentarios para el producto específico (por su reviewId o productId)
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/reviews/${product.id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error al obtener los comentarios:', error);
      }
    };

    fetchComments();
  }, [product.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/reviews/${product.id}/comments`, {
        text,
        score
      });
      setComments([...comments, response.data]);
      setText('');
      setScore(1);
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    }
  };

  return (
    <div className="product-with-comments">
      <h2>{product.name}</h2>
      <p>{product.description}</p>

      {/* Comentarios existentes */}
      <div className="comments-section">
        <h3>Comentarios:</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.text}</p>
              <p>Score: {comment.score}</p>
              <p>Fecha: {new Date(comment.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No hay comentarios aún.</p>
        )}
      </div>

      {/* Formulario para agregar un nuevo comentario */}
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          placeholder="Escribe tu comentario aquí..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <div>
          <label>Score:</label>
          <select value={score} onChange={(e) => setScore(e.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button type="submit">Enviar comentario</button>
      </form>
    </div>
  );
};

export default ProductWithComments;
