const WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall';

export async function GET({ url }) {
	const lat = url.searchParams.get('lat');
	const lon = url.searchParams.get('lon');
	const res = await fetch(
		`${WEATHER_ENDPOINT}?lat=${lat}&lon=${lon}&appid=${
			import.meta.env.VITE_OPEN_WEATHER_API_KEY
		}&exclude=minutely,hourly,daily,alerts&units=metric`
	);
	const data = await res.json();
	if (res.ok) {
        return new Response(JSON.stringify(data.current));
    } else {
        return new Response(JSON.stringify("Could not fetch weather data."))
    }
}
