import { motion } from "framer-motion";
import { MapPin, Phone, BookOpen, Crown, MessageSquare } from "lucide-react";
import { type Ad } from "@shared/routes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AdCardProps {
  ad: Ad;
  index: number;
}

export function AdCard({ ad, index }: AdCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={`
        relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col
        ${ad.isPremium 
          ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-amber-100" 
          : "bg-white border-border shadow-sm"
        }
      `}
    >
      {ad.isPremium && (
        <div className="absolute top-0 right-0 p-2 z-10">
          <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200 gap-1">
            <Crown className="w-3 h-3 fill-current" />
            Premium
          </Badge>
        </div>
      )}

      {ad.image && (
        <div className="w-full h-40 overflow-hidden bg-muted">
          <img 
            src={ad.image} 
            alt={ad.itemName} 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex gap-2 mb-2">
              <Badge variant="outline" className="text-[10px] font-medium text-muted-foreground bg-muted/50 border-muted">
                {ad.category}
              </Badge>
              <Badge variant="outline" className="text-[10px] font-medium text-primary bg-primary/5 border-primary/20">
                {ad.type}
              </Badge>
            </div>
            <h3 className="text-lg font-bold text-foreground leading-tight tracking-tight">
              {ad.itemName}
            </h3>
          </div>
        </div>

        <div className="space-y-2 mt-auto">
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <MapPin className="w-4 h-4 text-primary/60" />
            <span className="truncate">{ad.location}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border/50">
            <Button 
              size="sm" 
              variant="default" 
              className="bg-green-600 hover:bg-green-700 text-white gap-2 h-9"
              asChild
            >
              <a href={`tel:${ad.phone}`}>
                <Phone className="w-4 h-4" /> কল করুন
              </a>
            </Button>
            <Button 
              size="sm" 
              variant="secondary" 
              className="gap-2 h-9"
              asChild
            >
              <a href={`sms:${ad.phone}`}>
                <MessageSquare className="w-4 h-4" /> মেসেজ
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
