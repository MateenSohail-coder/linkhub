"use client";
import { useEffect, useRef, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";

export default function NetworkStatus() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState("info");
  const hideTimerRef = useRef(null);

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  useEffect(() => {
    // ensure we’re on the client
    setHasMounted(true);
    setIsOnline(typeof navigator !== "undefined" ? navigator.onLine : true);

    const handleOnline = () => {
      clearHideTimer();
      setIsOnline(true);
      setMessageType("online");
      setShowMessage(true);

      hideTimerRef.current = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    };

    const handleOffline = () => {
      clearHideTimer();
      setIsOnline(false);
      setMessageType("offline");
      setShowMessage(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearHideTimer();
    };
  }, []);

  // Wait until after mount to avoid SSR mismatch
  if (!hasMounted) return null;

  const isOnlineMessage = messageType === "online";
  const isOfflineMessage = messageType === "offline";

  return (
    <div
      aria-live="polite"
      style={{
        position: "fixed",
        left: 12,
        right: 12,
        bottom: 12,
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        role="status"
        style={{
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          gap: 10,
          minWidth: 280,
          maxWidth: "min(720px, 90%)",
          padding: "10px 14px",
          borderRadius: 10,
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          fontWeight: 600,
          transform: showMessage ? "translateY(0)" : "translateY(20px)",
          opacity: showMessage ? 1 : 0,
          transition:
            "transform 360ms cubic-bezier(.2,.9,.2,1), opacity 300ms ease",
          backgroundColor: isOnlineMessage
            ? "#d4edda"
            : isOfflineMessage
            ? "#f8d7da"
            : "#eef2ff",
          color: isOnlineMessage
            ? "#155724"
            : isOfflineMessage
            ? "#721c24"
            : "#0f172a",
          border: `1px solid ${
            isOnlineMessage
              ? "#c3e6cb"
              : isOfflineMessage
              ? "#f5c6cb"
              : "#e0e7ff"
          }`,
        }}
      >
        {isOnlineMessage ? (
          <>
            <Wifi size={18} />
            <span>You are back online</span>
          </>
        ) : isOfflineMessage ? (
          <>
            <WifiOff size={18} />
            <span>You are offline. Some features may not work.</span>
          </>
        ) : null}
      </div>
    </div>
  );
}
