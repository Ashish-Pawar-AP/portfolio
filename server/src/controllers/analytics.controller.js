import Analytics from "../models/Analytics.model.js";
import fetch from "node-fetch";

const botRegex = /bot|crawl|spider|facebook|whatsapp|telegram/i;

export const trackVisit = async (req, res) => {
  try {
    const userAgent = req.get("User-Agent") || "";
    const isBot = botRegex.test(userAgent);

    // Ignore bots
    if (isBot) return res.json({ ignored: true });

    let country = "Unknown";
    let city = "Unknown";

    // 🌍 GEO LOOKUP (SERVER SIDE – NO CORS)
    try {
      const geoRes = await fetch(
        `https://ipapi.co/${req.ip}/json/`
      );
      const geo = await geoRes.json();

      country = geo.country_name || country;
      city = geo.city || city;
    } catch (geoError) {
      console.log("Geo lookup failed");
    }

    await Analytics.create({
      ip: req.ip,
      pageVisited: req.body.pageVisited,
      referrer: req.get("Referrer") || "Direct",
      userAgent,
      device: req.body.device,
      country,
      city,
      isBot
    });

    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Analytics failed" });
  }
};

/**
 * Admin fetch
 */
export const getAnalytics = async (req, res) => {
  const data = await Analytics.find({ isBot: false })
    .sort({ createdAt: -1 });
  res.json(data);
};
