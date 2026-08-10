/*
  Mulher Segura DF — links
  --------------------------------------------------
  Substitua APENAS os links abaixo quando tiver as URLs
  oficiais das lojas Android e iOS.
*/

const LINKS = {
  website: "https://rbcip.org",
  android: "COLE_AQUI_O_LINK_DA_GOOGLE_PLAY",
  ios: "COLE_AQUI_O_LINK_DA_APP_STORE",
  about: "https://rbcip.org"
};

const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2800);
}

function isPlaceholder(url) {
  return !url || url.startsWith("COLE_AQUI") || url === "#";
}

document.querySelectorAll("[data-link]").forEach((element) => {
  const key = element.dataset.link;
  const url = LINKS[key];

  if (!isPlaceholder(url)) {
    element.href = url;
  }

  element.addEventListener("click", (event) => {
    if (isPlaceholder(url)) {
      event.preventDefault();

      if (key === "android") {
        showToast("Adicione no script.js o link oficial da Google Play.");
      } else if (key === "ios") {
        showToast("Adicione no script.js o link oficial da App Store.");
      }
    }
  });
});

document.getElementById("shareButton").addEventListener("click", async () => {
  const shareData = {
    title: "Mulher Segura DF",
    text: "Acesse os canais oficiais do Mulher Segura DF.",
    url: LINKS.website
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(LINKS.website);
    showToast("Link copiado para a área de transferência.");
  } catch (error) {
    if (error?.name !== "AbortError") {
      showToast("Não foi possível compartilhar. Acesse rbcip.org.");
    }
  }
});