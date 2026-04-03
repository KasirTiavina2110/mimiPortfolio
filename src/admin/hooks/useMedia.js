import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

const BUCKET = "portfolio-media";

/**
 * useMedia(folder, localItems)
 *
 * localItems = tableau d'objets { src, name?, label?, quote?, medium?, desc? }
 *   OU tableau de strings (URLs locales pures)
 *
 * Comportement :
 * - Fetche les fichiers Supabase du dossier
 * - FUSIONNE avec les assets locaux (les locaux restent toujours)
 * - Si un fichier Supabase a le même nom qu'un asset local → erreur signalée
 * - Les fichiers Supabase sont ajoutés APRÈS les locaux
 *
 * Retourne { items, loading, errors, refetch }
 * items = tableau d'objets { src, name, isRemote }
 */
export function useMedia(folder, localItems = []) {
  const [items, setItems] = useState(normalizeLocal(localItems));
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]); // noms en conflit

  const fetchAndMerge = useCallback(async () => {
    setLoading(true);
    setErrors([]);

    try {
      const { data, error } = await supabase.storage.from(BUCKET).list(folder, {
        limit: 200,
        sortBy: { column: "created_at", order: "asc" },
      });

      if (error || !data) {
        setItems(normalizeLocal(localItems));
        setLoading(false);
        return;
      }

      const remoteFiles = data.filter(
        (f) => f.name !== ".emptyFolderPlaceholder",
      );

      if (remoteFiles.length === 0) {
        setItems(normalizeLocal(localItems));
        setLoading(false);
        return;
      }

      // Noms des assets locaux normalisés
      const normalizedLocal = normalizeLocal(localItems);
      const localNames = normalizedLocal.map(
        (item) => item._filename || extractFilename(item.src),
      );

      // Détecter les conflits
      const conflicts = [];
      const newRemote = [];

      for (const f of remoteFiles) {
        const cleanName = f.name.toLowerCase();
        const isConflict = localNames.some(
          (ln) => ln.toLowerCase() === cleanName,
        );
        if (isConflict) {
          conflicts.push(f.name);
        } else {
          const publicUrl = supabase.storage
            .from(BUCKET)
            .getPublicUrl(`${folder}/${f.name}`).data.publicUrl;
          newRemote.push({
            src: publicUrl,
            name: cleanFilename(f.name),
            isRemote: true,
          });
        }
      }

      if (conflicts.length > 0) setErrors(conflicts);

      // Fusion : locaux d'abord, puis fichiers Supabase sans conflit
      const merged = [...normalizeLocal(localItems), ...newRemote];
      setItems(merged);
    } catch {
      setItems(normalizeLocal(localItems));
    }

    setLoading(false);
  }, [folder]);

  useEffect(() => {
    fetchAndMerge();
  }, [fetchAndMerge]);

  return { items, loading, errors, refetch: fetchAndMerge };
}

/**
 * useMediaSingle(folder, localFallback)
 * Retourne l'URL du fichier le plus récent dans un dossier.
 * Si vide → retourne localFallback.
 */
export function useMediaSingle(folder, localFallback) {
  const [url, setUrl] = useState(localFallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFirst() {
      setLoading(true);
      try {
        const { data, error } = await supabase.storage
          .from(BUCKET)
          .list(folder, {
            limit: 5,
            sortBy: { column: "created_at", order: "desc" },
          });

        if (!error && data) {
          const files = data.filter(
            (f) => f.name !== ".emptyFolderPlaceholder",
          );
          if (files.length > 0) {
            const { data: urlData } = supabase.storage
              .from(BUCKET)
              .getPublicUrl(`${folder}/${files[0].name}`);
            setUrl(urlData.publicUrl);
          }
        }
      } catch {
        /* garder fallback */
      }
      setLoading(false);
    }
    fetchFirst();
  }, [folder]);

  return { url, loading };
}

// ── Helpers ───────────────────────────────────────────────

function normalizeLocal(items) {
  return items.map((item) => {
    if (typeof item === "string") {
      return {
        src: item,
        name: cleanFilename(extractFilename(item)),
        _filename: extractFilename(item),
        isRemote: false,
      };
    }
    // Si src ressemble à un nom de fichier pur (pas de chemin webpack)
    const filename =
      item.name && item.name.includes(".")
        ? item.name
        : extractFilename(item.src);
    return { ...item, _filename: filename, isRemote: false };
  });
}

function extractFilename(path) {
  if (!path) return "";
  // Si c'est juste un nom de fichier sans chemin, le retourner directement
  if (!path.includes("/") && !path.includes("\\")) return path;
  return path.split("/").pop()?.split("?")[0] || "";
}

function cleanFilename(filename) {
  return filename
    .replace(/\.[^.]+$/, "") // enlever extension
    .replace(/[_-]/g, " ") // remplacer _ et - par espace
    .replace(/\b\w/g, (c) => c.toUpperCase()) // capitaliser
    .trim();
}
