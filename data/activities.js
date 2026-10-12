/* =====================================================
   ACTIVITIES DATA — single source of truth for the
   Activities grid on activities.html.
   Seeded ONLY with entries already on the page. No dates
   are supplied on the page, so no date fields are shown
   and the grid keeps this order.
   ===================================================== */

export const activities = [
  {
    id: "harvest-prototype",
    category: "training",
    label: "Training & Development",
    title: "AgroSolar Harvest Prototype",
    summary: "From Innovation to Practical Solution.",
    images: [
      {
        src: "images/Students_on_hands_training-1400.webp",
        srcSet:
          "images/Students_on_hands_training-800.webp 800w, images/Students_on_hands_training-1400.webp 1400w",
        width: 1400,
        height: 635,
        alt: "Students during hands-on AgroSolar training"
      },
      {
        src: "Prototype_Agro_Solar_Refrigerator/Prototype_SolarHarvest_device-800.webp",
        width: 800,
        height: 450,
        alt: "AgroSolar Harvest prototype device"
      },
      {
        src: "Prototype_Agro_Solar_Refrigerator/Protype_Solar_Harvest-800.webp",
        width: 800,
        height: 462,
        alt: "AgroSolar Harvest cold-storage prototype"
      }
    ]
  },
  {
    id: "student-collage",
    category: "training",
    label: "Training",
    title: "Student Training Photo Collage",
    summary: "Students during hands-on training.",
    images: [
      {
        src: "images/Students_on_hands_training-1400.webp",
        srcSet:
          "images/Students_on_hands_training-800.webp 800w, images/Students_on_hands_training-1400.webp 1400w",
        width: 1400,
        height: 635,
        alt: "Student training photo collage"
      }
    ]
  },
  {
    id: "asset-2026",
    category: "conference",
    label: "Conference",
    title: "ASSET 2026 Conference",
    summary:
      "ASTIC project representatives presenting AgroSolar innovation and project activities.",
    images: [
      {
        src: "Asset_Conference_Solar_Harvest_Pix/PIX1-1400.webp",
        srcSet:
          "Asset_Conference_Solar_Harvest_Pix/PIX1-800.webp 800w, Asset_Conference_Solar_Harvest_Pix/PIX1-1400.webp 1400w",
        width: 1400,
        height: 581,
        alt: "AgroSolar presentation at the ASSET 2026 Conference"
      }
    ]
  },
  {
    id: "abuja-2026",
    category: "workshop",
    label:
      "Workshop - Innovation for African Universities by the British Council",
    title: "Abuja 2026 Entrepreneurship Institutional Readiness Workshop",
    summary:
      "ASTIC to explore practical approaches to strengthening institutional entrepreneurship ecosystems and creating better pathways for students ventures.",
    images: [
      {
        src: "Abuja_Conference/Abuja_Pix3-800.webp",
        width: 800,
        height: 600,
        alt:
          "Participants at the Abuja 2026 Entrepreneurship Institutional Readiness Workshop"
      }
    ]
  },
  {
    id: "ghana-ascend-2026",
    category: "conference",
    label: "Conference",
    title: "Ghana ASCEND Conference 2026",
    summary:
      "ASTIC students pitch presentation at the Ghana ASCEND Conference 2026.",
    pdfUrl: "Ghana_images/AgroSolar_Photo_Album.pdf",
    pdfLabel: "Pitch presentation (PDF)",
    images: [
      {
        src: "Ghana_images/Ghana_Pix1-1400.webp",
        srcSet:
          "Ghana_images/Ghana_Pix1-800.webp 800w, Ghana_images/Ghana_Pix1-1400.webp 1400w",
        width: 1400,
        height: 788,
        alt: "ASTIC team at the Ghana ASCEND Conference 2026"
      },
      {
        src: "Ghana_images/Ghana_Pix7-1400.webp",
        srcSet:
          "Ghana_images/Ghana_Pix7-800.webp 800w, Ghana_images/Ghana_Pix7-1400.webp 1400w",
        width: 1400,
        height: 788,
        alt: "AgroSolar showcase at the Ghana ASCEND Conference 2026"
      }
    ]
  }
];
