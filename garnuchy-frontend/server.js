const express = require('express');
const HLTV = require('hltv-api').default; // Załóżmy, że to jest właściwy import
const app = express();
const port = 3001;

app.get('/upcoming-events', async (req, res) => {
  try {
    const events = await HLTV.getEvents();
    // Tutaj filtrujesz wydarzenia
    const upcomingEvents = events.filter(event => /* twoje warunki filtrowania */);
    res.json(upcomingEvents);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
