const express = require("express");
const taskController = require("../controllers/taskController");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

const testTasks = [
  {
    title: "Tache par defaut",
    categorie: "Defaut",
    description: "description de la Tache par defaut",
    priority: "eleve",
    isChecked: true,
    categorieColor: "#9E9E9E",
    dueDate: "2024-12-05T17:00:00.000Z",
  },
  {
    title: "Tache de test",
    categorie: "Defaut",
    description: "Tache de test a modifier",
    priority: "basse",
    isChecked: false,
    categorieColor: "#9E9E9E",
    dueDate: "2024-12-05T17:00:00.000Z",
  },
  {
    title: " temoin",
    categorie: "Design",
    description: "Tache temoin",
    priority: "basse",
    isChecked: false,
    categorieColor: "#4CAF50",
    dueDate: "2024-12-05T17:00:00.000Z",
  },
];
// Liste des tâches prédéfinies
const predefinedTasks = [
  {
    title: "Créer un nouveau logo pour le site web.",
    categorie: "Design",
    description:
      "Concevoir un logo moderne et attrayant pour le site web de l'entreprise.",
    priority: "eleve",
    isChecked: false,
    categorieColor: "#4CAF50",
    dueDate: "2024-12-05T17:00:00.000Z",
  },
  {
    title: "Mettre à jour la conception de la page d'accueil",
    categorie: "Design",
    description:
      "Améliorer la page d'accueil du site pour la rendre plus interactive et visuellement attractive.",
    priority: "moyenne",
    isChecked: false,
    categorieColor: "#4CAF50",
    dueDate: "2024-12-10T18:00:00.000Z",
  },
  {
    title: "Corriger le bug de la page de connexion",
    categorie: "Development",
    description:
      "Résoudre le problème de connexion où certains utilisateurs ne peuvent pas se connecter avec leurs identifiants.",
    priority: "eleve",
    isChecked: true,
    categorieColor: "#607D8B",
    dueDate: "2024-12-02T15:00:00.000Z",
  },
  {
    title: "Planifier la campagne sur les réseaux sociaux",
    categorie: "Marketing",
    description:
      "Établir un plan pour la campagne publicitaire sur Facebook et Instagram pour le mois prochain.",
    priority: "basse",
    isChecked: false,
    categorieColor: "#03A9F4",
    dueDate: "2024-12-12T14:00:00.000Z",
  },
  {
    title: "Préparer la présentation pour la réunion client",
    categorie: "Marketing",
    description:
      "Créer une présentation PowerPoint détaillant les résultats de la dernière campagne et les prochaines étapes pour le client.",
    priority: "moyenne",
    isChecked: true,
    categorieColor: "#03A9F4",
    dueDate: "2024-12-07T09:00:00.000Z",
  },
  {
    title: "Basket",
    categorie: "Sport",
    description:
      "Créer une présentation PowerPoint détaillant les résultats de la dernière campagne et les prochaines étapes pour le client.",
    priority: "moyenne",
    isChecked: true,
    categorieColor: "#9C27B0",
    dueDate: "2024-12-07T09:00:00.000Z",
  },
];
const predefinedCategories = [
  {
    categorie: "Defaut",
    categorieColor: "#9E9E9E",
    createdAt: "2024-12-24T16:54:06.957Z",
    updatedAt: "2024-12-24T16:54:06.957Z",
  },
  {
    categorie: "Design",
    categorieColor: "#4CAF50",
    createdAt: "2024-12-24T16:54:07.035Z",
    updatedAt: "2024-12-24T16:54:07.035Z",
  },
  {
    categorie: "Development",
    categorieColor: "#607D8B",
    createdAt: "2024-12-24T16:54:07.115Z",
    updatedAt: "2024-12-24T16:54:07.116Z",
  },
  {
    categorie: "Marketing",
    categorieColor: "#03A9F4",
    createdAt: "2024-12-24T16:54:07.180Z",
    updatedAt: "2024-12-24T16:54:07.180Z",
  },
  {
    categorie: "Sport",
    categorieColor: "#9C27B0",
    createdAt: "2024-12-24T16:54:07.180Z",
    updatedAt: "2024-12-24T16:54:07.180Z",
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
router.get("/add/:type", async (req, res) => {
  // Récupérer le paramètre 'id' depuis l'URL
  const type = req.params.type;
  try {
    const addedTasks = [];
    const addedCategories = [];
    let item;
    if (type === "prod") {
      item = predefinedTasks;
    } else if (type === "test") {
      item = testTasks;
    } else {
      res.send({
        message: "soit add/test OU add/prod",
      });
      return;
    }
    // Ajouter les tâches prédéfinies
    for (const task of item) {
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
router.get("/deleteAll", async (req, res) => {
  try {
    console.log(`Suppression des tâches et des catégories`);

    // Suppression des tâches
    const deleteTasks = await taskController.deleteAllTasks();
    // console.log(deleteTasks.message); // Vous pouvez logguer ou utiliser les informations de la réponse

    // Suppression des catégories
    const deleteCategories = await categoryController.deleteAllCategories();
    // console.log(deleteCategories.message); // Vous pouvez logguer ou utiliser les informations de la réponse

    // Réponse après les suppressions
    res.send({
      message: "Toutes les tâches et catégories ont été supprimées avec succès",
      tasks: deleteTasks,
      categories: deleteCategories,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la suppression des tâches ou des catégories",
      error
    );
    res.status(500).send({
      error: "Erreur lors de la suppression des tâches ou des catégories",
    });
  }
});

module.exports = router;
