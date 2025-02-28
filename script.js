async function cargarHerramientas() {
  const response = await fetch('opciones.csv');  // Indica el nombre del archivo CSV desde donde se obtendran los valores
  const data = await response.text();
  const herramientas = parseCSV(data);
  const herramientasContainer = document.getElementById('herramientas-container');

  herramientas.forEach(herramienta => {
    const herramientaElement = document.createElement('section');
    herramientaElement.classList.add('herramienta');
    if (herramienta['¿resaltar?'] === 'sí') {
      herramientaElement.classList.add('resaltada');
    }
    herramientaElement.innerHTML = `
      <h2>${herramienta.titulo}</h2>
      <p>${herramienta.descripcion}</p>
      <a href="${herramienta.url}" target="_blank">Ir a ${herramienta.titulo}</a>
    `;
    herramientasContainer.appendChild(herramientaElement);
  });
}

function parseCSV(csv) {
  const lineas = csv.split('\n');
  const headers = lineas[0].split(',');
  const herramientas = [];

  for (let i = 1; i < lineas.length; i++) {
    const values = lineas[i].split(',');
    if (values.length === headers.length) {
      const herramienta = {};
      for (let j = 0; j < headers.length; j++) {
        herramienta[headers[j].trim()] = values[j].trim();
      }
      herramientas.push(herramienta);
    }
  }
  return herramientas;
}

cargarHerramientas();