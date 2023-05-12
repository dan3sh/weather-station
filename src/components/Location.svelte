<script>
	import { onMount } from 'svelte';
	import City from './City.svelte';
	import OpenWeather from './OpenWeather.svelte';
	export let location = null;
	let fetching = false;

	function getPosition() {
		fetching = true;
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude: lat, longitude: lon } = position.coords;
				location = { lat, lon };
				fetching = false;
				console.log(location);
			},
			(error) => {
				fetching = false;
				console.log("Nope, Geolocation still isn't enabled.");
			}
		);
	}

	onMount(async () => {
		getPosition();
	});
</script>

{#if fetching}
	<p>Looking up your location...</p>
{:else}
	{#if location === null}
		<p>Error fetching location</p>
		<button on:click={getPosition}>Fetch Location</button>
		<p>
			Location services must be enabled for this app to work.<br />
			Please allow location services to run
		</p>
	{/if}
	{#if location}
		<City coords={location}/>
		<OpenWeather coords={location}/>
	{/if}
{/if}