import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAdSchema, type InsertAd } from "@shared/routes";
import { useAds, useCreateAd } from "@/hooks/use-ads";
import { motion } from "framer-motion";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, MapPin, Phone, School, Send, Loader2, Search, ImageIcon, AlertTriangle } from "lucide-react";
import { AdCard } from "@/components/AdCard";
import { GoogleAdPlaceholder } from "@/components/GoogleAdPlaceholder";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Home() {
  const { data: ads, isLoading: isLoadingAds } = useAds();
  const createAd = useCreateAd();
  const [searchTerm, setSearchTerm] = useState("");

  const form = useForm<InsertAd>({
    resolver: zodResolver(insertAdSchema),
    defaultValues: {
      itemName: "",
      category: "বই",
      type: "বিনিময়",
      location: "",
      phone: "",
      image: "",
      isPremium: false,
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: InsertAd) => {
    createAd.mutate(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  };

  const filteredAds = ads?.filter(ad => 
    ad.itemName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ad.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-12 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Alert className="bg-amber-50 border-amber-200 text-amber-800 mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-xs sm:text-sm font-medium">
            সতর্কবার্তা: ছবি দেখে নিশ্চিত হয়ে তবেই লেনদেন করুন। অগ্রিম টাকা দেবেন না।
          </AlertDescription>
        </Alert>
      </div>

      <div className="bg-primary text-primary-foreground pt-12 pb-24 px-4 rounded-b-[2.5rem] shadow-xl shadow-primary/20 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-4 backdrop-blur-sm">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">অদল-বদল</h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 font-medium max-w-lg mx-auto">
              বই বিনিময় করে অন্যের উপকার করুন
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card border-0 shadow-2xl shadow-black/5 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-border/40 pb-6">
                <CardTitle className="text-xl text-primary">নতুন বিজ্ঞাপন</CardTitle>
                <CardDescription>আপনার পণ্যের তথ্য দিয়ে ফর্মটি পূরণ করুন</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="itemName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-foreground/80">
                            জিনিসের নাম
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="জিনিসের নাম লিখুন..." className="bg-white/50 focus:bg-white transition-all h-11" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-foreground/80">
                              ক্যাটাগরি
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-white/50 focus:bg-white h-11">
                                  <SelectValue placeholder="নির্বাচন করুন" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="বই">বই</SelectItem>
                                <SelectItem value="ইলেকট্রনিক্স">ইলেকট্রনিক্স</SelectItem>
                                <SelectItem value="গিটার">গিটার</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-foreground/80">
                              ধরণ
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-white/50 focus:bg-white h-11">
                                  <SelectValue placeholder="নির্বাচন করুন" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="বিনিময়">বিনিময়</SelectItem>
                                <SelectItem value="বিক্রি">বিক্রি</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-foreground/80">
                        <ImageIcon className="w-4 h-4 text-primary" /> ছবি আপলোড করুন
                      </FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" onChange={handleImageUpload} className="bg-white/50 focus:bg-white h-11 py-2" />
                      </FormControl>
                      {form.watch("image") && (
                        <div className="mt-2 relative w-24 h-24 rounded-lg overflow-hidden border">
                          <img src={form.watch("image") as string} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </FormItem>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-foreground/80">
                              <MapPin className="w-4 h-4 text-primary" /> এলাকা
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="মিরপুর, ঢাকা" className="bg-white/50 focus:bg-white h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-foreground/80">
                              <Phone className="w-4 h-4 text-primary" /> মোবাইল
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="017..." className="bg-white/50 focus:bg-white h-11" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
                      disabled={createAd.isPending}
                    >
                      {createAd.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> পোস্ট হচ্ছে...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" /> বিজ্ঞাপন পোস্ট করুন
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <div className="mt-6">
              <GoogleAdPlaceholder variant="square" />
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-7 order-2 lg:order-1 space-y-6">
          <div className="mb-6">
             <GoogleAdPlaceholder variant="banner" />
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">সাম্প্রতিক বিজ্ঞাপন</h2>
            <div className="relative w-full max-w-xs hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="খুঁজুন..." 
                className="pl-9 bg-white border-none shadow-sm h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="relative w-full sm:hidden mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="খুঁজুন..." 
              className="pl-9 bg-white border-none shadow-sm h-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoadingAds ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-40 rounded-2xl bg-muted/50 animate-pulse border border-border/50" />
              ))
            ) : filteredAds && filteredAds.length > 0 ? (
              filteredAds
                .sort((a, b) => (Number(b.isPremium) - Number(a.isPremium)) || b.id - a.id)
                .map((ad, i) => (
                  <AdCard key={ad.id} ad={ad} index={i} />
                ))
            ) : (
              <div className="col-span-full py-12 text-center text-muted-foreground bg-white rounded-2xl border border-dashed">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>কোনো বিজ্ঞাপন পাওয়া যায়নি</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
