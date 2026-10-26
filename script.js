const root = document.documentElement;
const $ = (id) => document.getElementById(id);

const timeEl = $("clockTime");
const dateEl = $("clockDate");

const defaults = {
  font: "digital",
  weight: "700",
  size: "150",
  color: "#66b8f0",
  selection: "#66b8f0",
  opacity: "35",
  date: true,
  seconds: true,
  italic: true,
  disableSelection: false,
};

const fonts = {
  digital: '"DSEG7", monospace',
  mono: '"Roboto Mono", monospace',
  space: '"Space Grotesk", sans-serif',
  rounded: '"Nunito", sans-serif',
  futuristic: '"Orbitron", sans-serif',
  system: "system-ui, sans-serif",
  serif: "Georgia, serif",
  terminal: '"Roboto Mono", monospace',
};

const presets = {
  digital: { color: "#66b8f0", weight: "700", italic: true },
  mono: { color: "#80d8ff", weight: "400", italic: false },
  space: { color: "#c7b5ff", weight: "500", italic: false },
  rounded: { color: "#8de0c0", weight: "800", italic: false },
  futuristic: { color: "#00f0ff", weight: "700", italic: false },
  system: { color: "#ffffff", weight: "400", italic: false },
  serif: { color: "#e6d2ad", weight: "400", italic: false },
  terminal: { color: "#39ff70", weight: "400", italic: false },
};

function applySettings() {
  const font = $("fontStyle").value;

  root.style.setProperty("--font", fonts[font]);
  root.style.setProperty("--font-weight", $("fontWeight").value);
  root.style.setProperty("--font-size", `${$("fontSize").value}px`);
  root.style.setProperty("--clock-color", $("clockColor").value);
  root.style.setProperty("--selection-color", $("selectionColor").value);
  root.style.setProperty(
    "--selection-opacity",
    `${$("selectionOpacity").value}%`,
  );
  root.style.setProperty(
    "--italic",
    $("italicClock").checked ? "italic" : "normal",
  );
  root.style.setProperty(
    "--clock-selection",
    $("disableSelection").checked ? "none" : "text",
  );

  dateEl.hidden = !$("showDate").checked;
  updateClock();
}

function updateClock() {
  const now = new Date();
  const selectedZone = $("timeZone").value;

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: $("hour12").checked,
  };

  if ($("showSeconds").checked) {
    options.second = "2-digit";
  }

  // Apply the selected time zone
  if (selectedZone !== "local") {
    options.timeZone = selectedZone;
  }

  timeEl.textContent = new Intl.DateTimeFormat("en-GB", options).format(now);

  const dateOptions = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  if (selectedZone !== "local") {
    dateOptions.timeZone = selectedZone;
  }

  dateEl.textContent = now
    .toLocaleDateString("en-GB", dateOptions)
    .toUpperCase();
}

$("fontStyle").addEventListener("change", () => {
  const preset = presets[$("fontStyle").value];

  $("clockColor").value = preset.color;
  $("fontWeight").value = preset.weight;
  $("italicClock").checked = preset.italic;

  applySettings();
});

[
  "fontWeight",
  "fontSize",
  "clockColor",
  "selectionColor",
  "selectionOpacity",
  "showDate",
  "showSeconds",
  "italicClock",
  "disableSelection",
].forEach((id) => {
  $(id).addEventListener("input", applySettings);
  $(id).addEventListener("change", applySettings);
});

$("resetSettings").addEventListener("click", () => {
  $("fontStyle").value = defaults.font;
  $("fontWeight").value = defaults.weight;
  $("fontSize").value = defaults.size;
  $("clockColor").value = defaults.color;
  $("selectionColor").value = defaults.selection;
  $("selectionOpacity").value = defaults.opacity;
  $("showDate").checked = defaults.date;
  $("showSeconds").checked = defaults.seconds;
  $("hour12").checked = defaults.hour12;
  $("italicClock").checked = defaults.italic;
  $("disableSelection").checked = defaults.disableSelection;

  applySettings();
});

document.addEventListener("DOMContentLoaded", () => {
  const settings = document.querySelector(".settings");

  if (!settings) {
    console.warn("Settings element not found.");
    return;
  }

  function updateSettingsVisibility() {
    const isFullscreen = Boolean(document.fullscreenElement);

    settings.classList.toggle("fullscreen-hidden", isFullscreen);

    console.log("Fullscreen:", isFullscreen);
  }

  document.addEventListener("fullscreenchange", updateSettingsVisibility);

  // Handle browser-specific events where needed
  document.addEventListener("webkitfullscreenchange", updateSettingsVisibility);

  updateSettingsVisibility();
});

applySettings();
setInterval(updateClock, 250);

document.querySelector("#fullscreenBtn").addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.error("Fullscreen failed:", error);
  }
});

const dateFonts = {
  minimal: '"Space Grotesk", sans-serif',
  technical: '"Roboto Mono", monospace',
  futuristic: '"Orbitron", sans-serif',
  classic: "Georgia, serif",
};

const dateRoot = document.documentElement;

function updateDateStyle() {
  dateRoot.style.setProperty(
    "--date-font",
    dateFonts[document.querySelector("#dateStyle").value],
  );

  dateRoot.style.setProperty(
    "--date-size",
    `${document.querySelector("#dateSize").value}px`,
  );

  dateRoot.style.setProperty(
    "--date-color",
    document.querySelector("#dateColor").value,
  );

  dateRoot.style.setProperty(
    "--date-weight",
    document.querySelector("#dateWeight").value,
  );

  dateRoot.style.setProperty(
    "--date-spacing",
    `${document.querySelector("#dateSpacing").value}px`,
  );
}

["dateStyle", "dateSize", "dateColor", "dateWeight", "dateSpacing"].forEach(
  (id) => {
    document.querySelector(`#${id}`).addEventListener("input", updateDateStyle);

    document
      .querySelector(`#${id}`)
      .addEventListener("change", updateDateStyle);
  },
);

updateDateStyle();

document.addEventListener("keydown", async (event) => {
  // Ignore shortcuts while typing in form controls
  if (
    event.target.matches("input, select, textarea") ||
    event.target.isContentEditable
  ) {
    return;
  }

  // Press F to toggle fullscreen
  if (
    event.key.toLowerCase() === "f" &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.metaKey
  ) {
    event.preventDefault();

    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen failed:", error);
    }
  }
});
