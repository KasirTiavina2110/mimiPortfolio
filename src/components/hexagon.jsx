import PropTypes from 'prop-types';
import '../css/Hexagon.css';
const Hexagon = ({ image, title, description }) => {
    return (
        <li className="hex">
            <div className="hexIn">
                <a className="hexLink" href="/">
                    <img src={image} alt={title} />
                    <h1>{title}</h1>
                    <p>{description}</p>
                </a>
            </div>
        </li>
    );
};

Hexagon.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default Hexagon;
