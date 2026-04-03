import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();

    const [
      { count: totalViews },
      { count: totalMessages },
      { data: viewsDaily },
      { data: byPage },
      { data: byCountry },
      { data: recentMessages },
    ] = await Promise.all([
      supabase.from("page_views").select("*", { count: "exact", head: true }),
      supabase
        .from("contact_messages")
        .select("*", { count: "exact", head: true }),
      supabase
        .from("page_views")
        .select("created_at")
        .gte("created_at", thirtyDaysAgo)
        .order("created_at"),
      supabase
        .from("page_views")
        .select("page")
        .gte("created_at", thirtyDaysAgo),
      supabase
        .from("page_views")
        .select("country_code, country_name")
        .not("country_code", "is", null),
      supabase
        .from("contact_messages")
        .select("created_at, from_name, subject")
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

    // Vues par jour
    const dayMap = {};
    (viewsDaily || []).forEach((r) => {
      const d = r.created_at.slice(0, 10);
      dayMap[d] = (dayMap[d] || 0) + 1;
    });

    // Vues par page
    const pageCount = {};
    (byPage || []).forEach((r) => {
      pageCount[r.page] = (pageCount[r.page] || 0) + 1;
    });

    // Vues par pays
    const countryMap = {};
    (byCountry || []).forEach((r) => {
      if (!r.country_code) return;
      if (!countryMap[r.country_code]) {
        countryMap[r.country_code] = {
          code: r.country_code,
          name: r.country_name,
          count: 0,
        };
      }
      countryMap[r.country_code].count++;
    });

    setStats({
      totalViews: totalViews || 0,
      totalMessages: totalMessages || 0,
      viewsChart: Object.entries(dayMap).slice(-14),
      byPage: Object.entries(pageCount).sort((a, b) => b[1] - a[1]),
      byCountry: Object.values(countryMap).sort((a, b) => b.count - a.count),
      recentMessages: recentMessages || [],
    });
    setLoading(false);
  };

  return { stats, loading, refetch: fetchStats };
}

// ── Géolocalisation IP (ipapi.co — 1000 req/jour gratuit) ─
async function getCountryFromIP() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return {
      country_code: data.country_code || "XX",
      country_name: data.country_name || "Unknown",
    };
  } catch {
    return { country_code: "XX", country_name: "Unknown" };
  }
}

// ── Tracker visite ────────────────────────────────────────
export async function trackPageView(page = "home") {
  const { country_code, country_name } = await getCountryFromIP();
  await supabase.from("page_views").insert({
    page,
    country_code,
    country_name,
    user_agent: navigator.userAgent.slice(0, 200),
    referrer: document.referrer.slice(0, 200) || null,
  });
}

// ── Tracker message ───────────────────────────────────────
export async function trackMessage(from_name, subject) {
  await supabase.from("contact_messages").insert({ from_name, subject });
}
