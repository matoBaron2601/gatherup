// components/InAppBrowserWarning.tsx
"use client";

import { useEffect, useState } from "react";

export default function InAppBrowserWarning() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && isInAppBrowser()) {
      setShowWarning(true);
    }
  }, []);

  function isInAppBrowser() {
    const ua = navigator.userAgent || "";
    return (
      ua.includes("FBAN") || 
      ua.includes("FBAV") || 
      ua.includes("Instagram") ||
      ua.includes("Line") ||
      ua.includes("Messenger") ||
      ua.includes("WhatsApp")
    );
  }


  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md text-center space-y-4">
        <h2 className="text-xl font-bold">Otvor stránku v prehliadači</h2>
        <p>Vyzerá to, že si stránku otvoril v aplikácii (napr. Messenger). Pre plnú funkcionalitu odporúčame otvoriť ju v prehliadači ako Chrome alebo Safari.</p>
        <p className="text-sm text-gray-500">Dlhým podržaním linku nižšie a výberom prehliadača otvoríš appku správne:</p>
        <a
          href={typeof window !== "undefined" ? window.location.href : "#"}
          className="break-all text-blue-600 underline font-mono"
        >
          {typeof window !== "undefined" ? window.location.href : "Odkaz"}
        </a>
      </div>
    </div>
  );
}
