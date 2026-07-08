"use client";

import { useEffect } from "react";

/**
 * Discourages casual right-clicking, view-source, and dev-tools shortcuts.
 *
 * Important: this is a DETERRENT, not real security. Anyone who knows how
 * to open dev tools through the browser menu, or who disables JavaScript,
 * can bypass all of this in a few seconds — the HTML/CSS/JS your site sends
 * is always readable by the browser that renders it, and there's no way
 * around that on the web. This component just removes the easiest, most
 * casual ways for a visitor to right-click → "View Page Source" or hit
 * F12, which is enough to stop most non-technical snooping.
 */
export default function SecurityGuard() {
  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => e.preventDefault();

    const blockKeys = (e: KeyboardEvent) => {
      if (!e.key) return;
      const key = e.key.toUpperCase();
      const isDevToolsShortcut =
        key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(key)) || // dev tools / console / inspector
        (e.ctrlKey && ["U", "S"].includes(key)) || // view source / save page
        (e.metaKey && e.altKey && ["I", "J", "C"].includes(key)); // macOS Cmd+Opt equivalents

      if (isDevToolsShortcut) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("keydown", blockKeys);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);

  return null;
}