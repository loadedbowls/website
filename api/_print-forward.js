export async function forwardToPrinter(payload) {
  if (!process.env.PRINT_WEBHOOK_URL || !process.env.PRINT_WEBHOOK_SECRET) {
    return;
  }

  await fetch(process.env.PRINT_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Loaded-Bowls-Secret": process.env.PRINT_WEBHOOK_SECRET
    },
    body: JSON.stringify(payload)
  });
}
