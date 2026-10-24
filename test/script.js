(() => {
  const clockTime = document.getElementById("clock-time");
  const clockDate = document.getElementById("clock-date");
  const clockDisplay = document.getElementById("clock-display");

  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let previousTime = "";
  let previousDate = "";

  function updateClock() {
    const now = new Date();

    const time = timeFormatter.format(now);
    const date = dateFormatter.format(now);

    if (time !== previousTime) {
      clockTime.textContent = time;
      clockDisplay.setAttribute("aria-label", `Current time ${time}`);
      previousTime = time;
    }

    if (date !== previousDate) {
      clockDate.textContent = date;

      clockDate.dateTime = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
      ].join("-");

      previousDate = date;
    }
  }

  function scheduleNextUpdate() {
    updateClock();

    // Synchronize updates with the next whole second.
    const delay = 1000 - (Date.now() % 1000);

    window.setTimeout(scheduleNextUpdate, delay);
  }

  scheduleNextUpdate();
})();


const root = document.documentElement;

const fonts = {
  dseg: '"DSEG7", monospace',
  mono: '"Courier New", monospace',
  system: "Arial, Helvetica, sans-serif",
  orbitron: '"Orbitron", sans-serif',
};

document.querySelector("#clockFont").addEventListener("change", (event) => {
  root.style.setProperty("--clock-font", fonts[event.target.value]);
});

document.querySelector("#clockSize").addEventListener("input", (event) => {
  root.style.setProperty("--clock-size", `${event.target.value}px`);
});

document.querySelector("#clockColor").addEventListener("input", (event) => {
  root.style.setProperty("--clock-blue", event.target.value);
});
