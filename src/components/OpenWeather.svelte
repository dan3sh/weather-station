<script>
	export let coords;
	let weather;
	let uvi = {
		openWeather: null,
		openUV: null
	};

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
			wind_speed: weather_data.wind_speed,
			clouds: weather_data.clouds
		};
		uvi.openWeather = weather.uvi;
	}

	export async function getOpenUV(coords) {
		const response = await fetch(`/api/uv?lat=${coords.lat}&lon=${coords.lon}`);
		const uvi_data = await response.json();
		uvi.openUV = calculateUVI(uvi_data);
	}

	function calculateUVI(uvi_data) {
        "Because the returned UVI is raw, we need to account for the real atmosphere situation"
		let clouds = weather.clouds / 100;
		if (clouds >= 0.2 && clouds < 0.7) uvi_data = uvi_data * 0.89;
		else if (clouds >= 0.7 && clouds < 0.9) uvi_data = uvi_data * 0.73;
		else if (clouds >= 0.9) uvi_data = uvi_data * 0.31;
		else uvi_data;
		return uvi_data.toFixed(2);
	}

	$: getOpenWeather(coords);
	$: getOpenUV(coords);
</script>

{#if weather}
	<section class="icon">
		<div class="weather_icon">
			<i class="wi wi-day-cloudy" />
		</div>
	</section>
	<section class="bottom">
		<div class="weather_data">
			<div>
				<div class="weathericons air_temperature" />
				<span>Air {weather.temperature} &degC</span>
			</div>
			<div>
				<div class="weathericons uv_index" />
				<span title='OpenWeather: {uvi.openWeather}, OpenUV: {uvi.openUV}' 
					>UVI {
                        Math.min(uvi.openWeather, uvi.openUV)
                    } - {
                        Math.max(uvi.openWeather, uvi.openUV)
					}
                </span>
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
