import fetch from "node-fetch";

export const explainText = async (req, res) => {
  const { text } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Explain this content in simple terms.",
        },
        { role: "user", content: text },
      ],
    }),
  });

  const data = await response.json();
  res.json({ result: data.choices[0].message.content });
};

export const analyzeResume = async (req, res) => {
  const { text } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a senior recruiter. Analyze this resume and give improvements.",
        },
        { role: "user", content: text },
      ],
    }),
  });

  const data = await response.json();
  res.json({ result: data.choices[0].message.content });
};
