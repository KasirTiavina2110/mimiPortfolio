import  { useEffect } from 'react';

const Cursor = () => {
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];

    // Initialisation des éléments du curseur après que le DOM soit chargé
    const initializeCursor = () => {
      const cursor = document.getElementById('cursor');
      const cursor2 = document.getElementById('cursor2');
      const cursor3 = document.getElementById('cursor3');

      if (cursor && cursor2 && cursor3) {
        body.addEventListener('mousemove', (event) => {
          cursor.style.left = `${event.clientX}px`;
          cursor.style.top = `${event.clientY}px`;
          cursor2.style.left = `${event.clientX}px`;
          cursor2.style.top = `${event.clientY}px`;
          cursor3.style.left = `${event.clientX}px`;
          cursor3.style.top = `${event.clientY}px`;
        });

        const addHover = () => {
          cursor2.classList.add('hover');
          cursor3.classList.add('hover');
        };

        const removeHover = () => {
          cursor2.classList.remove('hover');
          cursor3.classList.remove('hover');
        };

        removeHover();

        const hoverTargets = document.querySelectorAll('.hover-target');
        hoverTargets.forEach((target) => {
          target.addEventListener('mouseover', addHover);
          target.addEventListener('mouseout', removeHover);
        });
      } else {
        console.error('One or more cursor elements not found in the DOM.');
      }
    };

    // Appeler initializeCursor une fois que le DOM est prêt
    document.addEventListener('DOMContentLoaded', initializeCursor);

    return () => {
      // Nettoyer les écouteurs d'événements si nécessaire
      document.removeEventListener('DOMContentLoaded', initializeCursor);
    };
  }, []);

  return null; // Ce composant ne rend rien dans le DOM
};

export default Cursor;
