import { motion } from "framer-motion";
import { MapPin, Phone, BookOpen, Crown } from "lucide-react";
import { type Ad } from "@shared/routes";
import { Badge } from "@/components/ui/badge";

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
        relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
        ${ad.isPremium 
          ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-amber-100" 
          : "bg-white border-border shadow-sm"
        }
      `}
    >
      {ad.isPremium && (
        <div className="absolute top-0 right-0 p-2">
          <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200 gap-1">
            <Crown className="w-3 h-3 fill-current" />
            Premium
          </Badge>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div>
          <Badge variant="outline" className="mb-2 text-xs font-medium text-muted-foreground bg-muted/50 border-muted">
            {ad.cls}
          </Badge>
          <h3 className="text-lg font-bold text-foreground leading-tight tracking-tight">
            {ad.name}
          </h3>
        </div>
        <div className="p-2 bg-primary/5 rounded-full text-primary">
          <BookOpen className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-2 mt-auto">
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <MapPin className="w-4 h-4 text-primary/60" />
          <span className="truncate">{ad.location}</span>
        </div>
        
        <div className="flex items-center text-sm font-medium text-foreground gap-2 pt-2 border-t border-border/50">
          <Phone className="w-4 h-4 text-green-500" />
          <span>{ad.phone}</span>
        </div>
      </div>
    </motion.div>
  );
}
