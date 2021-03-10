import express from 'express';
import fetch from 'node-fetch';

// TODO útfæra proxy virkni
export const router = express.Router();

async function getData(req, res) {
  const { period = 'hour', type = 'all' } = req.query;
  let result;
  try {
    result = await fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${type}_${period}.geojson`);
  } catch (e) {
    console.error('Villa við að sækja gögn: ', e);
    return null;
  }

  if (!result.ok) {
    console.error('Ekki 200 svar', await result.text());
    return null;
  }

  const data = await result.json();

  return res.json(data.features);
}

router.get('/proxy', getData);
