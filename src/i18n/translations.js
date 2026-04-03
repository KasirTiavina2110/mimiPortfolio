export const T = {
  FR: {
    // Hero
    eyebrow: "Portfolio · 2026",
    role_doctor: "Thésard en médecine",
    role_artist: "Artiste",
    hint: "Sentir — Créer — Répéter",
    btn_tote: "ToteBagasy",
    btn_shoes: "All Customs",
    btn_painting: "Peintures",

    // Nav
    nav_about: "À propos",
    nav_contact: "Contact",

    // About
    about_label: "À propos",
    about_title1: "Médecine",
    about_title2: "comme un art",
    about_bio1:
      "Thésard à la faculté de médecine d'Antananarivo, et à mes heures perdues, je peins des tableaux.",
    about_bio2:
      "Passionnée par le corps humain depuis mon enfance, j'ai décidé d'en faire ma vocation. Pour moi, la médecine n'est pas seulement une science, c'est un art.",
    about_quote: "« La médecine, c'est de l'art. »",
    about_bio3:
      "Mon objectif est de fusionner mon métier et ma passion. C'est un défi de taille, mais je suis prête à le relever avec détermination et enthousiasme.",
    about_sig: "Miss Razafimbelo 🕶",
    tag_medicine: "Médecine 🩺",
    tag_painting: "Peinture 🎨",
    tag_tote: "Tote Bags 🛍",
    tag_shoes: "Shoes Custom 👟",

    // Contact
    contact_label: "Me contacter",
    contact_title1: "Envoyez",
    contact_title2: "un message",
    envelope_open: "Ouvrir l'enveloppe",
    envelope_close: "Fermer",
    field_name: "Nom *",
    field_phone: "Téléphone",
    field_email: "Email *",
    field_subject: "Sujet",
    field_message: "Message *",
    send_btn: "Envoyer ✉",
    sending: "Envoi...",
    success_msg: "✓ Message envoyé — je vous réponds bientôt !",
    error_msg: "✗ Erreur d'envoi — réessaie dans quelques instants",
    rate_limit_msg: "✗ Trop de messages — réessaie dans 1 heure",

    // Painting
    painting_label: "Galerie",
    painting_title1: "Portraits &",
    painting_title2: "Peintures",
    painting_intro: "Crayon · aquarelle · gouache · marqueur",

    // Tote
    tote_label: "Créations textiles",
    tote_title1: "Tote",
    tote_title2: "Bagasy",

    // Shoes
    shoes_label: "Personnalisation",
    shoes_title1: "Shoes",
    shoes_title2: "Custom",
    caps_label: "Art textile & Décoration",
    caps_title1: "Graduation",
    caps_title2: "Caps",
  },

  EN: {
    eyebrow: "Portfolio · 2026",
    role_doctor: "Medical Doctoral Student",
    role_artist: "Artist",
    hint: "Feel — Create — Repeat",
    btn_tote: "ToteBagasy",
    btn_shoes: "All Customs",
    btn_painting: "Paintings",

    nav_about: "About",
    nav_contact: "Contact",

    about_label: "About",
    about_title1: "Medicine",
    about_title2: "as an art",
    about_bio1:
      "Doctoral student at the Faculty of Medicine of Antananarivo, and in my spare time, I paint.",
    about_bio2:
      "Passionate about the human body since childhood, I decided to make it my vocation. For me, medicine is not just a science — it's an art.",
    about_quote: '"Medicine is art."',
    about_bio3:
      "My goal is to merge my profession and my passion. It's a great challenge, but I'm ready to take it on with determination and enthusiasm.",
    about_sig: "Miss Razafimbelo 🕶",
    tag_medicine: "Medicine 🩺",
    tag_painting: "Painting 🎨",
    tag_tote: "Tote Bags 🛍",
    tag_shoes: "Shoes Custom 👟",

    contact_label: "Contact me",
    contact_title1: "Send",
    contact_title2: "a message",
    envelope_open: "Open envelope",
    envelope_close: "Close",
    field_name: "Name *",
    field_phone: "Phone",
    field_email: "Email *",
    field_subject: "Subject",
    field_message: "Message *",
    send_btn: "Send ✉",
    sending: "Sending...",
    success_msg: "✓ Message sent — I will reply soon!",
    error_msg: "✗ Send error — please try again",
    rate_limit_msg: "✗ Too many messages — try again in 1 hour",

    painting_label: "Gallery",
    painting_title1: "Portraits &",
    painting_title2: "Paintings",
    painting_intro: "Pencil · watercolor · gouache · marker",

    tote_label: "Textile creations",
    tote_title1: "Tote",
    tote_title2: "Bagasy",

    shoes_label: "Customization",
    shoes_title1: "Shoes",
    shoes_title2: "Custom",
    caps_label: "Textile art & Decoration",
    caps_title1: "Graduation",
    caps_title2: "Caps",
  },
};

