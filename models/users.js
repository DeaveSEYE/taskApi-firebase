const db = require("../config/firebase");

// Modèle pour les utilisateurs
const UserModel = {
  async getAll() {
    const snapshot = await db.collection("Users").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async getById(id) {
    const doc = await db.collection("Users").doc(id).get();
    if (!doc.exists) throw new Error("User not found");
    return { id: doc.id, ...doc.data() };
  },

  async create(data) {
    const { name, email, role } = data;
    if (!name || !email) throw new Error("Name and email are required");

    const user = {
      name,
      email,
      role: role || "user",
      createdAt: new Date().toISOString(),
    };

    const ref = await db.collection("Users").add(user);
    return { id: ref.id, ...user };
  },

  async update(id, data) {
    const ref = db.collection("Users").doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new Error("User not found");

    const updatedData = {
      ...doc.data(),
      ...data,
      updatedAt: new Date().toISOString(),
    };
    await ref.update(updatedData);
    return { id, ...updatedData };
  },

  async delete(id) {
    const ref = db.collection("Users").doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new Error("User not found");

    await ref.delete();
    return { message: `User with id ${id} deleted successfully` };
  },
};

module.exports = UserModel;
