import PropTypes from 'prop-types';
import '../css/Hexagon.css';

function Hexagon({ image, title, description }) {
    return (
        <li>
            <div>
                <img src={image} alt={title} />
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </li>
    );
}

Hexagon.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default Hexagon;
