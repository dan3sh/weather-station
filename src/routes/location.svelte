<script>
	import { onMount } from 'svelte';
	let location = null;
	let fetching = false;

	function getPosition() {
		fetching = true;
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude: lat, longitude: lon } = position.coords;
				location = { lat, lon };
				fetching = false;
			},
			(error) => {
				location = null;
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
		<div class="city">
			{location.lat}<br />
			{location.lon}
		</div>
	{/if}
{/if}
