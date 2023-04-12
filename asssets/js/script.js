fetch('https://digimon-api.vercel.app/api/digimon')
  .then(response => response.json())
  .then(data => {
    const digimonList = document.querySelector('#digimon-list');
    data.forEach(digimon => {
      const digimonItem = document.createElement('li');
      digimonItem.classList.add('list-group-item'); // Agregamos la clase de Bootstrap
      digimonItem.innerHTML = `
        <h2>${digimon.name}</h2>
        <img src="${digimon.img}" alt="${digimon.name}" class="img-thumbnail"> <!-- Agregamos la clase de Bootstrap para las imágenes -->
        <p class="fw-bold">${digimon.level}</p> <!-- Agregamos la clase de Bootstrap para dar formato al nivel del digimon -->
      `;
      digimonList.appendChild(digimonItem);
    });
  })
  .catch(error => console.error(error));
