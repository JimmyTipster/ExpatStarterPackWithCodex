type CapacitorLike = {
  isNativePlatform?: () => boolean;
  getPlatform?: () => string;
};

declare global {
  interface Window {
    Capacitor?: CapacitorLike;
  }
}

export function isNativePlatform() {
  if (typeof window === "undefined") {
    return false;
  }

  const capacitor = window.Capacitor;

  if (typeof capacitor?.isNativePlatform === "function") {
    return capacitor.isNativePlatform();
  }

  if (typeof capacitor?.getPlatform === "function") {
    return capacitor.getPlatform() !== "web";
  }

  return false;
}
