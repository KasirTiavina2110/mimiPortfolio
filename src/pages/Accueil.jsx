import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import $ from 'jquery';

import HeroSection from './components/HeroSection';
import AboutSection       from '../components/AboutSection';
import ContactSection     from '../components/ContactSection';
import ToteBagasySection  from '../components/ToteBagasySection';
import ShoesCustomSection from '../components/ShoesCustomSection';
import PaintingSection    from '../components/PaintingSection';

function Accueil() {
  useEffect(() => {

    // Curseur — transform translate (GPU, zero repaint, zero lag)
    const cursor  = document.getElementById('cursor');
    const cursor2 = document.getElementById('cursor2');
    const cursor3 = document.getElementById('cursor3');

    const moveCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (cursor)  cursor.style.transform  = `translate(${x}px, ${y}px)`;
      if (cursor2) cursor2.style.transform = `translate(${x}px, ${y}px)`;
      if (cursor3) cursor3.style.transform = `translate(${x}px, ${y}px)`;
    };

    document.addEventListener('mousemove', moveCursor);

    $(document).on('mouseover', '.hover-target', () => {
      $('#cursor2').addClass('hover');
      $('#cursor3').addClass('hover');
    });
    $(document).on('mouseout', '.hover-target', () => {
      $('#cursor2').removeClass('hover');
      $('#cursor3').removeClass('hover');
    });

    $('.about-text').on('click',        () => $('body').addClass('about-on'));
    $('.about-close').on('click',       () => $('body').removeClass('about-on'));
    $('.contact-text').on('click',      () => $('body').addClass('contact-on'));
    $('.contact-close').on('click',     () => $('body').removeClass('contact-on'));
    $('.ToteBagasy').on('click',        () => $('body').addClass('ToteBagasy-on'));
    $('.ToteBagasy-close').on('click',  () => $('body').removeClass('ToteBagasy-on'));
    $('.ShoesCustom').on('click',       () => $('body').addClass('ShoesCustom-on'));
    $('.ShoesCustom-close').on('click', () => $('body').removeClass('ShoesCustom-on'));
    $('.Painting').on('click',          () => $('body').addClass('Painting-on'));
    $('.Painting-close').on('click',    () => $('body').removeClass('Painting-on'));

    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div className="App">
      <div id="cursor"  />
      <div id="cursor2" />
      <div id="cursor3" />
      <HeroSection />
      <AboutSection />
      <ContactSection />
      <ToteBagasySection />
      <ShoesCustomSection />
      <PaintingSection />
    </div>
  );
}

export default Accueil;