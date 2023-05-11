<script>
    const GEO_ENDPOINT = 'https://api.openweathermap.org/geo/1.0/reverse';
    let location;
    export let coords;
	export async function getCity(coords){
        const response = await fetch(`/api/city?lat=${coords.lat}&lon=${coords.lon}`);

		location = await response.json();
	}
    $: getCity(coords);

</script>
<h1>City</h1>
{#if location}
<main>
    <div class="city">
        <h3>{location.city}</h3>
        <h3>{location.country}</h3>
    </div>
</main>
{/if}