# Vefforritun 2, 2021, verkefni 4

Heroku hlekkur: https://vefforritun2-v4.herokuapp.com/.

---

[Kynning á verkefni](https://youtu.be/U8K0m9zRxHk).

Bæta skal við server sem situr á milli beiðna frá client til USGS (proxyar beiðnir), þessi proxy notar redis til að cache gögn á milli fyrirspurna.

Einnig skal bæta við möguleikum á að sækja öll gögn eftir tímabili og stærðargráðu, í `index.html` er búið að setja upp lista af tenglum á hverja týpu. Útfæra þarf virkni í framenda sem sækir rétt gögn gegnum proxy þjónustu. Beiðnir á proxy þjónustu ættu að taka við querystring breytum, t.d. `/proxy?period=hour&type=significant` og skila gögnum ásamt auka lýsigögnum um fyrirspurn.

### Lýsigögn um fyrirspurn

Lýsigögn um fyrirspurn innihalda tvö gildi:

* Hvort gögn hafi verið sótt úr cache eða ekki
* Hversu lengi tók að sækja gögn í sekúndum (hvort heldur sem er úr cache eða með fetch), sjá `./src/time.js`

Formið á þeim ætti að vera:

```javascript
{
  data, // gögn um jarðskjálfta
  info: {
    cached: true,
    elapsed: 0.500,
  },
};
```

Gögnin skal síðan birta á framenda.

![](./utlit.png)

### Fetch

Bæði framendi (client) og bakendi (server) munu gera `fetch` köll og mikilvægt er að gera sér fulla grein á muninn á þeim.

Kóði fyrir framenda er í `./client`, kóði fyrir bakenda er í `./src`.

Framendi á proxy þjónustu bakenda, og bakendi á USGS þjónustu, ef gögn eru ekki í cache.

## Tæki og tól

Gefinn er grunnur, byggður á sýnilausn á verkefni 9 úr vef1. Búið að tengja saman browser-sync og nodemon þ.a. `npm run dev` virkar sem skildi. Það er gert með því að nota browser-sync sem proxy á server sem keyrir þá á port 3001.

Nota skal `node-fetch` á bakenda.

Setja skal upp `redis` og nota til að cachea gögn.

Setja skal verkefnið upp á Heroku með cache virkni.

