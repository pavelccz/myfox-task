import { useEffect, useState } from "react";
import { photoRestUrl } from "../config";

/**
 * Resolves real image URL from MyFox photo API.
 */
export const usePhotoUrl = (secret?: string | null) => {
  const [url, setUrl] = useState<string | undefined>();

  useEffect(() => {
    if (!secret) {
      setUrl(undefined);
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        const res = await fetch(photoRestUrl(secret));
        if (!res.ok) return;

        const text = await res.text();
        if (!cancelled) {
          setUrl(text.trim());
        }
      } catch {
        if (!cancelled) {
          setUrl(undefined);
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [secret]);

  return url;
};
