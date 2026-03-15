import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "Where is the admin block?",
  "What are the canteen timings?",
  "How to reach NIILM from railway station?",
  "Tell me about nearby hotels for visitors",
  "What departments are available?",
  "Where can I find the library?",
];

const BOT_RESPONSES: Record<string, string> = {
  admin: "The Admin Block is located at the center of NIILM University campus, near the main gate. It houses the Registrar's office, Accounts section, and the Vice-Chancellor's office. Office hours are 9:00 AM - 5:00 PM (Mon-Sat).",
  canteen: "The main canteen is located near the hostel area. Timings: Breakfast 7:30-9:30 AM | Lunch 12:00-2:30 PM | Snacks 4:00-6:00 PM | Dinner 7:30-9:30 PM. There's also a tea point near the boys hostel.",
  hotel: "Nearby Hotels:\n1. Hotel Grand Kaithal - ₹1,200/night (budget)\n2. Hotel Raj Palace - ₹1,500/night (mid-range, AC rooms)\n3. NIILM Guest House - ₹800/night (inside campus)\n\nAll accessible via auto-rickshaw from campus gate.",
  library: "The Central Library is inside the main building. Timings: 8:00 AM - 8:00 PM (Mon-Sat). You need your student ID for entry. It has a digital section, reading room, and reference area.",
  department: "NIILM University departments:\n- Computer Science & Engineering\n- Management & Commerce\n- Law\n- Education\n- Arts & Humanities\n- Agriculture\n\nEach department has dedicated faculty and labs.",
  railway: "From Kaithal Railway Station to NIILM University:\n1. Auto-rickshaw - ₹60-80 (10-15 min)\n2. Local bus - ₹15 (20 min)\n\nFrom Kaithal Bus Stand: Auto ₹40 (8 min)\n\nNearest major railway: Kurukshetra Junction (45 km)",
  niilm: "NIILM University is a private university located in Kaithal, Haryana. It offers UG, PG, and PhD programs across multiple disciplines including Engineering, Management, Law, Education, and Agriculture.",
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hi! 👋 I'm the UniCircle Campus Assistant for NIILM University, Kaithal. Ask me anything about the university — departments, locations, facilities, nearby places, or admission info!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const getBotResponse = (query: string): string => {
    const q = query.toLowerCase();
    for (const [key, value] of Object.entries(BOT_RESPONSES)) {
      if (q.includes(key)) return value;
    }
    return "I'm still learning about this! 🤔 Once connected to the NIILM University website, I'll be able to answer that. For now, try asking about the admin block, canteen, library, departments, hotels, or transport.";
  };

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: getBotResponse(msg) };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-6 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-dm-serif text-2xl text-foreground">Campus Assistant</h1>
            <p className="text-sm text-muted-foreground">Ask anything about NIILM University</p>
          </div>
        </div>

        <Card className="flex flex-col h-[calc(100vh-220px)] shadow-md">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {msg.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={`max-w-[80%] rounded-lg px-4 py-3 text-sm whitespace-pre-line ${msg.role === "assistant" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-muted rounded-lg px-4 py-3 text-sm text-muted-foreground">
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="px-4 pb-3">
              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Suggested questions</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <Button key={q} variant="outline" size="sm" className="text-xs" onClick={() => handleSend(q)}>
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 border-t border-border">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <Input
                placeholder="Ask about campus, departments, nearby places..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;
