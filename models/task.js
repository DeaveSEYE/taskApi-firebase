const db = require("../config/firebase");

// Modèle pour les tâches
const TaskModel = {
  async getAll() {
    const snapshot = await db.collection("tasks").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },
  async getTasksByUserId(userId) {
    const snapshot = await db
      .collection("tasks")
      .where("userId", "==", userId)
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },
  async getById(id) {
    const doc = await db.collection("tasks").doc(id).get();
    if (!doc.exists) throw new Error("Tâche non trouvée");
    return { id: doc.id, ...doc.data() };
  },

  async create(data) {
    const {
      userId,
      title,
      categorie,
      description,
      priority,
      isChecked,
      categorieColor,
      createdAt,
      updatedAt,
      dueDate,
    } = data;

    // Définition des valeurs autorisées pour `priority`
    const validPriorities = ["basse", "moyenne", "eleve"];

    // Validation des champs requis
    if (!title || typeof title !== "string")
      throw new Error(
        "Le titre est requis et doit être une chaîne de caractères."
      );
    if (!userId || typeof userId !== "string")
      throw new Error("userId est requis.");
    if (!categorie || typeof categorie !== "string")
      throw new Error(
        "La catégorie est requise et doit être une chaîne de caractères."
      );
    if (!description || typeof description !== "string")
      throw new Error(
        "La description est requise et doit être une chaîne de caractères."
      );
    if (!isChecked || typeof isChecked !== "boolean")
      throw new Error("isChecked est requis et doit être un booléen.");
    if (!priority || !validPriorities.includes(priority))
      throw new Error(
        `La priorité est invalide. Les valeurs autorisées sont : ${validPriorities.join(
          ", "
        )}`
      );
    if (!categorieColor || typeof categorieColor !== "string")
      throw new Error(
        "La couleur de la catégorie est requise et doit être une chaîne de caractères."
      );
    if (!dueDate || isNaN(Date.parse(dueDate)))
      throw new Error(
        "La date d'échéance est requise et doit être une date valide."
      );

    // Création de la tâche
    const task = {
      userId,
      title,
      categorie,
      description,
      isChecked,
      priority,
      categorieColor,
      createdAt: new Date().toISOString(),
      updatedAt: "",
      dueDate,
    };

    const ref = await db.collection("tasks").add(task);
    return { id: ref.id, ...task };
  },

  async update(id, data) {
    const ref = db.collection("tasks").doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new Error("Tâche non trouvée");

    // Validation des priorités si `priority` est fourni
    if (data.priority) {
      const validPriorities = ["basse", "moyenne", "eleve"];
      if (!validPriorities.includes(data.priority)) {
        throw new Error(
          `La priorité est invalide. Les valeurs autorisées sont : ${validPriorities.join(
            ", "
          )}`
        );
      }
    }

    const updatedData = {
      ...doc.data(),
      ...data,
      updatedAt: new Date().toISOString(),
    };
    await ref.update(updatedData);
    return { id, ...updatedData };
  },

  async delete(id) {
    const ref = db.collection("tasks").doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new Error("Tâche non trouvée");

    await ref.delete();
    return { message: `Tâche avec l'id ${id} supprimée avec succès` };
  },
  async deleteAllTasks() {
    const ref = db.collection("tasks");
    const snapshot = await ref.get();

    // Si la collection est vide, renvoyer un message
    if (snapshot.empty) {
      throw new Error("Aucune tâche trouvée à supprimer");
    }

    // Supprimer chaque document dans la collection
    const batch = db.batch(); // Utilisation de `batch` pour des suppressions en bloc
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Exécuter le batch pour supprimer tous les documents
    await batch.commit();

    return { message: "Toutes les tâches ont été supprimées avec succès" };
  },
};

module.exports = TaskModel;
