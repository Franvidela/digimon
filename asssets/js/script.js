$(document).ready(function() {
	// Obtiene la lista de digimon desde la API y la muestra en pantalla
	$.getJSON('https://digimon-api.vercel.app/api/digimon', function(data) {
		showDigimonList(data);
		showDigimonChart(data);
	});

	// Agrega un listener para el botón de búsqueda
	$('#search-button').click(function() {
		const searchTerm = $('#search-input').val().toLowerCase();
		// Filtra los digimon según el término de búsqueda
		$.getJSON(`https://digimon-api.vercel.app/api/digimon/name/${searchTerm}`, function(data) {
			showDigimonList(data);
			showDigimonChart(data);
		});
	});
});

// Muestra la lista de digimon en pantalla
function showDigimonList(digimonList) {
	const $list = $('#digimon-list');
	$list.empty();
	if (digimonList.length === 0) {
		$list.append('<p class="text-muted">No se encontraron resultados.</p>');
	} else {
		digimonList.forEach(function(digimon) {
			$list.append(`<li class="list-group-item">${digimon.name}</li>`);
		});
	}
}

// Muestra el gráfico de tipos de digimon en pantalla
function showDigimonChart(digimonList) {
	// Agrupa los digimon por tipo
	const groupedData = _.groupBy(digimonList, 'type');
	const chartData = [];

	// Crea un objeto para cada tipo de digimon con su cantidad y lo agrega al array de datos para el gráfico
	for (const type in groupedData) {
		if (groupedData.hasOwnProperty(type)) {
			chartData.push({label: type, y: groupedData[type].length});
		}
	}

	// Crea el gráfico de CanvasJS
	const chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		title: {
			text: "Tipos de Digimon"
		},
		data: [{
			type: "pie",
			startAngle: 240,
			yValueFormatString: "##0",
			indexLabel: "{label} {y}",
			dataPoints: chartData
		}]
	});
	chart.render();
}
