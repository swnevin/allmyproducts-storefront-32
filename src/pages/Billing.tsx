import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Basic",
    description: "Perfect for trying out allmyproducts",
    price: { monthly: "Free", yearly: "Free" },
    features: ["Basic features", "Community support", "Up to 10 products"],
  },
  {
    name: "Starter",
    description: "For growing influencers",
    price: { monthly: "$5", yearly: "$4" },
    features: ["Everything in Basic", "Priority support", "Up to 50 products"],
  },
  {
    name: "Pro",
    description: "For creators and businesses",
    price: { monthly: "$9", yearly: "$7.50" },
    features: ["Everything in Starter", "24/7 support", "Unlimited products"],
  },
  {
    name: "Premium",
    description: "For large scale operations",
    price: { monthly: "Contact us", yearly: "Contact us" },
    features: ["Everything in Pro", "Custom features", "Dedicated support"],
  },
];

const Billing = () => {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose your plan</h1>
          <p className="text-lg text-gray-600">
            Select the perfect plan for your needs
          </p>
          
          <div className="flex justify-center items-center mt-6 space-x-4">
            <Button
              variant={billingInterval === "monthly" ? "default" : "outline"}
              onClick={() => setBillingInterval("monthly")}
            >
              Monthly billing
            </Button>
            <Button
              variant={billingInterval === "yearly" ? "default" : "outline"}
              onClick={() => setBillingInterval("yearly")}
            >
              Annual billing
              <span className="ml-2 text-xs bg-primary-light text-white px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-4">
                  <span className="text-3xl font-bold">
                    {plan.price[billingInterval]}
                  </span>
                  {plan.price[billingInterval] !== "Free" && plan.price[billingInterval] !== "Contact us" && (
                    <span className="text-gray-500 ml-2">
                      /{billingInterval === "monthly" ? "mo" : "yr"}
                    </span>
                  )}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.name === "Pro" ? "default" : "outline"}>
                  {plan.price[billingInterval] === "Contact us" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Billing;