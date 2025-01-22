import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChannelSidebar } from "@/components/ChannelSidebar";
import { ChannelContent } from "@/components/ChannelContent";
import { useState } from "react";
import { Channel } from "@/types/channel";

const Channels = () => {
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  return (
    <div className="flex h-screen bg-background">
      <ChannelSidebar onChannelSelect={setActiveChannel} activeChannel={activeChannel} />
      <ChannelContent activeChannel={activeChannel} />
    </div>
  );
};

export default Channels;