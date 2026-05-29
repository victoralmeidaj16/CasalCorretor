"use client";

import { BrokerConfig, DEFAULT_BROKER_CONFIG } from "@/data/broker-presets";

export const BROKER_CONFIG_STORAGE_KEY = "broker_config";

const MURILO_PROFILE_PHOTO_PATH = "/broker-photos/Murilo_perfil.JPEG";

function imagePathToDataUrl(path: string): Promise<string> {
  return fetch(path)
    .then((response) => {
      if (!response.ok) throw new Error("Default broker photo unavailable");
      return response.blob();
    })
    .then(
      (blob) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
}

export async function getInitialBrokerConfig(): Promise<BrokerConfig> {
  const stored = localStorage.getItem(BROKER_CONFIG_STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored) as BrokerConfig;
    if ((parsed.photos ?? []).length > 0) return parsed;

    const muriloPhoto = await imagePathToDataUrl(MURILO_PROFILE_PHOTO_PATH);
    return {
      ...parsed,
      photos: [muriloPhoto],
      photoUsageInstructions:
        parsed.photoUsageInstructions ||
        "Use Murilo como o corretor de referência nas imagens. Preserve rosto, cabelo, tom de pele e aparência geral da foto anexada.",
    };
  }

  try {
    const muriloPhoto = await imagePathToDataUrl(MURILO_PROFILE_PHOTO_PATH);
    return {
      ...DEFAULT_BROKER_CONFIG,
      photos: [muriloPhoto],
      photoUsageInstructions:
        "Use Murilo como o corretor de referência nas imagens. Preserve rosto, cabelo, tom de pele e aparência geral da foto anexada.",
    };
  } catch {
    return DEFAULT_BROKER_CONFIG;
  }
}
