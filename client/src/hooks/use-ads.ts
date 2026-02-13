import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertAd, type Ad } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useAds() {
  return useQuery({
    queryKey: [api.ads.list.path],
    queryFn: async () => {
      const res = await fetch(api.ads.list.path);
      if (!res.ok) throw new Error("Failed to fetch ads");
      return api.ads.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateAd() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertAd) => {
      const res = await fetch(api.ads.create.path, {
        method: api.ads.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.ads.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create ad");
      }
      return api.ads.create.responses[201].parse(await res.json());
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.ads.list.path] });
      
      const message = data.isPremium 
        ? "বিজ্ঞাপনটি সফলভাবে জমা হয়েছে! প্রিমিয়াম হলে বিকাশে ৫ টাকা পাঠান আমাদের নম্বরে।" 
        : "বিজ্ঞাপনটি সফলভাবে জমা হয়েছে!";

      toast({
        title: "সফল!",
        description: message,
        variant: "default",
        className: "bg-green-600 text-white border-none",
      });
    },
    onError: (error) => {
      toast({
        title: "ত্রুটি",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}
