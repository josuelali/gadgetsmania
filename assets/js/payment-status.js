const statusBox = document.querySelector("#payment-status");
const sessionId = new URLSearchParams(location.search).get("session_id");
const validSession = /^cs_(test|live)_[A-Za-z0-9_]{10,255}$/.test(
  sessionId || "",
);

async function verify(attempt = 0) {
  if (!validSession) {
    statusBox.textContent =
      "The Checkout reference is missing or invalid. Please use the link from Stripe.";
    return;
  }
  try {
    const response = await fetch(
      `/api/checkout-status?session_id=${encodeURIComponent(sessionId)}`,
      { cache: "no-store" },
    );
    if (!response.ok) throw new Error("Status unavailable");
    const data = await response.json();
    if (data.status === "paid") {
      statusBox.textContent = `${data.name} is active with a verified €${(data.amountCents / 100).toFixed(0)} boost.`;
      return;
    }
    if (attempt < 8) {
      statusBox.textContent =
        "Payment received. Waiting for secure verification…";
      setTimeout(() => verify(attempt + 1), 1800);
      return;
    }
    statusBox.textContent =
      "Stripe is still confirming the payment. The ranking will update automatically.";
  } catch {
    statusBox.textContent =
      "We could not display the status yet. The signed Stripe webhook will still update the ranking automatically.";
  }
}

verify();
