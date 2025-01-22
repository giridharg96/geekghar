import { ScrollArea } from "@/components/ui/scroll-area";
import { Channel, Message } from "@/types/channel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";

interface ChannelContentProps {
  activeChannel: Channel | null;
}

export const ChannelContent = ({ activeChannel }: ChannelContentProps) => {
  const [message, setMessage] = useState("");

  // Mock messages for demonstration
  const messages: Message[] = [
    {
      id: "1",
      content: "Hey everyone! Just joined the internship program.",
      userId: "1",
      userName: "John Doe",
      userAvatar: "/placeholder.svg",
      timestamp: new Date(),
      channelId: activeChannel?.id || "",
    },
    {
      id: "2",
      content: "Welcome! Which team are you joining?",
      userId: "2",
      userName: "Jane Smith",
      userAvatar: "/placeholder.svg",
      timestamp: new Date(),
      channelId: activeChannel?.id || "",
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Here you would typically send the message to your backend
    console.log("Sending message:", message);
    setMessage("");
  };

  if (!activeChannel) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Select a channel to start chatting
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold"># {activeChannel.name}</h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3 animate-fade-in">
              <img
                src={msg.userAvatar}
                alt={msg.userName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{msg.userName}</span>
                  <span className="text-xs text-muted-foreground">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};