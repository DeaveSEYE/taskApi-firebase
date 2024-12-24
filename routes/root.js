const express = require("express");
const taskController = require("../controllers/taskController");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

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
const predefinedCategories = [
  {
    categorie: "Defaut",
    categorieColor: "grey",
    createdAt: "2024-12-24T16:54:06.957Z",
    updatedAt: "2024-12-24T16:54:06.957Z",
  },
  {
    categorie: "Design",
    categorieColor: "blue",
    createdAt: "2024-12-24T16:54:07.035Z",
    updatedAt: "2024-12-24T16:54:07.035Z",
  },
  {
    categorie: "Development",
    categorieColor: "orange",
    createdAt: "2024-12-24T16:54:07.115Z",
    updatedAt: "2024-12-24T16:54:07.116Z",
  },
  {
    categorie: "Marketing",
    categorieColor: "purple",
    createdAt: "2024-12-24T16:54:07.180Z",
    updatedAt: "2024-12-24T16:54:07.180Z",
  },
  {
    categorie: "Marketing",
    categorieColor: "purple",
    createdAt: "2024-12-24T16:54:07.225Z",
    updatedAt: "2024-12-24T16:54:07.225Z",
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
    const addedCategories = [];

    // Ajouter les tâches prédéfinies
    for (const task of predefinedTasks) {
      try {
        console.log(`Ajout de la tâche: ${task.title}`);
        const createdTask = await taskController.createTask(
          { body: task },
          {
            status: () => ({
              json: (data) => data,
            }),
          },
          () => {}
        );
        addedTasks.push(createdTask);
      } catch (taskError) {
        console.error(
          `Erreur lors de l'ajout de la tâche: ${task.title}`,
          taskError
        );
        throw new Error("Erreur lors de l'ajout des tâches.");
      }
    }

    // Ajouter les catégories prédéfinies
    for (const category of predefinedCategories) {
      try {
        console.log(`Ajout de la catégorie: ${category.categorie}`);
        const createdCategory = await categoryController.createCategory(
          { body: category },
          {
            status: () => ({
              json: (data) => data,
            }),
          },
          () => {}
        );
        addedCategories.push(createdCategory);
      } catch (categoryError) {
        console.error(
          `Erreur lors de l'ajout de la catégorie: ${category.categorie}`,
          categoryError
        );
        throw new Error("Erreur lors de l'ajout des catégories.");
      }
    }

    // Si tout a été ajouté avec succès
    res.send({
      message: "Tâches et catégories ajoutées avec succès.",
      tasks: addedTasks,
      categories: addedCategories,
    });
  } catch (error) {
    // Afficher un message d'erreur détaillé
    console.error("Erreur générale lors de l'ajout des données:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
