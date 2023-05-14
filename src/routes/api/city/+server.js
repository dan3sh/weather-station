const GEO_ENDPOINT = 'https://api.openweathermap.org/geo/1.0/reverse';

export async function GET({url}) {

    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');
    let location;
    const res = await fetch(`${GEO_ENDPOINT}?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`)
    const data = await res.json();
    if (res.ok) {
        location = {
            city: data[0].name,
            country: data[0].country
        };
    }
    return new Response(JSON.stringify(location));
}