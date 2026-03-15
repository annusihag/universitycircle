import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";


interface Listing {
  id: string;
  title: string;
  description: string;
  type: "sell" | "rent";
  category: string;
  price: number;
  condition: string;
  seller: string;
  duration?: number;
  durationType?: string;
}

const MOCK_LISTINGS: Listing[] = [
  { id: "1", title: "Engineering Mathematics - B.S. Grewal", description: "5th edition, good condition. Highlighted important formulas.", type: "sell", category: "Books", price: 150, condition: "Good", seller: "Rahul S." },
  { id: "2", title: "Data Structures Notes - Complete Semester", description: "Handwritten notes covering all topics. Clean and organized.", type: "sell", category: "Books", price: 0, condition: "Excellent", seller: "Priya M." },
  { id: "3", title: "Physics Lab Manual", description: "Unused lab manual for 1st year physics practical.", type: "sell", category: "Books", price: 80, condition: "Like New", seller: "Amit K." },
  { id: "4", title: "Scientific Calculator", description: "Casio FX-991EX. Used for 1 semester only.", type: "rent", category: "Electronics", price: 50, condition: "Good", seller: "Sneha P.", duration: 1, durationType: "Months" },
  { id: "5", title: "DBMS Complete Notes + PYQs", description: "Typed notes with solved previous year questions.", type: "sell", category: "Stationary", price: 50, condition: "New", seller: "Vikram R." },
  { id: "6", title: "Organic Chemistry - Morrison & Boyd", description: "Classic textbook. Free for anyone who needs it!", type: "sell", category: "Books", price: 0, condition: "Fair", seller: "Neha G." },
];

const Marketplace = () => {
  const [listings, setListings] = useState<Listing[]>(() => {
  const stored = localStorage.getItem("marketplaceListings");
  return stored ? (JSON.parse(stored) as Listing[]) : MOCK_LISTINGS;
});
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"buy" | "rent" | "sell">("buy");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
  localStorage.setItem("marketplaceListings", JSON.stringify(listings));
  }, [listings]);

  const filtered = listings.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
    if (activeTab === "buy") return matchesSearch && item.type === "sell";
    if (activeTab === "rent") return matchesSearch && item.type === "rent";
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-center font-dm-serif my-10 text-5xl md:text-6xl text-foreground">
          Welcome to NIILM Store!
        </h1>

        {/* Tab bar */}
        <div className="flex w-full md:w-4/5 bg-muted mx-auto py-2 rounded-md my-10">
          <button
            onClick={() => setActiveTab("sell")}
            className={`w-1/3 text-center py-2 mx-2 rounded-md transition-colors ${activeTab === "sell" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`}
          >
            Sell / Put on Rent
          </button>
          <button
            onClick={() => setActiveTab("buy")}
            className={`w-1/3 text-center py-2 mx-2 rounded-md transition-colors ${activeTab === "buy" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`}
          >
            Buy
          </button>
          <button
            onClick={() => setActiveTab("rent")}
            className={`w-1/3 text-center py-2 mx-2 rounded-md transition-colors ${activeTab === "rent" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`}
          >
            Rent
          </button>
        </div>

        {activeTab === "sell" ? (
          <SellForm setListings={setListings} listings={listings} />
        ) : (
          <>
            {/* Search bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>

            {/* Product cards */}
            <div className="flex flex-wrap justify-center">
              {filtered.map((item) => (
                <Card key={item.id} className="max-w-sm m-4 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h5 className="text-2xl font-bold tracking-tight text-foreground mb-2">
                      {item.title}
                    </h5>
                    <p className="text-muted-foreground mb-2">{item.description}</p>
                    <div className="mb-1">
                      <span className="text-sm font-medium text-muted-foreground">
                        Category: {item.category}
                      </span>
                    </div>
                    <div className="mb-3">
                      <span className="text-sm font-medium text-foreground">
                        {item.type === "rent" ? "Owner" : "Sold by"}: {item.seller}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-foreground">
                        {item.price === 0 ? "Free" : `Rs. ${item.price}`}
                        {item.type === "rent" && item.duration ? ` /${item.duration} ${item.durationType}` : ""}
                      </span>
                      <Button size="sm">
                        See More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg">No items found</p>
                <p className="text-sm">Try adjusting your search or list something new!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const SellForm = ({
  listings,
  setListings,
}: {
  listings: Listing[];
  setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
}) => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [type, setType] = useState<"sell" | "rent">("sell");
  const [duration, setDuration] = useState(0);
  const [durationType, setDurationType] = useState("Days");

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  const newItem: Listing = {
  id: (listings.length + 1).toString(),
  title: itemName,
  description,
  type,
  category,
  price,
  condition: "New",
  seller: "You",
  duration: type === "rent" ? duration : undefined,
  durationType: type === "rent" ? durationType : undefined,
};

setListings((prev) => [...prev, newItem]);

    toast({
      title: "Product added!",
      description: "Your item is now visible to other students.",
    });

    // Reset form
    setItemName("");
    setPrice(0);
    setDescription("");
    setCategory("Electronics");
    setType("sell");
    setDuration(0);
    setDurationType("Days");
  };

  return (
    <form
      className="flex mx-auto my-10 max-w-md flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div>
        <Label htmlFor="itemName">Item Name</Label>
        <Input
          id="itemName"
          type="text"
          placeholder="Item Name"
          required
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="price">Item Price (in rupees)</Label>
        <Input
          id="price"
          type="number"
          placeholder="eg. 1000"
          required
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="description">Item Description</Label>
        <Textarea
          id="description"
          placeholder="Enter a description for the item"
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="category">Item Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Books">Books</SelectItem>
            <SelectItem value="Furniture">Furniture</SelectItem>
            <SelectItem value="Stationary">Stationary</SelectItem>
            <SelectItem value="Others">Others</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <fieldset>
        <legend className="text-sm font-medium mb-2">Sell/Rent</legend>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="sell"
              checked={type === "sell"}
              onChange={() => setType("sell")}
              className="accent-primary"
            />
            Sell
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="rent"
              checked={type === "rent"}
              onChange={() => setType("rent")}
              className="accent-primary"
            />
            Rent
          </label>
        </div>
      </fieldset>

      {type === "rent" && (
        <>
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              type="number"
              placeholder="1"
              required
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="durationType">Duration type</Label>
            <Select value={durationType} onValueChange={setDurationType}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Days">Days</SelectItem>
                <SelectItem value="Weeks">Weeks</SelectItem>
                <SelectItem value="Months">Months</SelectItem>
                <SelectItem value="Years">Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Marketplace;
