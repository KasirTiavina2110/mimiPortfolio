import 'bootstrap/dist/css/bootstrap.min.css';
import  { useEffect } from 'react';
import Cursor from './components/cursor';
import { HeroSection, AboutSection, ContactSection, ToteBagasySection, ShoesCustomSection, PaintingSection } from './components/portfolio';
import $ from 'jquery'; 


function App() {
    useEffect(() => {
        // Scripts jQuery ici
        document.getElementsByTagName("body")[0].addEventListener("mousemove", function(n) {
            $("#cursor").css("left", n.clientX + "px");
            $("#cursor").css("top", n.clientY + "px");
            $("#cursor2").css("left", n.clientX + "px");
            $("#cursor2").css("top", n.clientY + "px");
            $("#cursor3").css("left", n.clientX + "px");
            $("#cursor3").css("top", n.clientY + "px");
        });

        $(".hover-target").mouseover(function() {
            $("#cursor2").addClass("hover");
            $("#cursor3").addClass("hover");
        });

        $(".hover-target").mouseout(function() {
            $("#cursor2").removeClass("hover");
            $("#cursor3").removeClass("hover");
        });

        $(".about-text").on('click', function () {
            $("body").addClass("about-on");
        });
        $(".about-close").on('click', function () {
            $("body").removeClass("about-on");
        });

        $(".contact-text").on('click', function () {
            $("body").addClass("contact-on");
        });
        $(".contact-close").on('click', function () {
            $("body").removeClass("contact-on");
        });

        $(".ToteBagasy").on('click', function () {
            $("body").addClass("ToteBagasy-on");
        });
        $(".ToteBagasy-close").on('click', function () {
            $("body").removeClass("ToteBagasy-on");
        });

        $(".ShoesCustom").on('click', function () {
            $("body").addClass("ShoesCustom-on");
        });
        $(".ShoesCustom-close").on('click', function () {
            $("body").removeClass("ShoesCustom-on");
        });

        $(".Painting").on('click', function () {
            $("body").addClass("Painting-on");
        });
        $(".Painting-close").on('click', function () {
            $("body").removeClass("Painting-on");
        });

    }, []); // Assurez-vous que cela s'exécute uniquement une fois à l'initialisation

    return (
      <>
        <div className="App">
            <HeroSection />
            <AboutSection />
            <ContactSection />
            <ToteBagasySection />
            <ShoesCustomSection />
            <PaintingSection />
        </div>
        <Cursor/>
        </>
    );
}

export default App;
