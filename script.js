document.addEventListener("DOMContentLoaded", () => {
  const moodMap = {
    happy: ["#FDE68A", "#FCD34D", "#FBBF24", "#F59E0B"],
    sad: ["#64748B", "#475569", "#334155", "#1E293B"],
    calm: ["#A7F3D0", "#6EE7B7", "#34D399", "#10B981"],
    excited: ["#FBBF24", "#F59E0B", "#D97706", "#B45309"],
    angry: ["#EF4444", "#DC2626", "#B91C1C", "#991B1B"],
    inspired: ["#A78BFA", "#8B5CF6", "#7C3AED", "#6D28D9"],
    anxious: ["#F87171", "#EF4444", "#DC2626", "#B91C1B"],
    relaxed: ["#C7D2FE", "#A5B4FC", "#818CF8", "#6366F1"],
    confident: ["#FBBF24", "#F59E0B", "#D97706", "#B45309"],
    romantic: ["#F9A8D4", "#F472B6", "#EC4899", "#DB2777"]
  };

  // DOM elements
  const moodSelect = document.getElementById("moodSelect");
  const generateBtn = document.getElementById("generateBtn");
  const previewBtn = document.getElementById("previewBtn");
  const paletteContainer = document.getElementById("paletteContainer");
  const exportJSONBtn = document.getElementById("exportJSON");
  const copyTailwindBtn = document.getElementById("copyTailwind");
  const body = document.getElementById("body");

  let currentPalette = [];

  // Generate Palette
 generateBtn.addEventListener("click", () => {
  const mood = moodSelect.value;
  const palette = moodMap[mood];
  paletteContainer.innerHTML = "";
  currentPalette = [];

  if (!palette) {
    paletteContainer.innerHTML = "<p class='col-span-full text-red-500 text-center'>Please select a valid mood.</p>";
    return;
  }

  currentPalette = palette;

  palette.forEach(color => {
    const card = document.createElement("div");
    card.className = `
      rounded-xl shadow-lg p-4 flex flex-col items-center
      bg-white dark:bg-gray-800 border-4 border-gray-300 dark:border-gray-700
      transition-transform transform hover:scale-105 cursor-pointer
    `;

    card.innerHTML = `
      <div class="w-16 h-16 rounded-lg mb-3"
        style="background-color: ${color}; box-shadow: 0 0 15px ${color}aa;"
        title="Click to copy HEX"
        onclick="navigator.clipboard.writeText('${color}')">
      </div>
      <p class="text-sm font-mono text-gray-700 dark:text-gray-300">${color}</p>
      <button
        class="mt-3 text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-full shadow"
        onclick="navigator.clipboard.writeText('bg-[${color}]')">
        Copy Tailwind Class
      </button>
    `;

    paletteContainer.appendChild(card);
  });
});


  // Preview Palette as Background
  previewBtn.addEventListener("click", () => {
    if (currentPalette.length < 2) {
      alert("Please generate a palette first.");
      return;
    }
    const gradient = `linear-gradient(to right, ${currentPalette.join(", ")})`;
    body.style.backgroundImage = gradient;
  });

  // Export as JSON
  exportJSONBtn.addEventListener("click", () => {
    if (currentPalette.length === 0) return alert("No palette to export.");
    const blob = new Blob([JSON.stringify(currentPalette, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "palette.json";
    link.click();
  });

  // Copy Tailwind Config
  copyTailwindBtn.addEventListener("click", () => {
    if (currentPalette.length === 0) return alert("No palette to copy.");
    const snippet = `
module.exports = {
  theme: {
    extend: {
      colors: {
        moodPalette: {
          ${currentPalette.map((c, i) => `'color${i}': '${c}'`).join(",\n")}
        }
      }
    }
  }
}
`;
    navigator.clipboard.writeText(snippet);
    alert("Tailwind config snippet copied!");
  });
});
    