const OPEN_UV_ENDPOINT = 'https://api.openuv.io/api/v1/uv';
var headers = new Headers();
headers.append("x-access-token", `${import.meta.env.VITE_OPEN_UV_API_KEY}`);
headers.append("Content-Type", "application/json");

var options = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };

export async function GET({ url }) {
	const lat = url.searchParams.get('lat');
	const lon = url.searchParams.get('lon');
	const res = await fetch(
		`${OPEN_UV_ENDPOINT}?lat=${lat}&lng=${lon}`,
        options
	);
	const data = await res.json();
	if (res.ok) {
        return new Response(JSON.stringify(data.result.uv));
    } else {
        return new Response(JSON.stringify("Could not fetch weather data."))
    }
}
