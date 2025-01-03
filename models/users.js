const db = require("../config/firebase");

// Modèle pour les utilisateurs
const UserModel = {
  async getAll() {
    const snapshot = await db.collection("users").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async getById(id) {
    const doc = await db.collection("users").doc(id).get();
    if (!doc.exists) throw new Error("User not found");
    return { id: doc.id, ...doc.data() };
  },

  async create(data) {
    // const { user, email, password, role } = data;
    const { user, email, password } = data;
    if (!user || !email || !password)
      throw new Error("user ,email and password are required");

    const userData = {
      user,
      email,
      password,
      // role: role || "user",
      createdAt: new Date().toISOString(),
    };

    const ref = await db.collection("users").add(userData);
    return { id: ref.id, ...user };
  },

  async update(id, data) {
    const ref = db.collection("users").doc(id);
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
    const ref = db.collection("users").doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new Error("User not found");

    await ref.delete();
    return { message: `User with id ${id} deleted successfully` };
  },
};

module.exports = UserModel;
