import { ScrollArea } from "@/components/ui/scroll-area";
import { Channel } from "@/types/channel";
import { ChevronDown, Hash, MapPin, Building2, GraduationCap, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChannelSidebarProps {
  onChannelSelect: (channel: Channel) => void;
  activeChannel: Channel | null;
}

export const ChannelSidebar = ({ onChannelSelect, activeChannel }: ChannelSidebarProps) => {
  const channels: Channel[] = [
    {
      id: "1",
      name: "San Francisco",
      type: "CITY",
      children: [
        {
          id: "2",
          name: "Google",
          type: "COMPANY",
          parentId: "1",
          children: [
            { id: "3", name: "soma-district", type: "LOCATION", parentId: "2" },
            { id: "4", name: "berkeley-students", type: "UNIVERSITY", parentId: "2" },
            { id: "5", name: "summer-2024", type: "SEASON", parentId: "2" },
          ],
        },
        {
          id: "6",
          name: "Meta",
          type: "COMPANY",
          parentId: "1",
          children: [
            { id: "7", name: "menlo-park", type: "LOCATION", parentId: "6" },
            { id: "8", name: "stanford-students", type: "UNIVERSITY", parentId: "6" },
            { id: "9", name: "fall-2024", type: "SEASON", parentId: "6" },
          ],
        },
      ],
    },
    {
      id: "10",
      name: "New York",
      type: "CITY",
      children: [
        {
          id: "11",
          name: "PayPal",
          type: "COMPANY",
          parentId: "10",
          children: [
            { id: "12", name: "manhattan", type: "LOCATION", parentId: "11" },
            { id: "13", name: "nyu-students", type: "UNIVERSITY", parentId: "11" },
            { id: "14", name: "spring-2024", type: "SEASON", parentId: "11" },
          ],
        },
      ],
    },
  ];

  const getChannelIcon = (type: Channel["type"]) => {
    switch (type) {
      case "CITY":
        return <MapPin className="h-4 w-4" />;
      case "COMPANY":
        return <Building2 className="h-4 w-4" />;
      case "LOCATION":
        return <Hash className="h-4 w-4" />;
      case "UNIVERSITY":
        return <GraduationCap className="h-4 w-4" />;
      case "SEASON":
        return <Calendar className="h-4 w-4" />;
    }
  };

  const renderChannel = (channel: Channel) => {
    const isActive = activeChannel?.id === channel.id;
    return (
      <div key={channel.id} className="space-y-2">
        <button
          onClick={() => onChannelSelect(channel)}
          className={cn(
            "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
            isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent/50 text-muted-foreground"
          )}
        >
          {getChannelIcon(channel.type)}
          <span>{channel.name}</span>
          {channel.children && <ChevronDown className="h-4 w-4 ml-auto" />}
        </button>
        {channel.children && (
          <div className="ml-4 space-y-1">
            {channel.children.map((child) => renderChannel(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 border-r bg-card">
      <div className="p-4 border-b">
        <h2 className="font-semibold">StayIntern Channels</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-65px)]">
        <div className="p-4 space-y-4">
          {channels.map((channel) => renderChannel(channel))}
        </div>
      </ScrollArea>
    </div>
  );
};