import React, { useState, useRef } from "react";

export default function EspaceEnseignant() {
  const [isPremium, setIsPremium] = useState(false);
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Validation avant soumission
  const validateForm = (e) => {
    const pdfFile = fileInputRef.current?.value;
    const videoFile = videoInputRef.current?.value;

    if (!pdfFile && !videoFile) {
      e.preventDefault();
      alert("Vous devez télécharger soit un fichier PDF, soit une vidéo.");
      return false;
    }
    return true;
  };

  // Met à jour l'action du formulaire selon isPremium
  const updateFormAction = (e) => {
    const checked = e.target.checked;
    setIsPremium(checked);
    if (formRef.current) {
      formRef.current.action = checked ? "upload_course1.php" : "upload_course.php";
    }
  };

  return (
    <>
      <header>
        <h1>Bienvenue dans l&apos;espace enseignant</h1>
        <nav>
          <ul>
            <li>
              <a href="TamilConnect.html">Déconnexion</a>
            </li>
          </ul>
        </nav>
      </header>

      <section>
        <h2>Gérer les cours</h2>

        <form
          id="courseForm"
          ref={formRef}
          action="upload_course.php"
          method="POST"
          encType="multipart/form-data"
          onSubmit={validateForm}
        >
          <label htmlFor="title">Titre du cours :</label>
          <input type="text" name="title" id="title" required />
          <br />
          <br />

          <label htmlFor="description">Description :</label>
          <textarea name="description" id="description" rows="4" cols="50" required />
          <br />
          <br />

          <label htmlFor="file">
            Télécharger un fichier PDF (obligatoire si aucune vidéo) :
          </label>
          <input type="file" name="file" id="file" accept=".pdf" ref={fileInputRef} />
          <br />
          <br />

          <label htmlFor="video">
            Télécharger une vidéo (obligatoire si aucun PDF) :
          </label>
          <input
            type="file"
            name="video"
            id="video"
            accept="video/mp4,video/x-m4v,video/*"
            ref={videoInputRef}
          />
          <br />
          <br />

          <label htmlFor="isPremium">Cours Premium :</label>
          <input
            type="checkbox"
            name="isPremium"
            id="isPremium"
            value="1"
            checked={isPremium}
            onChange={updateFormAction}
          />
          <br />
          <br />

          <button type="submit">Ajouter le cours</button>
        </form>
      </section>

      <footer>
        <p>&copy; 2025 TamilConnect. Tous droits réservés.</p>
      </footer>
    </>
  );
}
