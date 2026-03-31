import '../css/Card.css';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// ─────────────────────────────────────────────────────────
//  COMPOSANT : Card
//  Effet de tilt 3D conservé, design modernisé.
// ─────────────────────────────────────────────────────────

function Card({ dataImage, header, content }) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const leaveTimer = useRef(null);

  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = cardRef.current;
    setMouseX(e.pageX - offsetLeft - offsetWidth  / 2);
    setMouseY(e.pageY - offsetTop  - offsetHeight / 2);
  };

  const handleMouseEnter = () => {
    clearTimeout(leaveTimer.current);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    leaveTimer.current = setTimeout(() => {
      setMouseX(0);
      setMouseY(0);
    }, 800);
  };

  const w = cardRef.current?.offsetWidth  || 1;
  const h = cardRef.current?.offsetHeight || 1;

  return (
    <div
      className="card-wrap hover-target"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="card-3d"
        style={{ transform: `rotateY(${(mouseX / w) * 18}deg) rotateX(${(-mouseY / h) * 18}deg)` }}
      >
        {/* Image background with parallax */}
        <div
          className="card-3d__bg"
          style={{
            backgroundImage: `url(${dataImage})`,
            transform: `translateX(${(mouseX / w) * -25}px) translateY(${(mouseY / h) * -25}px)`,
          }}
        />

        {/* Gradient overlay */}
        <div className="card-3d__overlay" />

        {/* Content */}
        <div className={`card-3d__info ${hovered ? 'is-visible' : ''}`}>
          <h3 className="card-3d__title">{header}</h3>
          <p  className="card-3d__desc">{content}</p>
        </div>

        {/* Shine layer */}
        <div
          className="card-3d__shine"
          style={{
            background: `radial-gradient(circle at ${50 + (mouseX / w) * 60}% ${50 + (mouseY / h) * 60}%, rgba(201,168,96,0.12) 0%, transparent 60%)`,
          }}
        />
      </div>
    </div>
  );
}

Card.propTypes = {
  dataImage: PropTypes.string.isRequired,
  header:    PropTypes.string.isRequired,
  content:   PropTypes.string.isRequired,
};

export default Card;
