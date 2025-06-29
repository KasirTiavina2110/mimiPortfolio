import "../css/portfolio.css"; 
import "../css/contact.css"; // Vous pouvez adapter ce fichier CSS au besoin
import Card from "./card";
import Hexagon from "./hexagon";
import { useState } from 'react';

// Import des images
import miharyProfileImage from "../../src/assets/images/Mihary.jpg";
import toteBagImage1 from "../../src/assets/images/ToteBag.jpg";
import toteBagImage2 from "../../src/assets/images/TotteBagasy2.jpg";
import toteBagImage3 from "../../src/assets/images/TotteBagasy3.jpg";
import toteBagImage4 from "../../src/assets/images/TotteBagasy4.jpg";
import shoesCustomVideo from "../../src/assets/images/Shoes_custom.mp4";
import tableauImage1 from "../../src/assets/images/Tableau.jpg";
import tableauImage2 from "../../src/assets/images/Tableau2.jpg";

function HeroSection() {
    return (
        <div className="hero-section">
            <div className="about-text hover-target">A propos</div>
            <div className="contact-text hover-target">contact</div>
            <div className="section-center">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <h1>Mihary Razafimbelo</h1>
                        </div>
                        <div className="col-12 text-center mb-2">
                            <div className="dancing">Medical Intern 🩺 & Artist 🎨</div>
                        </div>
                        <div className="col-12 text-center mt-4 mt-lg-5">
                            <p>
                                <span className="ToteBagasy hover-target">ToteBagasy 🛍</span> 
                                <span className="ShoesCustom hover-target">Shoes Custom 👟</span> 
                                <span className="Painting hover-target">Painting 🖼🖌</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AboutSection() {
    return (
        <div className="about-section">
            <div className="about-close hover-target"></div>
            <div className="section-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <img src={miharyProfileImage} alt="Mihary profile" />
                        </div>
                        <div className="col-lg-8 text-center mt-4">
                            <p>
                                Je suis interne en médecine à la faculté de médecine d Antananarivo, et à mes heures perdues, 
                                je peins des tableaux. Passionnée par le corps humain depuis mon enfance, j ai décidé d en faire ma vocation. 
                                Pour moi, la médecine n est pas seulement une science, c est un art. Ma devise est : La médecine, c est de l art. 
                                Mon objectif est de fusionner mon métier et ma passion. 
                                C est un défi de taille, mais je suis prête à le relever avec détermination et enthousiasme.
                            </p>
                        </div>
                        <div className="col-12 text-center">
                            <p><span>Miss Razafimbelo 🕶</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactSection() {
    const [flipCard, setFlipCard] = useState(false);

  return (
    <div className="contact-section">
      {/* Bouton fermer */}
      <div
        className="contact-close hover-target"
        onClick={() => document.body.classList.remove('contact-on')}
      />

      <div className="section-center">
        <div className="container">
          {/* Bouton pour animer / reset */}
          <div
            className="flip-card hover-target"
            onClick={() => setFlipCard(fc => !fc)}
          >
            {flipCard ? 'Reset' : 'Animate'}
          </div>

          {/* Envelope flip wrapper */}
          <div className="contact-wrapper">
            <div className={`envelope ${flipCard ? 'active' : ''}`}>
              <div className="back paper"></div>
              <div className="content">
                <div className="form-wrapper">
                  <form>
                    <div className="top-wrapper">
                      <div className="input">
                        <label>Name</label>
                        <input type="text" name="name" />
                      </div>
                      <div className="input">
                        <label>Phone</label>
                        <input type="text" name="phone" />
                      </div>
                      <div className="input">
                        <label>Email</label>
                        <input type="email" name="_replyto" />
                      </div>
                    </div>
                    <div className="bottom-wrapper">
                      <div className="input">
                        <label>Subject</label>
                        <input type="text" name="_subject" />
                      </div>
                      <div className="input">
                        <label>Message</label>
                        <textarea rows="5" name="message"></textarea>
                      </div>
                      <div className="submit">
                        <div
                          className="submit-card hover-target"
                          onClick={() => setFlipCard(false)}
                        >
                          Send Mail
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="front paper"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToteBagasySection() {
    const cardsData = [
        {
            image: toteBagImage1,
            header: "Tote Bag 1",
            content: "Modèle numéro 1 que j'ai fait pour ma sœur ❤"
        },
        {
            image: toteBagImage2,
            header: "Tote Bag 2",
            content: "Tote Betsiky 😁"
        },
        {
            image: toteBagImage3,
            header: "Tote Bag 3",
            content: "Tote Bagasy Miaina 🧬"
        },
        {
            image: toteBagImage4,
            header: "Tote Bag 4",
            content: "Tote Bagasy Fo sy Saina🔥"
        },
    ];

    return (
        <div className="ToteBagasy-section">
            <div className="ToteBagasy-close hover-target"></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <h3>ToteBagasy</h3>
                    </div>
                    <div className="col-12 mt-3 text-center">
                        <p><span>Voici mes Créations</span></p>
                    </div>
                    <div className="col-12 text-center">
                        <p>
                            Un tote bag est un sac à main de grande taille,
                            souvent en toile ou en tissu, avec deux anses relativement longues permettant de le porter facilement sur l épaule.
                            <br />
                            Les tote bags sont populaires pour leur praticité et leur capacité à transporter divers objets au quotidien,
                            tels que des livres, des courses légères, des effets personnels, ou même comme sac de plage.
                            <br />
                            Ils sont appréciés pour leur simplicité et leur design souvent
                            décontracté, et sont devenus un accessoire à la fois utilitaire et à la mode dans de nombreuses cultures.<br />
                        </p>
                    </div>
                    {cardsData.map((card, index) => (
                        <div className="col-md-6 col-lg-4" key={index}>
                            <Card dataImage={card.image} header={card.header} content={card.content} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ShoesCustomSection() {
    return (
        <div className="ShoesCustom-section">
            <div className="ShoesCustom-close hover-target"></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <h3>Shoes Custom</h3>
                    </div>
                    <div className="col-12 mt-3 text-center">
                        <p><span>Personnalisation Artistique</span></p>
                    </div>
                    <div className="col-12 text-center">
                        <p>
                        Les shoes custom (ou chaussures personnalisées) désignent des chaussures qui ont été modifiées ou conçues de manière unique pour refléter les goûts, 
                        la personnalité ou les préférences spécifiques de l utilisateur.<br />
                        Voici quelques points clés pour comprendre ce concept :<br />
                        Personnalisation Artistique:
                        <br />
                        Peinture et Dessin: Utilisation de peintures acryliques, de marqueurs permanents, et d autres outils pour créer des designs artistiques sur les chaussures.
                        <br />
                        Graphismes Uniques: Création de motifs, logos, illustrations ou textes spécifiques pour rendre chaque paire de chaussures unique.<br />
                        </p>
                    </div>
                    <div className="col-md-12 col-lg-8">
                        <video width="100%" controls>
                            <source src={shoesCustomVideo} type="video/mp4" />
                            Votre navigateur ne supporte pas la lecture de vidéo.
                        </video>
                    </div>
                    {/* Répétez les vidéos pour chaque élément */}
                </div>
            </div>
        </div>
    );
}

function PaintingSection() {
    const hexagonData = [
        {
            image: tableauImage1,
            title: "Oeuvre 1",
            description: "Description pour l'oeuvre 1"
        },
        {
            image: tableauImage2,
            title: "Oeuvre 2",
            description: "Description pour l'oeuvre 2"
        },
        // Ajoutez plus d'hexagones ici
    ];

    return (
        <div className="Painting-section">
            <div className="Painting-close hover-target"></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <h3>Painting</h3>
                    </div>
                    <div className="col-12 mt-3 text-center">
                        <p>
                            <span>La peinture est une forme d expression artistique qui consiste à appliquer des pigments sur une surface pour créer des images, des motifs ou des compositions.</span>
                        </p>
                    </div>
                    <div className="col-12 text-center">
                        <p>
                            Techniques de peinture :<br />
                            Peinture à l huile<br />
                            Aquarelle<br />
                            Acrylique<br />
                            Gouache<br />
                            Encre<br />
                        </p>
                    </div>
                    <ul id="categories" className="clr">
                        <li className="pusher"></li>
                        {hexagonData.map((hexagon, index) => (
                            <Hexagon 
                                key={index} 
                                image={hexagon.image} 
                                title={hexagon.title} 
                                description={hexagon.description} 
                            />
                        ))}
                        <li className="pusher"></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export { HeroSection, AboutSection, ContactSection, ToteBagasySection, ShoesCustomSection, PaintingSection };
