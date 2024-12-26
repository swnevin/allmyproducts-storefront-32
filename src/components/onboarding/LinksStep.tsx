import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Instagram, Youtube, Facebook, Twitter, Github, Linkedin, Link as LinkIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SocialLink = {
  id: string;
  type: string;
  username: string;
  icon: JSX.Element;
};

export const LinksStep = ({ 
  onContinue,
  skipText
}: { 
  onContinue: (links: SocialLink[]) => void;
  skipText: string;
}) => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const availableSocials = [
    { type: 'instagram', icon: <Instagram className="text-white h-5 w-5" />, bgColor: 'bg-pink-600' },
    { type: 'youtube', icon: <Youtube className="text-white h-5 w-5" />, bgColor: 'bg-red-600' },
    { type: 'facebook', icon: <Facebook className="text-white h-5 w-5" />, bgColor: 'bg-blue-600' },
    { type: 'twitter', icon: <Twitter className="text-white h-5 w-5" />, bgColor: 'bg-blue-400' },
    { type: 'github', icon: <Github className="text-white h-5 w-5" />, bgColor: 'bg-gray-800' },
    { type: 'linkedin', icon: <Linkedin className="text-white h-5 w-5" />, bgColor: 'bg-blue-700' },
  ];

  const addSocialLink = (social: typeof availableSocials[0]) => {
    const newId = (socialLinks.length + 1).toString();
    setSocialLinks([...socialLinks, { 
      id: newId, 
      type: social.type, 
      username: '', 
      icon: social.icon 
    }]);
  };

  const updateUsername = (id: string, username: string) => {
    setSocialLinks(socialLinks.map(link => 
      link.id === id ? { ...link, username } : link
    ));
  };

  const getBgColorForType = (type: string) => {
    const social = availableSocials.find(s => s.type === type);
    return social?.bgColor || 'bg-black';
  };

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      onContinue(socialLinks);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-md w-full">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Add your links</h1>
        <p className="text-gray-600">Complete the fields below to add your content</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Your social media</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Add social media
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {availableSocials.map((social) => (
                  <DropdownMenuItem
                    key={social.type}
                    onClick={() => addSocialLink(social)}
                    className="cursor-pointer"
                  >
                    <div className={`w-8 h-8 ${social.bgColor} rounded-lg flex items-center justify-center mr-2`}>
                      {social.icon}
                    </div>
                    {social.type.charAt(0).toUpperCase() + social.type.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="space-y-4">
            {socialLinks.map((link) => (
              <div key={link.id} className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${getBgColorForType(link.type)} rounded-lg flex items-center justify-center`}>
                  {link.icon}
                </div>
                <Input 
                  placeholder={`${link.type.charAt(0).toUpperCase() + link.type.slice(1)} username`}
                  value={link.username}
                  onChange={(e) => updateUsername(link.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Button 
          onClick={handleContinue}
          className="w-full bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Continue"}
        </Button>
        <Button
          variant="outline"
          onClick={() => onContinue([])}
          className="w-full"
          disabled={isLoading}
        >
          {skipText}
        </Button>
      </div>
    </div>
  );
};
