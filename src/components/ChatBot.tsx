import { useState } from "react";
import { useDashboard } from "@/contexts/DashboardContext";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const ChatBot = () => {
  const { baseData } = useDashboard();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user" as const, content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: "OpenAI API key not configured." },
        ]);
        setLoading(false);
        return;
      }
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful financial assistant. Use the following dashboard data in your replies:" +
                JSON.stringify(baseData),
            },
            ...newMessages,
          ],
        }),
      });

      if (!res.ok) {
        throw new Error("API request failed");
      }
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content?.trim();
      if (reply) {
        setMessages([...newMessages, { role: "assistant", content: reply }]);
      } else {
        setMessages([
          ...newMessages,
          { role: "assistant", content: "No response" },
        ]);
      }
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Failed to get response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 z-50"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close Chat" : "AI Chat"}
      </Button>
      {open && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-slate-800 text-slate-200 border border-slate-600 rounded shadow-lg flex flex-col z-50">
          <div className="flex-1 overflow-y-auto p-2 space-y-2 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <span className="whitespace-pre-wrap">{m.content}</span>
              </div>
            ))}
            {loading && <div className="text-slate-400">Typing...</div>}
          </div>
          <div className="p-2 border-t border-slate-600 flex gap-2">
            <input
              className="flex-1 bg-slate-700 text-slate-200 p-1 rounded"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button size="sm" onClick={handleSend} disabled={loading}>
              Send
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
