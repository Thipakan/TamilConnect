-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 13 avr. 2025 à 21:10
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
  `is_premium` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `teacherId` (`teacherId`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `file`, `createdAt`, `updatedAt`, `teacherId`, `pdf_file`, `video_file_path`, `video_file`, `is_premium`) VALUES
(1, 'Tamoul débutant', 'initiation au tamoul', 'TamilConnect cours débutant.pdf', '2025-03-24 17:52:17', '2025-03-24 17:52:17', 1, NULL, NULL, NULL, 0),
(2, 'Tamoul intermédiaire', 'cours niveau intermédiaire', 'TamilConnect cours intermédiare.pdf', '2025-03-24 17:56:22', '2025-03-24 17:56:22', 1, NULL, NULL, NULL, 0),
(3, 'tamoul avancé', 'cours de tamoul avancé', 'TamilConnect cours avancé.pdf', '2025-03-24 17:57:06', '2025-03-24 17:57:06', 1, NULL, NULL, NULL, 0),
(4, 'Grammaire tamoule', 'voyelles et consonnes tamoules', 'TamilConnect grammaire tamoule.pdf', '2025-03-26 19:57:41', '2025-03-26 19:57:41', 1, NULL, NULL, '', 1);

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quiz_id` int DEFAULT NULL,
  `question` text,
  PRIMARY KEY (`id`),
  KEY `quiz_id` (`quiz_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `questions`
--

INSERT INTO `questions` (`id`, `quiz_id`, `question`) VALUES
(1, 1, 'Quelle est la capitale historique du royaume Chola ?'),
(2, 2, 'Quelle est la principale caractéristique des voyelles tamoules ?'),
(3, 2, 'Combien de consonnes existe-t-il en tamoul ?'),
(4, 3, 'Qui est l’auteur du célèbre poème \"Kamba Ramayanam\" ?'),
(5, 3, 'Quel est le premier livre écrit par Bharathiyar ?'),
(6, 4, 'Quel est le festival le plus célébré en Tamoul Nadu ?'),
(7, 4, 'Qui est la divinité principale dans la culture Tamoule ?');

-- --------------------------------------------------------

--
-- Structure de la table `quizzes`
--

DROP TABLE IF EXISTS `quizzes`;
CREATE TABLE IF NOT EXISTS `quizzes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `quizzes`
--

INSERT INTO `quizzes` (`id`, `title`) VALUES
(1, 'Quiz sur l\'Histoire Tamoule'),
(2, 'Quiz sur la Grammaire Tamoule'),
(3, 'Quiz sur la Littérature Tamoule'),
(4, 'Quiz sur la Culture Tamoule');

-- --------------------------------------------------------

--
-- Structure de la table `reponses`
--

DROP TABLE IF EXISTS `reponses`;
CREATE TABLE IF NOT EXISTS `reponses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int DEFAULT NULL,
  `reponse` text,
  `is_correct` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `reponses`
--

INSERT INTO `reponses` (`id`, `question_id`, `reponse`, `is_correct`) VALUES
(1, 1, 'Raja Raja Chola', 1),
(2, 1, 'Ashoka', 0),
(3, 1, 'Vijayanagar', 0),
(4, 2, 'La colonisation britannique', 0),
(5, 2, 'La bataille de Talaiyali', 1),
(6, 2, 'L\'invasion mongole', 0),
(7, 3, 'Tamoul', 1),
(8, 3, 'Hindi', 0),
(9, 3, 'Anglais', 0),
(10, 1, 'Raja Raja Chola', 1),
(11, 1, 'Ashoka', 0),
(12, 1, 'Vijayanagar', 0),
(13, 2, 'La colonisation britannique', 0),
(14, 2, 'La bataille de Talaiyali', 1),
(15, 2, 'L\'invasion mongole', 0),
(16, 3, 'Tamoul', 1),
(17, 3, 'Hindi', 0),
(18, 3, 'Anglais', 0),
(19, 2, 'Les voyelles sont de différentes longueurs', 1),
(20, 2, 'Les voyelles sont toutes de la même longueur', 0),
(21, 3, '18 consonnes', 0),
(22, 3, '21 consonnes', 1),
(23, 4, 'Kamban', 1),
(24, 4, 'Bharathiyar', 0),
(25, 5, 'Kuyil Pattu', 0),
(26, 5, 'Bharathidasan', 1),
(27, 6, 'Pongal', 1),
(28, 6, 'Diwali', 0),
(29, 7, 'Shiva', 1),
(30, 7, 'Vishnu', 0);

-- --------------------------------------------------------

--
-- Structure de la table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `subscription_type` enum('monthly','yearly') NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `premium_status` enum('none','active','expired') DEFAULT 'none',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `createdAt`, `updatedAt`, `premium_status`) VALUES
(1, 'enseignant@tamilconnect.com', '$2y$10$KIX/f8HhVIV/N8kmZq8MeuUQbdZBvOx1G7TQ1rQPSMfJDCN/e0YuK', 'teacher', '2025-03-01 22:11:29', '2025-03-01 22:11:29', 'none'),
(2, 'testuser@example.com', '$2a$10$uE1uFq/O0p8f7yXIk74a4u05mADqUz3gejgxXJZH5yFHK4Ht11vhe', 'student', '2025-03-01 22:37:49', '2025-03-01 22:37:49', 'none'),
(3, 'thipakan12@hotmail.fr', '$2y$10$q4gBeuTFYz286WwZEq.se.C53I6FUfR3zZk11bAY4qb5xK0ZcKZ5u', 'teacher', '2025-03-02 09:59:43', '2025-03-02 09:59:43', 'none'),
(4, 'thipakan@hotmail.fr', '$2y$10$CRh1k/RCb5FU3YDjk56q5e86mhuaNdB9PaSsIICHjWwmi34MbUW.C', 'student', '2025-03-02 10:08:37', '2025-03-02 10:08:37', 'active');

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
