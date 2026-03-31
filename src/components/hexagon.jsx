import '../css/Hexagon.css';
import PropTypes from 'prop-types';

// ─────────────────────────────────────────────────────────
//  COMPOSANT : Hexagon
//  Hexagone pour la galerie de peintures.
// ─────────────────────────────────────────────────────────

function Hexagon({ image, title, description }) {
  return (
    <li className="hex hover-target">
      <div className="hexIn">
        <a className="hexLink" href="/">
          <img src={image} alt={title} />
          <div className="hex-overlay">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </a>
      </div>
    </li>
  );
}

Hexagon.propTypes = {
  image:       PropTypes.string.isRequired,
  title:       PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Hexagon;
