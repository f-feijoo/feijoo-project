document.addEventListener("submit", (e) => {
  e.preventDefault();
});
async function deleteCarrito(url) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: null,
  });
  return response.json();
}

async function deleteProd(url) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: null,
  });
  return response.json();
}