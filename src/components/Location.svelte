<script>
	import { onMount } from 'svelte';
	import City from './City.svelte';
	import OpenWeather from './OpenWeather.svelte';
	export let location = null;
	let fetching = false;
	let datetime = new Date();
	datetime.setSeconds(0,0);

	function getPosition() {
		fetching = true;
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude: lat, longitude: lon } = position.coords;
				location = { lat, lon };
				fetching = false;
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


<article class="widget">
	<section class="top">
	  <div class="info">{datetime.toLocaleString()
	  .replace(/\//g, ".")
	  .replace(/, /, " @ ")
	  .replace(/\:00/g,"h")}
	  </div>
	  {#if fetching}
	  	<span>Looking up your location...</span>
	  {:else}
		{#if location === null}
			<p>Error fetching location</p>
			<button on:click={getPosition}>Fetch Location</button>
			<p>
				Location services must be enabled for this app to work.<br />
				Please allow location services to run
			</p>
		{/if}
	{/if}
	</section>
{#if location}
	<City coords={location}/>
	<OpenWeather coords={location}/>
{/if}
</article>
<footer>
</footer>

<style>
	.top button {
	  margin: 50px auto;
	  display: flex;
	}
  
	.top p, .top span {
	  padding: 0 40px;
	}
	.top span {
	  display: flex;
	  justify-content: center;
	}
  </style>