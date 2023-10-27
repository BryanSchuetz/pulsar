
module.exports = async function() {
	let url = "https://snazzy-bombolone-aaba7c.netlify.app/api/urls.json";
	let json = await CacheAsset(url, {
		duration: "1w",
		type: "json",
	});

	return json;
};