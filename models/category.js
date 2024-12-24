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
    const { categorie, categorieColor } = data;
    if (!categorie) throw new Error("categorie name is required");
    if (!categorieColor) throw new Error("categorieColor  is required");

    const category = {
      categorie,
      categorieColor: categorieColor || "",
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
};

module.exports = CategoryModel;
