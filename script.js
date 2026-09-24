/*
  Mulher Segura DF — links
  --------------------------------------------------
  Os links dos botões ficam direto no index.html (atributo href).
  Aqui fica apenas o botão "Compartilhe esta página".
*/

const PAGE_URL = "https://msdflinks.rbcip.org/";

const toast = document.getElementById("toast");

function showToast(message, duration = 2800) {
  toast.textContent = message;
  toast.classList.add("is-visible");

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, duration);
}

// Cópia "à moda antiga": funciona mesmo sem HTTPS e em navegadores
// internos de apps (Instagram, Facebook), onde a Clipboard API falha.
function legacyCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.opacity = "0";
  textarea.style.fontSize = "16px"; // evita zoom automático no iOS
  document.body.appendChild(textarea);

  textarea.select();
  textarea.setSelectionRange(0, text.length);

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  textarea.remove();
  return copied;
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // segue para a cópia alternativa
  }
  return legacyCopy(text);
}

document.getElementById("shareButton").addEventListener("click", async () => {
  const shareData = {
    title: "Mulher Segura DF",
    text: "Acesse os canais oficiais do Mulher Segura DF.",
    url: PAGE_URL
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      // Usuária cancelou: não faz nada.
      if (error?.name === "AbortError") return;
      // Qualquer outro erro: tenta copiar o link.
    }
  }

  if (await copyText(PAGE_URL)) {
    showToast("Link copiado! Agora é só colar e enviar.");
    return;
  }

  showToast("Copie e compartilhe: msdflinks.rbcip.org", 6000);
});
