const express = require("express");
const router = express.Router();
const db = require("../config/firebase");

// Liste des tâches prédéfinies
const predefinedTasks = [
  {
    title: "Créer un nouveau logo pour le site web.",
    categorie: "Design",
    description:
      "Concevoir un logo moderne et attrayant pour le site web de l'entreprise.",
    priority: "eleve",
    isChecked: true,
    categorieColor: "blue",
    dueDate: "2024-12-05T17:00:00.000Z",
  },
  {
    title: "Mettre à jour la conception de la page d'accueil",
    categorie: "Design",
    description:
      "Améliorer la page d'accueil du site pour la rendre plus interactive et visuellement attractive.",
    priority: "moyenne",
    isChecked: false,
    categorieColor: "blue",
    dueDate: "2024-12-10T18:00:00.000Z",
  },
  {
    title: "Corriger le bug de la page de connexion",
    categorie: "Development",
    description:
      "Résoudre le problème de connexion où certains utilisateurs ne peuvent pas se connecter avec leurs identifiants.",
    priority: "eleve",
    isChecked: true,
    categorieColor: "orange",
    dueDate: "2024-12-02T15:00:00.000Z",
  },
  {
    title: "Planifier la campagne sur les réseaux sociaux",
    categorie: "Marketing",
    description:
      "Établir un plan pour la campagne publicitaire sur Facebook et Instagram pour le mois prochain.",
    priority: "basse",
    isChecked: false,
    categorieColor: "purple",
    dueDate: "2024-12-12T14:00:00.000Z",
  },
  {
    title: "Préparer la présentation pour la réunion client",
    categorie: "Marketing",
    description:
      "Créer une présentation PowerPoint détaillant les résultats de la dernière campagne et les prochaines étapes pour le client.",
    priority: "moyenne",
    isChecked: true,
    categorieColor: "purple",
    dueDate: "2024-12-07T09:00:00.000Z",
  },
  {
    title: "Basket",
    categorie: "Sport",
    description:
      "Créer une présentation PowerPoint détaillant les résultats de la dernière campagne et les prochaines étapes pour le client.",
    priority: "moyenne",
    isChecked: true,
    categorieColor: "red",
    dueDate: "2024-12-07T09:00:00.000Z",
  },
];

// Route d'accueil
router.get("/", (req, res) => {
  res.send(`
      <h1>Bienvenue à l'API de gestion de tâches LISTO</h1></br></br>
      <p>Pour ajouter des données aléatoires à l'API, veuillez visiter la route <strong>/add</strong>.</p>
    `);
});

// Route pour ajouter les tâches et leurs catégories
router.get("/add", async (req, res) => {
  try {
    const addedTasks = [];
    const addedCategories = new Set(); // Pour éviter les doublons dans les catégories

    for (const task of predefinedTasks) {
      // Ajouter la tâche à la collection `tasks`
      const taskRef = db.collection("tasks").doc();
      await taskRef.set(task);
      addedTasks.push({ id: taskRef.id, ...task });

      // Vérifier si la catégorie existe déjà
      if (!addedCategories.has(task.categorie)) {
        const categoriesRef = db.collection("categories");
        const snapshot = await categoriesRef
          .where("categorie", "==", task.categorie)
          .get();

        if (snapshot.empty) {
          // Ajouter la catégorie si elle n'existe pas
          await categoriesRef.add({
            categorie: task.categorie,
            color: task.categorieColor,
          });
        }
        addedCategories.add(task.categorie);
      }
    }

    res.send({
      message: "Tâches et catégories ajoutées avec succès.",
      tasks: addedTasks,
    });
  } catch (error) {
    res.status(500).send({
      error:
        "Une erreur est survenue lors de l'ajout des tâches ou des catégories.",
      details: error.message,
    });
  }
});

module.exports = router;
