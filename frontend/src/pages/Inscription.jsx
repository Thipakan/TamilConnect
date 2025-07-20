import React, { useState } from 'react';
import "../App.css"; // ou 'styles.css' selon l’emplacement
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const countriesOptions = [
  { value: 'France', label: 'France' },
  { value: 'Belgique', label: 'Belgique' },
  { value: 'Suisse', label: 'Suisse' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Allemagne', label: 'Allemagne' },
  { value: 'Espagne', label: 'Espagne' },
  { value: 'Italie', label: 'Italie' },
  { value: 'États-Unis', label: 'États-Unis' },
  { value: 'Royaume-Uni', label: 'Royaume-Uni' },
  { value: 'Japon', label: 'Japon' },
  { value: 'Chine', label: 'Chine' },
  { value: 'Inde', label: 'Inde' },
  { value: 'Brésil', label: 'Brésil' },
  { value: 'Mexique', label: 'Mexique' },
  // Ajoute d'autres pays si besoin
];

const languagesOptions = [
  { value: 'Français', label: 'Français' },
  { value: 'Anglais', label: 'Anglais' },
  { value: 'Espagnol', label: 'Espagnol' },
  { value: 'Allemand', label: 'Allemand' },
];

const goalsOptions = [
  { value: 'Lire', label: 'Lire' },
  { value: 'Écrire', label: 'Écrire' },
  { value: 'Parler', label: 'Parler' },
];

export default function Inscription() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
    country: null,
    level: '',
    languages: [],
    goals: [],
    motivation: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = selectedOption => {
    setFormData(prev => ({ ...prev, country: selectedOption }));
  };

  const handleLanguagesChange = selectedOptions => {
    setFormData(prev => ({ ...prev, languages: selectedOptions || [] }));
  };

  const handleGoalsChange = selectedOptions => {
    setFormData(prev => ({ ...prev, goals: selectedOptions || [] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      password: formData.password,
      first_name: formData.first_name,
      last_name: formData.last_name,
      birth_date: formData.birth_date,
      gender: formData.gender,
      country: formData.country ? formData.country.value : '',
      level: formData.level,
      languages: formData.languages.map(l => l.value).join(','),
      goals: formData.goals.map(g => g.value).join(','),
      motivation: formData.motivation,
    };

    try {
      const res = await fetch('/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        alert('Inscription réussie !');
        // ici tu peux faire une redirection ou reset form
      } else {
        alert('Erreur : ' + (result.error || 'Erreur inconnue'));
      }
    } catch (error) {
      alert('Erreur réseau ou serveur');
    }
  };

  return (
    <>
      {/* Header */}
      <header>
        <div className="logo">
          <h1>TamilConnect</h1>
        </div>
        <nav>
          <ul>
            <li><a href="/accueil">Accueil</a></li>
            <li><a href="/a-propos">À propos</a></li>
            <li><a href="/histoire">Histoire des Tamouls</a></li>
            <li><a href="/cours">Cours</a></li>
            <li><a href="/connexion">Se connecter</a></li>
            <li><a href="/inscription">S'inscrire</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Section inscription */}
      <main className="inscription-container">
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="last_name"
            placeholder="Nom"
            value={formData.last_name}
            onChange={handleChange}
          />
          <br />

          <input
            type="text"
            name="first_name"
            placeholder="Prénom"
            value={formData.first_name}
            onChange={handleChange}
          />
          <br />


          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br />

          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
          />
          <br />

          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Genre</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Autre">Autre</option>
          </select>
          <br />

          <label>Pays :</label>
          <Select
            options={countriesOptions}
            value={formData.country}
            onChange={handleCountryChange}
            placeholder="Sélectionnez un pays"
            isClearable
          />
          <br />

          <select name="level" value={formData.level} onChange={handleChange} required>
            <option value="">Niveau</option>
            <option value="Débutant">Débutant</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Avancé">Avancé</option>
          </select>
          <br />

          <label>Langues parlées :</label>
          <CreatableSelect
            isMulti
            options={languagesOptions}
            value={formData.languages}
            onChange={handleLanguagesChange}
            placeholder="Choisissez ou ajoutez des langues"
          />
          <br />

          <label>Objectifs :</label>
          <CreatableSelect
            isMulti
            options={goalsOptions}
            value={formData.goals}
            onChange={handleGoalsChange}
            placeholder="Choisissez ou ajoutez des objectifs"
          />
          <br />

          <label>Motivation :</label><br />
          <textarea
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            rows="4"
            cols="40"
            placeholder="Explique ta motivation..."
          ></textarea>
          <br />

          <button type="submit">S’inscrire</button>
        </form>
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 TamilConnect. Tous droits réservés.</p>
        <p>
          Suivez-nous sur <a href="#">Facebook</a>, <a href="#">Instagram</a>, <a href="#">Twitter</a>.
        </p>
      </footer>
    </>
  );
}
