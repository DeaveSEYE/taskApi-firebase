const db = require("../config/firebase");

// Modèle pour les catégories
const CategoryModel = {
  async getAll() {
    const snapshot = await db.collection("categories").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async getById(id) {
    const doc = await db.collection("categories").doc(id).get();
    if (!doc.exists) throw new Error("categorie non trouvée");
    return { id: doc.id, ...doc.data() };
  },
  async create(data) {
    const { categorie, categorieColor, userId } = data;
    if (!userId) throw new Error("userId is required");
    if (!categorie) throw new Error("categorie name is required");
    if (!categorieColor) throw new Error("categorieColor  is required");

    const category = {
      userId,
      categorie,
      categorieColor: categorieColor,
      createdAt: new Date().toISOString(),
      updatedAt: "",
    };

    const ref = await db.collection("categories").add(category);
    return { id: ref.id, ...category };
  },

  async update(id, data) {
    const ref = db.collection("categories").doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new Error("categorie non trouvée");

    const updatedData = {
      ...doc.data(),
      ...data,
      updatedAt: new Date().toISOString(),
    };
    await ref.update(updatedData);
    return { id, ...updatedData };
  },

  async delete(id) {
    const ref = db.collection("categories").doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new Error("categorie non trouvée");

    await ref.delete();
    return { message: `Categorie avec l'id ${id} supprimée avec success` };
  },
  async deleteAllCategories() {
    const categoriesRef = db.collection("categories");
    const categoriesSnapshot = await categoriesRef.get();

    // Si la collection est vide, renvoyer un message
    if (categoriesSnapshot.empty) {
      throw new Error("Aucune Categorie trouvée à supprimer");
    }

    // Supprimer chaque document dans la collection
    const batch = db.batch(); // Utilisation de `batch` pour des suppressions en bloc
    categoriesSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Exécuter le batch pour supprimer tous les documents
    await batch.commit();

    return { message: "Toutes les categories ont été supprimées avec succès" };
  },
};

module.exports = CategoryModel;
