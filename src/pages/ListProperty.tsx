import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

interface FormData {
  title: string;
  description: string;
  price_per_month: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  property_type: string;
  furnishing: string;
  preferred_gender: string;
  stay_length: string;
}

const ListProperty = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price_per_month: "",
    location: {
      address: "",
      city: "",
      state: "",
      country: "",
    },
    property_type: "",
    furnishing: "",
    preferred_gender: "",
    stay_length: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("properties").insert([
        {
          title: formData.title,
          description: formData.description,
          price_per_month: parseFloat(formData.price_per_month),
          location: formData.location,
          property_type: formData.property_type,
          furnishing: formData.furnishing,
          preferred_gender: formData.preferred_gender,
          stay_length: formData.stay_length,
        },
      ]);
      if (error) throw error;
      toast({
        title: "Success!",
        description: "Your property has been listed.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { 
          ...prev[parent as keyof typeof prev],
          [child]: value 
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">List Your Property</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Price per Month ($)
              </label>
              <Input
                type="number"
                name="price_per_month"
                value={formData.price_per_month}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <Input
                  name="location.address"
                  value={formData.location.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <Input
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <Input
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <Input
                  name="location.country"
                  value={formData.location.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Property Type
                </label>
                <select
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="room">Room</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Furnishing
                </label>
                <select
                  name="furnishing"
                  value={formData.furnishing}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  required
                >
                  <option value="">Select Furnishing</option>
                  <option value="furnished">Furnished</option>
                  <option value="semi-furnished">Semi-furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Preferred Gender
                </label>
                <select
                  name="preferred_gender"
                  value={formData.preferred_gender}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  required
                >
                  <option value="">Select Preference</option>
                  <option value="any">Any</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Stay Length
                </label>
                <select
                  name="stay_length"
                  value={formData.stay_length}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  required
                >
                  <option value="">Select Duration</option>
                  <option value="1-3">1-3 months</option>
                  <option value="3-6">3-6 months</option>
                  <option value="6+">6+ months</option>
                </select>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "List Property"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListProperty;