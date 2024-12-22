import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Instagram, Youtube, Link as LinkIcon } from "lucide-react";

export const LinksStep = ({ 
  onContinue,
  skipText
}: { 
  onContinue: () => void;
  skipText: string;
}) => {
  const [customLinks, setCustomLinks] = useState<string[]>(['', '', '']);
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    youtube: '',
    tiktok: ''
  });

  return (
    <div className="space-y-8 max-w-md w-full">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Add your links</h1>
        <p className="text-gray-600">Complete the fields below to add your content</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Your selections</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TT</span>
              </div>
              <Input 
                placeholder="TikTok username"
                value={socialLinks.tiktok}
                onChange={(e) => setSocialLinks(prev => ({ ...prev, tiktok: e.target.value }))}
              />
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Youtube className="text-white h-5 w-5" />
              </div>
              <Input 
                placeholder="YouTube username"
                value={socialLinks.youtube}
                onChange={(e) => setSocialLinks(prev => ({ ...prev, youtube: e.target.value }))}
              />
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
                <Instagram className="text-white h-5 w-5" />
              </div>
              <Input 
                placeholder="Instagram username"
                value={socialLinks.instagram}
                onChange={(e) => setSocialLinks(prev => ({ ...prev, instagram: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Add your own links</h3>
          {customLinks.map((link, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <LinkIcon className="text-gray-600 h-5 w-5" />
              </div>
              <Input 
                placeholder="Website URL"
                value={link}
                onChange={(e) => {
                  const newLinks = [...customLinks];
                  newLinks[index] = e.target.value;
                  setCustomLinks(newLinks);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Button 
          onClick={onContinue}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Continue
        </Button>
        <Button
          variant="outline"
          onClick={onContinue}
          className="w-full"
        >
          {skipText}
        </Button>
      </div>
    </div>
  );
};