import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";

import { MapPin, Navigation, Building2, UtensilsCrossed, Hotel, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Place {
  id: string;
  name: string;
  category: "campus" | "food" | "hotel" | "hospital" | "transport" | "other";
  lat: number;
  lng: number;
  description: string;
}

// NIILM University, Kaithal, Haryana - approximate center: 29.861313465404002, 76.46097945732087
const CAMPUS_CENTER: [number, number] = [29.861313465404002, 76.46097945732087];

const SAMPLE_PLACES: Place[] = [
  // Campus buildings
  { id: "1", name: "NIILM Main Building", category: "campus", lat: 29.861313465404002, lng: 76.46097945732087, description: "Main academic and administrative block" },
  { id: "2", name: "NIILM Library", category: "campus", lat: 29.861813465404002, lng: 76.46147945732087 , description: "Central library with digital resources & study halls" },
  { id: "3", name: "Computer Science Block", category: "campus", lat: 29.8612, lng: 76.4608, description: "Department of Computer Science & Engineering" },
  { id: "4", name: "Management Block", category: "campus", lat: 29.8618, lng: 76.4610, description: "School of Management & Commerce" },
  { id: "5", name: "Boys Hostel", category: "campus", lat: 29.8608, lng: 76.4615, description: "On-campus boys hostel accommodation" },
  { id: "6", name: "Girls Hostel", category: "campus", lat: 29.8622, lng: 76.4618, description: "On-campus girls hostel accommodation" },
  { id: "7", name: "Sports Ground", category: "campus", lat: 29.8605, lng: 76.4605, description: "Cricket ground, basketball court & indoor sports" },
  { id: "8", name: "Auditorium", category: "campus", lat: 29.8617, lng: 76.4612, description: "Main auditorium for events and seminars" },

  // Food & canteens
  { id: "9", name: "Campus Canteen", category: "food", lat: 29.8013, lng: 76.3968, description: "Affordable meals and snacks for students" },
  { id: "10", name: "Tea Point", category: "food", lat: 29.8010, lng: 76.3962, description: "Quick chai and maggi spot near hostel" },
  { id: "11", name: "Sharma Dhaba", category: "food", lat: 29.8035, lng: 76.3990, description: "Popular local dhaba near campus gate" },
  { id: "12", name: "Pizza Hub Kaithal", category: "food", lat: 29.7985, lng: 76.3925, description: "Pizza and fast food restaurant in Kaithal city" },

  // Hotels & stays
  { id: "13", name: "Hotel Grand Kaithal", category: "hotel", lat: 29.7990, lng: 76.3940, description: "Budget hotel for visitors and parents" },
  { id: "14", name: "Hotel Raj Palace", category: "hotel", lat: 29.7975, lng: 76.3920, description: "Mid-range hotel with AC rooms in city center" },
  { id: "15", name: "NIILM Guest House", category: "hotel", lat: 29.8025, lng: 76.3980, description: "University guest house for official visitors" },

  // Hospitals
  { id: "16", name: "Civil Hospital Kaithal", category: "hospital", lat: 29.7960, lng: 76.3910, description: "Government hospital with emergency services" },
  { id: "17", name: "Campus Medical Room", category: "hospital", lat: 29.8016, lng: 76.3963, description: "First-aid and basic medical facility on campus" },

  // Transport
  { id: "18", name: "Kaithal Bus Stand", category: "transport", lat: 29.7950, lng: 76.3895, description: "Main bus stand - buses to Kurukshetra, Karnal, Delhi" },
  { id: "19", name: "Kaithal Railway Station", category: "transport", lat: 29.7940, lng: 76.3880, description: "Nearest railway station - connections to Delhi & beyond" },
];

const categoryIcons: Record<string, React.ReactNode> = {
  campus: <GraduationCap className="w-4 h-4" />,
  food: <UtensilsCrossed className="w-4 h-4" />,
  hotel: <Hotel className="w-4 h-4" />,
  hospital: <Building2 className="w-4 h-4" />,
  transport: <Navigation className="w-4 h-4" />,
  other: <MapPin className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
  campus: "bg-primary text-primary-foreground",
  food: "bg-accent text-accent-foreground",
  hotel: "bg-secondary text-secondary-foreground",
  hospital: "bg-destructive text-destructive-foreground",
  transport: "bg-muted text-muted-foreground",
  other: "bg-muted text-muted-foreground",
};

const CampusMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [mapLoaded, setMapLoaded] = useState(false);
  const leafletMap = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const filteredPlaces = selectedCategory === "all" ? SAMPLE_PLACES : SAMPLE_PLACES.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    const loadMap = async () => {
      const L = await import("leaflet");

      // Fix default icon issue
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, { zoomControl: true }).setView(CAMPUS_CENTER, 16);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      leafletMap.current = map;
      setMapLoaded(true);
    };

    loadMap();

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!leafletMap.current || !mapLoaded) return;

    const loadMarkers = async () => {
      const L = await import("leaflet");
      // Clear old markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      filteredPlaces.forEach((place) => {
        const marker = L.marker([place.lat, place.lng])
          .bindPopup(`<strong>${place.name}</strong><br/><em>${place.category}</em><br/>${place.description}`)
          .addTo(leafletMap.current!);
        markersRef.current.push(marker);
      });
    };

    loadMarkers();
  }, [filteredPlaces, mapLoaded]);

  const handleLocateMe = () => {
    if (!navigator.geolocation || !leafletMap.current) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const L = await import("leaflet");
      const { latitude, longitude } = pos.coords;
      leafletMap.current.setView([latitude, longitude], 16);
      L.marker([latitude, longitude])
        .bindPopup("<strong>You are here</strong>")
        .addTo(leafletMap.current)
        .openPopup();
    });
  };

  const categories = ["all", "campus", "food", "hotel", "hospital", "transport"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-6">
          <h1 className="font-dm-serif text-3xl text-foreground mb-2">Campus Map — NIILM University</h1>
          <p className="text-muted-foreground">Find buildings, restaurants, hotels & more around campus</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="capitalize"
            >
              {cat !== "all" && categoryIcons[cat]}
              <span className="ml-1">{cat}</span>
            </Button>
          ))}
          <Button variant="default" size="sm" onClick={handleLocateMe}>
            <Navigation className="w-4 h-4 mr-1" /> My Location
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div
              ref={mapRef}
              className="w-full h-[500px] rounded-xl border border-border overflow-hidden shadow-md"
            />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredPlaces.map((place) => (
              <Card key={place.id} className="cursor-pointer hover:shadow-md transition-shadow border-border/60" onClick={() => {
                if (leafletMap.current) {
                  leafletMap.current.setView([place.lat, place.lng], 18);
                  markersRef.current.find(m => {
                    const ll = m.getLatLng();
                    return ll.lat === place.lat && ll.lng === place.lng;
                  })?.openPopup();
                }
              }}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${categoryColors[place.category]}`}>
                      {categoryIcons[place.category]}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-sm">{place.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{place.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusMap;
