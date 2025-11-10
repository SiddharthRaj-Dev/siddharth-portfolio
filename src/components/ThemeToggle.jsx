import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.classList.toggle("light", savedTheme === "light");
    setLight(savedTheme === "light");
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    const theme = next ? "light" : "dark";
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", theme);
  };

  return (
    <button onClick={toggle} className="ripple-effect btn btn-unified">
      {light ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
      }
