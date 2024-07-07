import '../css/Card.css'; // Assurez-vous d'avoir le bon chemin vers votre fichier CSS
import React, { useState} from 'react';
import PropTypes from 'prop-types'; // Import de PropTypes pour la validation des props

const Card = ({ dataImage, header, content }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [mouseLeaveDelay, setMouseLeaveDelay] = useState(null);

  const cardRef = React.useRef(null);

  React.useEffect(() => {
      if (cardRef.current) {
          setWidth(cardRef.current.offsetWidth);
          setHeight(cardRef.current.offsetHeight);
      }
  }, []);

  const handleMouseMove = (e) => {
      if (cardRef.current) {
          setMouseX(e.pageX - cardRef.current.offsetLeft - width / 2);
          setMouseY(e.pageY - cardRef.current.offsetTop - height / 2);
      }
  };

  const handleMouseEnter = () => {
      clearTimeout(mouseLeaveDelay);
  };

  const handleMouseLeave = () => {
      setMouseLeaveDelay(setTimeout(() => {
          setMouseX(0);
          setMouseY(0);
      }, 1000));
  };

  const cardStyle = {
      transform: `rotateY(${mouseX / width * 30}deg) rotateX(${-mouseY / height * 30}deg)`
  };

  const cardBgTransform = {
      transform: `translateX(${mouseX / width * -40}px) translateY(${mouseY / height * -40}px)`
  };

  const cardBgImage = {
      backgroundImage: `url(${dataImage})`
  };

  return (
      <div className="card-wrap"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={cardRef}>
          <div className="card" style={cardStyle}>
              <div className="card-bg" style={{ ...cardBgTransform, ...cardBgImage }}></div>
              <div className="card-info">
                  <h3>{header}</h3>
                  <p>{content}</p>
              </div>
          </div>
      </div>
  );
};

Card.propTypes = {
  dataImage: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Card;