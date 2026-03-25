export function saveCalculation(key: string, data: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  try {
    const calculations = getCalculations();
    calculations[key] = {
      ...data,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem("moneysynth_calculations", JSON.stringify(calculations));
  } catch (error) {
    console.error("Error saving calculation:", error);
  }
}

export function getCalculation(key: string): Record<string, unknown> | null {
  if (typeof window === "undefined") return null;
  try {
    const calculations = getCalculations();
    return calculations[key] || null;
  } catch (error) {
    console.error("Error getting calculation:", error);
    return null;
  }
}

export function getAllCalculations(): Record<string, Record<string, unknown>> {
  if (typeof window === "undefined") return {};
  return getCalculations();
}

export function deleteCalculation(key: string): void {
  if (typeof window === "undefined") return;
  try {
    const calculations = getCalculations();
    delete calculations[key];
    localStorage.setItem("moneysynth_calculations", JSON.stringify(calculations));
  } catch (error) {
    console.error("Error deleting calculation:", error);
  }
}

export function clearAllCalculations(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("moneysynth_calculations");
  } catch (error) {
    console.error("Error clearing calculations:", error);
  }
}

function getCalculations(): Record<string, Record<string, unknown>> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem("moneysynth_calculations");
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Error parsing calculations:", error);
    return {};
  }
}

export function shareCalculation(
  title: string,
  data: Record<string, unknown>,
  platform: "whatsapp" | "twitter" | "facebook" | "copy"
): void {
  if (typeof window === "undefined") return;
  const text = `${title}\n\n${JSON.stringify(data, null, 2)}`;
  const encodedText = encodeURIComponent(text);
  const url = typeof window !== "undefined" ? window.location.href : "";

  switch (platform) {
    case "whatsapp":
      window.open(`https://wa.me/?text=${encodedText}`, "_blank");
      break;
    case "twitter":
      window.open(
        `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodeURIComponent(url)}`,
        "_blank"
      );
      break;
    case "facebook":
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank"
      );
      break;
    case "copy":
      navigator.clipboard.writeText(text);
      break;
  }
}

