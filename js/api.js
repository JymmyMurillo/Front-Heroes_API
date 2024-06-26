// const API_URL = "http://localhost:3000";

const API_URL = "https://heroes-api-mongo-db-talento-tech.vercel.app";

const api = {
  getHeroes: async () => {
    const response = await fetch(`${API_URL}/heroes`);
    return await response.json();
  },
  getHero: async (id) => {
    const response = await fetch(`${API_URL}/heroes/${id}`);
    return await response.json();
  },
  createHero: async (hero) => {
    const response = await fetch(`${API_URL}/heroes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hero),
    });
    return await response.json();
  },
  updateHero: async (id, hero) => {
    const response = await fetch(`${API_URL}/heroes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hero),
    });
    return await response.json();
  },
  deleteHero: async (id) => {
    const response = await fetch(`${API_URL}/heroes/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  },
};