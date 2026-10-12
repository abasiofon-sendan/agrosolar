/* =====================================================
   RESEARCH DATA — single source of truth for the
   featured video block on student-research.html.
   Fields the page needs but nobody has supplied yet are
   marked TODO. No video content is hardcoded in the HTML.

   Source footage: images/agro reels shot.mp4 (1920x1080
   landscape, 64 s, ~120 MB). That file is NOT referenced
   directly and must stay out of git (over GitHub's 100 MB
   file limit). fullVideoUrl is a 720p/30fps web cut (11.8 MB,
   faststart) made from the source with ffmpeg.
   previewUrl is a 15 s 720p muted-cut region (2.5 MB) from the
   same source; posterUrl is a frame from it.
   ===================================================== */

export const research = [
  {
    id: "agrosolar-showcase-reel",
    /* Type tag shown above the headline: "PRACTICAL" or "WRITTEN".
       PRACTICAL is an inference (showcase reel of project work) —
       correct it if wrong. */
    type: "PRACTICAL",
    title: "Students Building the AgroSolar Harvest Prototype",
    /* One word of the title set italic in brand green.
       Empty = no italic word. */
    accentWord: "Students",
    summary: "Follow ASTIC students step by step as solar panels, wiring and cold-storage parts come together into a working harvest prototype. The reel traces the hands-on build process — solar setup, device assembly and testing — from workshop bench to finished unit.",
    students: "ASTIC students",
    supervisor: "TODO: supervisor",
    /* Detail page URL (unused: the details button was removed). */
    detailUrl: "",
    posterUrl: "images/agro-reels-poster.webp",
    posterWidth: 1000,
    posterHeight: 562,
    posterAlt: "Still from the AgroSolar showcase reel",
    /* Short preview clip, 15 s at 720p, 2.5 MB, with audio. It
       autoplays muted and unmutes on takeover. */
    previewUrl: "images/agro-reels-preview.mp4",
    /* Full video: 64 s web cut with sound. Loads only on click. */
    fullVideoUrl: "images/agro-reels-full.mp4",
    /* WebVTT captions file for the full video (TODO). */
    captionsUrl: "",
    /* Source is 1920x1080, so the card renders 16:9 wide. */
    orientation: "landscape"
  }
];
