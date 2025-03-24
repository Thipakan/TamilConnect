-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 24 mars 2025 à 17:43
-- Version du serveur : 8.0.31
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tamilconnect`
--

-- --------------------------------------------------------

--
-- Structure de la table `cours`
--

DROP TABLE IF EXISTS `cours`;
CREATE TABLE IF NOT EXISTS `cours` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `fichier` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `cours`
--

INSERT INTO `cours` (`id`, `titre`, `fichier`) VALUES
(1, 'Tamoul pour débutants', 'tamoul_debutant.pdf'),
(2, 'Grammaire Tamoule', 'grammaire_tamoul.pdf'),
(3, 'Histoire des Tamouls', 'histoire_tamoule.pdf'),
(4, 'Littérature Tamoule', 'litterature_tamoule.pdf');

-- --------------------------------------------------------

--
-- Structure de la table `courses`
--

DROP TABLE IF EXISTS `courses`;
CREATE TABLE IF NOT EXISTS `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `teacherId` int DEFAULT NULL,
  `pdf_file` blob,
  `video_file_path` varchar(255) DEFAULT NULL,
  `video_file` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherId` (`teacherId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `file`, `createdAt`, `updatedAt`, `teacherId`, `pdf_file`, `video_file_path`, `video_file`) VALUES
(1, 'Tamoul débutant', 'initiation au tamoul', 'TamilConnect cours débutant.pdf', '2025-03-24 17:52:17', '2025-03-24 17:52:17', 1, NULL, NULL, NULL),
(2, 'Tamoul intermédiaire', 'cours niveau intermédiaire', 'TamilConnect cours intermédiare.pdf', '2025-03-24 17:56:22', '2025-03-24 17:56:22', 1, NULL, NULL, NULL),
(3, 'tamoul avancé', 'cours de tamoul avancé', 'TamilConnect cours avancé.pdf', '2025-03-24 17:57:06', '2025-03-24 17:57:06', 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','teacher') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'enseignant@tamilconnect.com', '$2y$10$KIX/f8HhVIV/N8kmZq8MeuUQbdZBvOx1G7TQ1rQPSMfJDCN/e0YuK', 'teacher', '2025-03-01 22:11:29', '2025-03-01 22:11:29'),
(2, 'testuser@example.com', '$2a$10$uE1uFq/O0p8f7yXIk74a4u05mADqUz3gejgxXJZH5yFHK4Ht11vhe', 'student', '2025-03-01 22:37:49', '2025-03-01 22:37:49'),
(3, 'thipakan12@hotmail.fr', '$2y$10$q4gBeuTFYz286WwZEq.se.C53I6FUfR3zZk11bAY4qb5xK0ZcKZ5u', 'teacher', '2025-03-02 09:59:43', '2025-03-02 09:59:43'),
(4, 'thipakan@hotmail.fr', '$2y$10$CRh1k/RCb5FU3YDjk56q5e86mhuaNdB9PaSsIICHjWwmi34MbUW.C', 'student', '2025-03-02 10:08:37', '2025-03-02 10:08:37');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
