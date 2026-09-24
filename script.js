/*
  Mulher Segura DF — links
  --------------------------------------------------
  Os links dos botões ficam direto no index.html (atributo href).
  Aqui fica apenas o botão "Compartilhe esta página".
*/

const PAGE_URL = "https://msdflinks.rbcip.org/";

const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2800);
}

document.getElementById("shareButton").addEventListener("click", async () => {
  const shareData = {
    title: "Mulher Segura DF",
    text: "Acesse os canais oficiais do Mulher Segura DF.",
    url: PAGE_URL
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(PAGE_URL);
    showToast("Link copiado para a área de transferência.");
  } catch (error) {
    if (error?.name !== "AbortError") {
      showToast("Não foi possível compartilhar. Acesse msdflinks.rbcip.org.");
    }
  }
});
