const fetchData = async () => {
	let data = await fetch('http://192.168.1.107/Gvent/Produits/listProduits.php', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			// 'Content-Type': 'application/json',
			// 'Allow-Access-Control-Origin': '*'
		},
		body: {
			table: 'produits',
			phone: '1111'
		}
	});

	console.log(data);

	if (data.ok) {
		data = await data.json();
		console.log(data);
	} else {
		data = await data.json();
		console.log(data);
	}
}

fetchData();