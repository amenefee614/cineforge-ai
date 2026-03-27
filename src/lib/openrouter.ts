export async function callOpenRouter(
  systemPrompt: string,
  userInput: string,
  maxTokens: number = 1000
) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "",
        "X-Title": "CineForge AI",
      },
      body: JSON.stringify({
        model: "anthropic/claude-sonnet-4-6",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userInput },
        ],
        max_tokens: maxTokens,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response generated.";
}

export async function callOpenRouterWithHistory(
  systemPrompt: string,
  messages: { role: string; content: string }[],
  maxTokens: number = 1000
) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "",
        "X-Title": "CineForge AI",
      },
      body: JSON.stringify({
        model: "anthropic/claude-sonnet-4-6",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        max_tokens: maxTokens,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response generated.";
}
