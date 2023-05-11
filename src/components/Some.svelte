<script>
	// Temp hardcode
    let coords = {lat: 45.75, lon: 26.0031};
    let res;

	async function resolve() {
		const response = await fetch(`/api/city?lat=${coords.lat}&lon=${coords.lon}`);

		res = await response.json();
        console.log(res);
	}
</script>

<button on:click={resolve}>GET STUFF</button>
{#if res}
	<h3>City: {res.city}, country: {res.country}</h3>
{/if}