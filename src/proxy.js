import express from 'express';
import fetch from 'node-fetch';
import { get, set } from './cache.js';
import { timerStart, timerEnd } from './time.js';

export const router = express.Router();

async function getData(req, res) {
  const { period = 'hour', type = 'all' } = req.query;
  const allData = {
    data: {},
    info: {
      cached: true,
      elapsed: 0.500,
    },
  };

  const key = `P:${period}T:${type}`;

  const t1 = timerStart();
  const cached = await get(key);
  const cachedTime = timerEnd(t1);

  if (cached) {
    allData.data = cached;
    allData.info.cached = true;
    allData.info.elapsed = cachedTime;
    return res.json(allData);
  }

  let result;
  let fetchTime;
  try {
    const t2 = timerStart();
    result = await fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${type}_${period}.geojson`);
    fetchTime = timerEnd(t2);
  } catch (e) {
    console.error('Villa við að sækja gögn: ', e);
    return null;
  }

  if (!result.ok) {
    console.error('Ekki 200 svar', await result.text());
    return null;
  }

  const resultJSON = await result.json();

  await set(key, resultJSON.features);

  allData.data = resultJSON.features;
  allData.info.cached = false;
  allData.info.elapsed = fetchTime;

  return res.json(allData);
}

router.get('/proxy', getData);
