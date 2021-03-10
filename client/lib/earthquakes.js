export async function fetchEarthquakes(type, period) {
  // TODO sækja gögn frá proxy þjónustu
  let result;
  const API_URL = 'http://localhost:3001'; // harðkóðað - þarf ekki að setja á heroku
  const url = new URL(`/proxy?period=${period}&type=${type}`, API_URL).href;

  try {
    result = await fetch(url);
  } catch (e) {
    console.error('Villa við að sækja', e);
    return null;
  }

  if (!result.ok) {
    console.error('Ekki 200 svar', await result.text());
    return null;
  }

  const data = await result.json();

  return data;
}