// Helper hook-like function (sans hook, utilisable partout)
export const t = (lang, key) => T[lang]?.[key] ?? key;

// ── Ajouts manquants ─────────────────────────────────────
export const T_EXTRA = {
  FR: {
    painting_artworks: "œuvres",
    toggle_lang_title: "Changer la langue",
    toggle_theme_title: "Changer le thème",
    about_photo_alt: "Mihary Razafimbelo",
    caps_desc:
      "Chaque chapeau est une œuvre unique peinte à la main — calligraphie dorée, illustrations florales et messages de foi.",
    shoes_separator: "Shoes Custom",
    shoes_intro:
      "Les shoes custom sont des chaussures transformées en véritables œuvres d'art.",
    shoes_item1: "Peinture acrylique sur cuir",
    shoes_item2: "Marqueurs permanents",
    shoes_item3: "Graphismes & illustrations",
    shoes_item4: "Motifs sur mesure",
    shoes_obito_label: "Obito",
    shoes_obito_desc: "Converse custom — Naruto",
    shoes_redbull_label: "Red Bull",
    shoes_redbull_desc: "Air Force 1 — Red Bull ×33",
    video_not_supported: "Votre navigateur ne supporte pas la lecture vidéo.",
    medium_pencil: "Crayon",
    medium_watercolor: "Aquarelle",
    medium_gouache: "Gouache",
    medium_colored_pencil: "Crayon couleur",
    medium_marker: "Marqueur",
    painting_p01_label: "Turban",
    painting_p02_label: "Couleurs vives",
    painting_p03_label: "Profil",
    painting_p04_label: "Abstrait",
    painting_p05_label: "Auburn",
    painting_p06_label: "Portrait gars",
    painting_p07_label: "Mystère",
    painting_p08_label: "Kendall",
    painting_p09_label: "Yeux verts",
    painting_p10_label: "Bob noir",
    painting_p11_label: "Darkside",
    painting_p12_label: "Col roulé vert",
    painting_p13_label: "Afro fleurie",
    painting_p14_label: "Fleurs jaunes",
    painting_p15_label: "Fleurs mauves",
    painting_p16_label: "Queue de cheval",
    painting_p17_label: "Couronne verte",
    painting_p18_label: "Kasir",
    painting_p19_label: "Kasir 2",
  },
  EN: {
    painting_artworks: "artworks",
    toggle_lang_title: "Change language",
    toggle_theme_title: "Change theme",
    about_photo_alt: "Mihary Razafimbelo",
    caps_desc:
      "Each cap is a unique handmade work — gold calligraphy, floral illustrations and messages of faith.",
    shoes_separator: "Shoes Custom",
    shoes_intro:
      "Custom shoes are sneakers transformed into true works of art.",
    shoes_item1: "Acrylic paint on leather",
    shoes_item2: "Permanent markers",
    shoes_item3: "Graphics & illustrations",
    shoes_item4: "Custom motifs",
    shoes_obito_label: "Obito",
    shoes_obito_desc: "Custom Converse — Naruto",
    shoes_redbull_label: "Red Bull",
    shoes_redbull_desc: "Air Force 1 — Red Bull ×33",
    video_not_supported: "Your browser does not support video playback.",
    medium_pencil: "Pencil",
    medium_watercolor: "Watercolor",
    medium_gouache: "Gouache",
    medium_colored_pencil: "Colored pencil",
    medium_marker: "Marker",
    painting_p01_label: "Turban",
    painting_p02_label: "Vivid colors",
    painting_p03_label: "Profile",
    painting_p04_label: "Abstract",
    painting_p05_label: "Auburn",
    painting_p06_label: "Male portrait",
    painting_p07_label: "Mystery",
    painting_p08_label: "Kendall",
    painting_p09_label: "Green eyes",
    painting_p10_label: "Black bob",
    painting_p11_label: "Darkside",
    painting_p12_label: "Green turtleneck",
    painting_p13_label: "Floral afro",
    painting_p14_label: "Yellow flowers",
    painting_p15_label: "Purple flowers",
    painting_p16_label: "Ponytail",
    painting_p17_label: "Green crown",
    painting_p18_label: "Kasir",
    painting_p19_label: "Kasir 2",
  },
};

// Merge dans T principal
Object.keys(T_EXTRA).forEach((lang) => {
  Object.assign(T[lang], T_EXTRA[lang]);
});
