import React, { useState } from 'react';
import '../styles/Form.css'; // Asegúrate de tener los estilos apropiados
import { API_PRODUCTO, API_RESENIA } from '../../api'; // Agregar la API de comentarios

const CommentForm = ({ productId }) => {
  const [score, setScore] = useState(0); // Puntuación inicial
  const [commentText, setCommentText] = useState('');

  const handleCommentChange = (e) => {
    setCommentText(e.target.value); // Actualiza el texto del comentario
  };

  const handleStarClick = (value) => {
    setScore(value); // Actualiza la puntuación seleccionada
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    try {
      // Primero, crea la reseña
      const reviewResponse = await fetch(`${API_RESENIA}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: productId, score }), // Usar productId pasado como prop
      });

      if (!reviewResponse.ok) {
        throw new Error('Error al crear la reseña');
      }

      const reviewData = await reviewResponse.json(); // Obtiene la reseña creada

      // Luego, envía el comentario relacionado con la reseña
      const commentResponse = await fetch(`${API_RESENIA}/reviews/${reviewData.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment_text: commentText }), // Texto del comentario
      });

      if (!commentResponse.ok) {
        throw new Error('Error al enviar el comentario');
      }

      // Resetea el formulario si todo salió bien
      setScore(0);
      setCommentText('');
      alert('Comentario enviado con éxito!');

      // Recarga la página
      window.location.reload(); // Recarga la página

    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al enviar el comentario.'); // Manejo de errores
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h3>Deja tu Comentario</h3>

      <label htmlFor="commentText">Score:</label>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`star ${value <= score ? 'filled' : ''}`}
            onClick={() => handleStarClick(value)}
            role="button"
            aria-label={`Puntuación: ${value} estrellas`}
          >
            ★
          </span>
        ))}
      </div>

      <div className="form-group">
        <label htmlFor="commentText">Comentario:</label>
        <textarea
          id="commentText"
          value={commentText}
          onChange={handleCommentChange}
          required
          placeholder="Escribe tu comentario aquí..."
        />
      </div>

      <button type="submit" className="submit-button">Enviar Comentario</button>
    </form>
  );
};

export default CommentForm;
