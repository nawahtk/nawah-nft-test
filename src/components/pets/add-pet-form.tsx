import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Edit, Trash2, Calendar, Palette } from "lucide-react";

interface Pet {
  id: string;
  name: string;
  type: string;
  breed?: string;
  age?: number;
  gender?: string;
  color?: string;
  description?: string;
  image_url?: string;
  created_at: string;
}

interface PetsListProps {
  pets: Pet[];
  onEdit?: (petId: string) => void;
  onDelete?: (petId: string) => void;
}

export function PetsList({ pets, onEdit, onDelete }: PetsListProps) {
  const getPetTypeEmoji = (type: string) => {
    const emojiMap: { [key: string]: string } = {
      cat: "🐱",
      dog: "🐶",
      bird: "🐦",
      fish: "🐠",
      rabbit: "🐰",
      hamster: "🐹",
      other: "🐾"
    };
    return emojiMap[type] || "🐾";
  };

  const getPetTypeArabic = (type: string) => {
    const typeMap: { [key: string]: string } = {
      cat: "قطة",
      dog: "كلب",
      bird: "طائر",
      fish: "سمك",
      rabbit: "أرنب",
      hamster: "هامستر",
      other: "أخرى"
    };
    return typeMap[type] || type;
  };

  const getGenderArabic = (gender?: string) => {
    if (!gender) return "";
    return gender === "male" ? "ذكر" : "أنثى";
  };

  if (pets.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">لا توجد حيوانات أليفة</h3>
          <p className="text-muted-foreground">ابدأ بإضافة حيوانك الأليف الأول!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map((pet) => (
        <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          {pet.image_url && (
            <div className="h-48 overflow-hidden">
              <img
                src={pet.image_url}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getPetTypeEmoji(pet.type)}</span>
                <span>{pet.name}</span>
              </div>
              <div className="flex gap-1">
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(pet.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(pet.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                {getPetTypeArabic(pet.type)}
              </Badge>
              {pet.breed && (
                <Badge variant="outline">
                  {pet.breed}
                </Badge>
              )}
              {pet.gender && (
                <Badge variant="outline">
                  {getGenderArabic(pet.gender)}
                </Badge>
              )}
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              {pet.age && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{pet.age} سنة</span>
                </div>
              )}
              
              {pet.color && (
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span>{pet.color}</span>
                </div>
              )}
            </div>

            {pet.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {pet.description}
              </p>
            )}

            <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2 border-t">
              <Calendar className="h-3 w-3" />
              <span>تم الإضافة: {new Date(pet.created_at).toLocaleDateString("ar-SA")}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
