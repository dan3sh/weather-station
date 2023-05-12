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
<h1>Location</h1>
{#if location}
<div class=info>
    <div class="city">
        {location.city}<br>
        {location.country}
    </div>
</div>
{/if}