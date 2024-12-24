const express = require("express");
const taskController = require("./controllers/taskController");
const categoryController = require("./controllers/categoryController");

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
      // Ajouter la tâche
      const createdTask = await taskController.createTask(
        { body: task },
        {
          status: () => ({
            json: (data) => data,
          }),
        },
        () => {}
      );

      // Ajouter la tâche à la liste des tâches ajoutées
      addedTasks.push(createdTask);

      // Vérifier si la catégorie existe déjà
      if (!addedCategories.has(task.categorie)) {
        const categories = await categoryController.getAllCategories(
          req,
          {
            status: () => ({
              json: (data) => data,
            }),
          },
          () => {}
        );
        const categoryExists = categories.some(
          (cat) => cat.name === task.categorie
        );

        if (!categoryExists) {
          // Ajouter la catégorie si elle n'existe pas
          await categoryController.createCategory(
            { body: { name: task.categorie, color: task.categorieColor } },
            {
              status: () => ({
                json: (data) => data,
              }),
            },
            () => {}
          );
        }
        addedCategories.add(task.categorie);
      }
    }

    res.send({
      message: "Tâches et catégories ajoutées avec succès.",
      tasks: addedTasks,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout des données :", error);
    res.status(500).json({ error: "Erreur lors de l'ajout des données." });
  }
});

module.exports = router;
