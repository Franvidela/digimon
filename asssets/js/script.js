function showDigimonDetails(digimon) {
	const $details = $('#digimon-details');
	$details.empty();
	if (digimon === null) {
		$details.append('<p class="text-muted">Selecciona un Digimon para ver sus detalles.</p>');
	} else {
		$details.append(`<h3>${digimon.name}</h3>`);
		$details.append(`<p><strong>Tipo:</strong> ${digimon.type}</p>`);
		$details.append(`<p><strong>Nivel:</strong> ${digimon.level}</p>`);
		if (digimon.img) {
			$details.append(`<img src="${digimon.img}" alt="${digimon.name}">`);
		}
	}
}

function getDigimonList() {
	return $.getJSON('https://digimon-api.vercel.app/api/digimon');
}

function searchDigimonByName(name) {
	return $.getJSON(`https://digimon-api.vercel.app/api/digimon/name/${name}`);
}

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

function groupDigimonByType(digimonList) {
	const groups = {};
	digimonList.forEach(function(digimon) {
		if (groups[digimon.type] === undefined) {
			groups[digimon.type] = [];
		}
		groups[digimon.type].push(digimon);
	});
	return groups;
}

function createChartData(groups) {
	const chartData = [];
	for (const type in groups) {
		if (groups.hasOwnProperty(type)) {
			chartData.push({label: type, y: groups[type].length});
		}
	}
	return chartData;
}

function showDigimonChart(digimonList) {
	const groups = groupDigimonByType(digimonList);
	const chartData = createChartData(groups);
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

$(document).ready(function() {
	// Obtiene la lista de digimon desde la API y la muestra en pantalla
	getDigimonList().then(function(data) {
		showDigimonList(data);
		showDigimonChart(data);
	});

	// Agrega un listener para el botón de búsqueda
	$('#search-button').click(function() {
		const searchTerm = $('#search-input').val().toLowerCase();
		// Filtra los digimon según el término de búsqueda
		searchDigimonByName(searchTerm).then(function(data) {
			showDigimonList(data);
			showDigimonChart(data);
		});
	});
});