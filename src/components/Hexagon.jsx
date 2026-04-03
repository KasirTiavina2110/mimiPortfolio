import '../css/Hexagon.css';
import PropTypes from 'prop-types';

function Hexagon({ image, title, description, onClick }) {
  return (
    <li className="hex hover-target">
      <div className="hexIn">
        <div className="hexLink" onClick={onClick} role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && onClick?.()}>
          <img src={image} alt={title} />
          <div className="hex-overlay">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

Hexagon.propTypes = {
  image:       PropTypes.string.isRequired,
  title:       PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick:     PropTypes.func,
};

export default Hexagon;