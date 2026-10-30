import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mergePageCopy, type PageId } from "@/lib/page-copy";

export function usePageCopy(page: PageId) {
  const query = useQuery({
    queryKey: ["page-copy", page],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content").select("content").eq("id", `page_${page}`).maybeSingle();
      if (error) throw error;
      return mergePageCopy(page, data?.content);
    },
    staleTime: 0,
  });
  const copy = query.data ?? mergePageCopy(page, null);
  return {
    ...query,
    copy,
    t: (key: string) => typeof copy[key] === "string" ? copy[key] as string : "",
    list: (key: string) => Array.isArray(copy[key]) ? copy[key] as string[] : [],
  };
}