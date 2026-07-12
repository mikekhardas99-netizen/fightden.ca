export async function onRequest(context)
{
  // 1. Define the external API endpoint
  const targetUrl = "https://httpbin.org/get";

  try {
    // 2. Fetch the external resource
    const response = await fetch(targetUrl, {
      method: "GET"
      /*headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${context.env.API_SECRET_KEY}` // Securely retrieve keys from env
      }*/
    });

    // 3. Extract the JSON payload
    const data = await response.json();

    // 4. Return the data back to your frontend application
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed fetching external API" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}