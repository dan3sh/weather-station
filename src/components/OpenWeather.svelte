<script>
	export let coords;
	let weather;

	export async function getOpenWeather(coords) {
		const response = await fetch(`/api/open-weather?lat=${coords.lat}&lon=${coords.lon}`);

		const weather_data = await response.json();
		weather = {
			temperature: weather_data.temp,
			icon: weather_data.weather[0].icon,
			description: weather_data.weather[0].description,
			uvi: weather_data.uvi,
			humidity: weather_data.humidity,
			pressure: weather_data.pressure,
			wind_deg: weather_data.wind_deg,
			wind_speed: weather_data.wind_speed
		};
		console.log(weather);
	}

	$: getOpenWeather(coords);
</script>
{#if weather}
<section class="icon">
    <div class="weather_icon">
        <i class="wi wi-day-cloudy" />
    </div>
</section>
<section class="bottom">
        <h3>OpenWeather</h3>
		<div class="weather_data">
			<div>
				<div class="weathericons air_temperature" />
				<span>Air {weather.temperature} &degC</span>
			</div>
			<div>
				<div class="weathericons uv_index" />
				<span>UVI {weather.uvi}</span>
			</div>
			<div>
				<div class="weathericons pressure" />
				<span>Pressure {weather.pressure} hPa</span>
			</div>
			<div>
				<div class="weathericons humidity" />
				<span>Humidity {weather.humidity} %</span>
			</div>
			<div>
				<div class="weathericons wind" style="transform: rotate({weather.wind_deg}deg)" />
				<span>Wind {weather.wind_speed} km/h</span>
			</div>
		</div>
	</section>
{:else}
	<p>Loading weather data...</p>
{/if}
