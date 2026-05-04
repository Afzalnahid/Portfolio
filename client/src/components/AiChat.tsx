import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Streamdown } from "streamdown";

interface Message {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm Nahid's AI assistant. How can I help you with automation today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateStreaming = async (text: string) => {
    setIsTyping(false);
    let currentContent = "";

    // Add an empty assistant message to stream into
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", isStreaming: true },
    ]);

    const words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
      currentContent += words[i] + " ";
      await new Promise((resolve) =>
        setTimeout(resolve, 50 + Math.random() * 50),
      );

      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.role === "assistant") {
          lastMessage.content = currentContent;
        }
        return newMessages;
      });
    }

    setMessages((prev) => {
      const newMessages = [...prev];
      const lastMessage = newMessages[newMessages.length - 1];
      if (lastMessage) lastMessage.isStreaming = false;
      return newMessages;
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    // Simulate AI logic based on keywords
    setTimeout(() => {
      let response =
        "I'm sorry, I didn't quite catch that. Could you tell me more about your project?";

      const lowerInput = userMessage.toLowerCase();
      if (lowerInput.includes("n8n") || lowerInput.includes("make") || lowerInput.includes("ghl")) {
        response =
          "Nahid is an Automation Expert! He specializes in n8n, Make.com, and GoHighLevel. He has built complex booking workflows, AI advertising systems, and comprehensive internal automation ecosystems. What kind of workflow are you looking to build?";
      } else if (lowerInput.includes("chatbot") || lowerInput.includes("messaging")) {
        response =
          "Chatbots and messaging automation are Nahid's specialties. He integrates WhatsApp, Instagram, and Facebook Messenger using Meta Messaging, often grounding AI responses in Supabase vector stores for accuracy.";
      } else if (
        lowerInput.includes("contact") ||
        lowerInput.includes("hire") ||
        lowerInput.includes("price")
      ) {
        response =
          "You can reach out to Nahid via the contact section, or directly via WhatsApp at +880 1690-000732. He's currently available for new projects and consultations!";
      } else if (lowerInput.includes("hi") || lowerInput.includes("hello")) {
        response =
          "Hello! I'm here to answer any questions you have about Nahid's AI automation services. What's on your mind?";
      }

      simulateStreaming(response);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6 z-[100]"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.5)] flex items-center justify-center transition-all duration-300 group"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <MessageSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[90vw] sm:w-[400px] h-[500px] bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl z-[100] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border-b border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center border border-white/10 shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Nahid's AI Assistant
                </h3>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />{" "}
                  Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border border-white/5 ${msg.role === "user" ? "bg-slate-800" : "bg-blue-600/20"}`}
                    >
                      {msg.role === "user" ? (
                        <User className="w-4 h-4 text-slate-400" />
                      ) : (
                        <Bot className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-white/5 text-slate-200 rounded-tl-none border border-white/5"
                      }`}
                    >
                      <Streamdown>{msg.content}</Streamdown>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 items-center text-slate-500 italic text-xs ml-11">
                    <Loader2 className="w-3 h-3 animate-spin" /> Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-slate-950/50 border-t border-white/5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about n8n, chatbots..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center shrink-0 p-0"
                >
                  <Send className="w-4 h-4 text-white" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
