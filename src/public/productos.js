document.addEventListener("submit", (e) => {
  e.preventDefault();
});

async function sendProd(url, id) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    return response.json();
}
