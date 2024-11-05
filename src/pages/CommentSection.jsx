import React from 'react';
import '../styles/commentSection.css'; // Asegúrate de que esta hoja de estilos tenga los cambios necesarios

const CommentSection = ({ comments }) => {
  const scrollLeft = () => {
    const container = document.getElementById("comments-container");
    container.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.getElementById("comments-container");
    container.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="comments-wrapper">
      <button className="scroll-button left" onClick={scrollLeft}>{"<"}</button>
      <div id="comments-container" className="comments-container">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={comment.id_comentario || index} className="comment-card">
              <div className="comment-header">
                <div className="star-rating">
                  {"★".repeat(comment.score)}{"☆".repeat(5 - comment.score)}
                </div>
              </div>
              <p className="comment-text">{comment.comment_text ? comment.comment_text : "Comentario no disponible"}</p>
              <div className="comment-footer">
                <img src={comment.avatar || 'https://cdn.discordapp.com/attachments/1294334985620291637/1294349053680681075/user.png?ex=670aaffe&is=67095e7e&hm=f6231689191e11e90255f8f3fa1f3ef7c6bbba53ec5e0d88a94a30e89ee4a6f2&'} alt="avatar" className="comment-avatar" />
                <div className="comment-user">
                  <p className="user-name">{comment.user || "Anónimo"}</p>
                  <p className="user-role">Happy Customer</p>
                </div>
              </div>
              <p className="comment-date">
                {new Date(comment.created_at).toLocaleDateString() || "Fecha no disponible"}
              </p>
            </div>
          ))
        ) : (
          <p>No hay comentarios aún.</p>
        )}
      </div>
      <button className="scroll-button right" onClick={scrollRight}>{">"}</button>
    </div>
  );
};

export default CommentSection;
