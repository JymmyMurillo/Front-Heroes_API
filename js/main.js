document.addEventListener("DOMContentLoaded", () => {
  const heroList = document.getElementById("hero-list");
  const heroFormModal = document.getElementById("hero-form-modal");
  const heroForm = document.getElementById("hero-form");
  const addHeroBtn = document.getElementById("add-hero-btn");
  const closeModalBtn = document.querySelector(".modal .close");
  const formTitle = document.getElementById("form-title");
  const heroIdInput = document.getElementById("hero-id");
  const heroNameInput = document.getElementById("hero-name");
  const heroImageInput = document.getElementById("hero-image");

  const showModal = () => {
    heroFormModal.style.display = "block";
  };

  const closeModal = () => {
    heroFormModal.style.display = "none";
  };

  const clearForm = () => {
    heroIdInput.value = "";
    heroNameInput.value = "";
    heroImageInput.value = "";
  };

  const loadHeroes = async () => {
    const heroes = await api.getHeroes();
    console.log(heroes);
    heroList.innerHTML = "";
    heroes.forEach((hero) => {
      const heroCard = document.createElement("div");
      heroCard.className = "hero-card";
      heroCard.innerHTML = `
                <img src="${hero.image}" alt="${hero.name}">
                <h3>${hero.name}</h3>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Borrar</button>
            `;

      const editBtn = heroCard.querySelector(".edit-btn");
      const deleteBtn = heroCard.querySelector(".delete-btn");

      editBtn.addEventListener("click", () => {
        formTitle.textContent = "Editar Heroe";
        heroIdInput.value = hero._id;
        heroNameInput.value = hero.name;
        heroImageInput.value = hero.image;
        showModal();
      });

      deleteBtn.addEventListener("click", async () => {
        if (confirm("¿Estás seguro de que deseas eliminar este héroe?")) {
          await api.deleteHero(hero._id);
          loadHeroes();
        }
      });

      heroList.appendChild(heroCard);
    });
  };

  heroForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = heroIdInput.value;
    const name = heroNameInput.value.trim();
    const image = heroImageInput.value.trim();

    if (name === "" || image === "") {
      alert("El nombre y la imagen son campos obligatorios");
      return;
    }

    const hero = { name, image };

    if (id) {
      await api.updateHero(id, hero);
    } else {
      await api.createHero(hero);
    }

    loadHeroes();
    closeModal();
    clearForm();
  });

  addHeroBtn.addEventListener("click", () => {
    formTitle.textContent = "Agregar Heroe";
    clearForm();
    showModal();
  });

  closeModalBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === heroFormModal) {
      closeModal();
    }
  });

  loadHeroes();
});
