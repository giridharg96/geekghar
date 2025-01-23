import { ScrollArea } from "@/components/ui/scroll-area";
import { Channel, Message } from "@/types/channel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rhknjdqyvxorkrcvxyqn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoa25qZHF5dnhvcmtyY3Z4eXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1ODYwODIsImV4cCI6MjA1MzE2MjA4Mn0.y_kCJpGCFwsq6W71n6psONkHYjSr97A50XyEW0mCeto"
);

interface ChannelContentProps {
  activeChannel: Channel | null;
}

export const ChannelContent = ({ activeChannel }: ChannelContentProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeChannel) {
      fetchMessages();
      subscribeToMessages();
    }
  }, [activeChannel]);

  const fetchMessages = async () => {
    if (!activeChannel) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("channel_id", activeChannel.id)
        .order("created_at", { ascending: true });

      if (error) throw error;

      const formattedMessages = data.map((msg): Message => ({
        id: msg.id,
        content: msg.content,
        userId: msg.user_id,
        userName: "Anonymous", // In a real app, we'd fetch user details
        userAvatar: "/placeholder.svg",
        timestamp: new Date(msg.created_at),
        channelId: msg.channel_id,
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToMessages = () => {
    if (!activeChannel) return;

    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `channel_id=eq.${activeChannel.id}`,
        },
        (payload) => {
          const newMessage: Message = {
            id: payload.new.id,
            content: payload.new.content,
            userId: payload.new.user_id,
            userName: "Anonymous",
            userAvatar: "/placeholder.svg",
            timestamp: new Date(payload.new.created_at),
            channelId: payload.new.channel_id,
          };
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !activeChannel) return;

    try {
      const { error } = await supabase.from("messages").insert([
        {
          channel_id: activeChannel.id,
          user_id: "anonymous", // In a real app, this would be the actual user ID
          content: message,
        },
      ]);

      if (error) throw error;
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
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
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h2 className="font-semibold flex items-center gap-2">
            {getChannelIcon(activeChannel.type)}
            {activeChannel.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {getChannelDescription(activeChannel)}
          </p>
        </div>
        <Button variant="ghost" size="icon">
          <Users className="h-4 w-4" />
        </Button>
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

const getChannelIcon = (type: Channel["type"]) => {
  switch (type) {
    case "CITY":
      return "🌆";
    case "COMPANY":
      return "🏢";
    case "LOCATION":
      return "📍";
    case "UNIVERSITY":
      return "🎓";
    case "SEASON":
      return "📅";
  }
};

const getChannelDescription = (channel: Channel) => {
  switch (channel.type) {
    case "CITY":
      return "City-wide discussions and updates";
    case "COMPANY":
      return "Company-specific conversations";
    case "LOCATION":
      return "Location-specific discussions";
    case "UNIVERSITY":
      return "University student group";
    case "SEASON":
      return "Seasonal intern discussions";
    default:
      return "";
  }
};