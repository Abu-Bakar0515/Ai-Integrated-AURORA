import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  LoaderCircle,
  MessageCircle,
  Send,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getCatalogAssistantAnswer } from "../data/catalogAssistant";

const apiUrl =
  import.meta.env.VITE_CHAT_API_URL || "http://localhost:3001/api/chat";

const welcomeMessage =
  "Hello! I can help with product details, prices, availability, and current offers. What are you looking for?";

const suggestedQuestions = [
  "What products are on sale?",
  "Show me handbags under PKR 20,000",
];

function createMessage(role, content, isIntro = false) {
  const id =
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return { id, role, content, isIntro };
}

function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => [
    createMessage("assistant", welcomeMessage, true),
  ]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const requestControllerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  function appendCatalogOnlyAnswer(question) {
    setMessages((current) => [
      ...current,
      createMessage(
        "assistant",
        `OpenAI isn't connected, so I'm answering from the catalog only.\n\n${getCatalogAssistantAnswer(question)}`,
      ),
    ]);
  }

  function clearConversation() {
    requestControllerRef.current?.abort();
    requestControllerRef.current = null;
    setIsSending(false);
    setDraft("");
    setMessages([createMessage("assistant", welcomeMessage, true)]);
  }

  function deleteMessage(messageId) {
    setMessages((current) =>
      current.filter(({ id }) => id !== messageId),
    );
  }

  async function sendMessage(messageText = draft) {
    const message = messageText.trim();
    if (!message || isSending) return;

    const history = messages
      .filter(({ isIntro }) => !isIntro)
      .slice(-8)
      .map(({ role, content }) => ({ role, content }));

    const controller = new AbortController();
    requestControllerRef.current = controller;
    setDraft("");
    setMessages((current) => [
      ...current,
      createMessage("user", message),
    ]);
    setIsSending(true);

    try {
      let response;
      try {
        response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, history }),
          signal: controller.signal,
        });
      } catch {
        if (!controller.signal.aborted) {
          appendCatalogOnlyAnswer(message);
        }
        return;
      }

      if (controller.signal.aborted) return;
      let result;
      try {
        result = await response.json();
      } catch {
        if (!controller.signal.aborted) {
          setMessages((current) => [
            ...current,
            createMessage(
              "assistant",
              "The assistant returned an unreadable response. Please try again.",
            ),
          ]);
        }
        return;
      }

      if (controller.signal.aborted) return;
      if (response.status === 502 || response.status === 503) {
        appendCatalogOnlyAnswer(message);
        return;
      }
      if (!response.ok) {
        setMessages((current) => [
          ...current,
          createMessage(
            "assistant",
            result.error || "The assistant is temporarily unavailable.",
          ),
        ]);
        return;
      }

      if (typeof result.answer !== "string" || !result.answer.trim()) {
        setMessages((current) => [
          ...current,
          createMessage(
            "assistant",
            "The assistant returned an empty response. Please try again.",
          ),
        ]);
        return;
      }
      setMessages((current) => [
        ...current,
        createMessage("assistant", result.answer),
      ]);
    } finally {
      if (requestControllerRef.current === controller) {
        requestControllerRef.current = null;
        setIsSending(false);
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    void sendMessage();
  }

  return (
    <div className="fixed bottom-5 right-4 z-[60] sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            aria-label="AURORA product assistant"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mb-3 flex h-[min(34rem,calc(100dvh-7rem))] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden border border-[#342d25]/15 bg-[#F5F1E9] shadow-[0_16px_50px_rgba(41,36,31,0.2)]"
          >
            <header className="flex items-center justify-between border-b border-[#342d25]/10 bg-white px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-[#EAE7E2] text-[#514a42]">
                  <Sparkles aria-hidden="true" size={17} strokeWidth={1.6} />
                </span>
                <div>
                  <h2 className="font-serif text-lg leading-tight text-[#29241f]">
                    AURORA assistant
                  </h2>
                  <p className="mt-0.5 text-[0.65rem] text-[#766b61]">
                    Product details, from our catalog
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={clearConversation}
                  aria-label="Clear chat messages"
                  title="Clear chat"
                  className="flex items-center gap-1 rounded-full px-2 py-2 text-[0.62rem] uppercase tracking-[0.1em] text-[#766b61] transition-colors hover:bg-[#F5F1E9] hover:text-[#29241f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#514a42]"
                >
                  <Trash2 aria-hidden="true" size={15} />
                  <span className="hidden sm:inline">Clear</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="rounded-full p-2 text-[#514a42] transition-colors hover:bg-[#F5F1E9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#514a42]"
                >
                  <X aria-hidden="true" size={18} />
                </button>
              </div>
            </header>

            <div
              aria-live="polite"
              aria-relevant="additions text"
              className="flex-1 space-y-3 overflow-y-auto px-3 py-4 sm:px-4"
            >
              {messages.map(({ id, role, content, isIntro }) => (
                <div
                  key={id}
                  className={`group flex items-start gap-1.5 ${
                    role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <p
                    className={`max-w-[88%] whitespace-pre-wrap px-3.5 py-2.5 text-sm leading-relaxed ${
                      role === "user"
                        ? "bg-[#29241f] text-white"
                        : "border border-[#342d25]/10 bg-white text-[#514a42]"
                    }`}
                  >
                    {content}
                  </p>
                  <button
                    type="button"
                    onClick={() => deleteMessage(id)}
                    disabled={isSending}
                    aria-label={`Delete ${isIntro ? "welcome" : role === "user" ? "your" : "assistant"} message`}
                    title="Delete message"
                    className="mt-1 shrink-0 rounded-full p-1.5 text-[#8b8177] opacity-70 transition-colors hover:bg-white hover:text-[#29241f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#514a42] disabled:cursor-not-allowed disabled:opacity-30 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                  >
                    <Trash2 aria-hidden="true" size={14} />
                  </button>
                </div>
              ))}

              {messages.length === 1 && messages[0].isIntro && !isSending && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => void sendMessage(question)}
                      className="border border-[#342d25]/15 bg-white px-3 py-2 text-left text-xs text-[#514a42] transition-colors hover:border-[#766b61] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#514a42]"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

              {isSending && (
                <div
                  role="status"
                  className="flex items-center gap-2 text-xs text-[#766b61]"
                >
                  <LoaderCircle
                    aria-hidden="true"
                    className="animate-spin"
                    size={15}
                  />
                  Checking the collection…
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-[#342d25]/10 bg-white p-3"
            >
              <label className="sr-only" htmlFor="aurora-chat-message">
                Ask about a product
              </label>
              <input
                id="aurora-chat-message"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={800}
                placeholder="Ask about a product…"
                disabled={isSending}
                className="min-w-0 flex-1 border border-[#342d25]/15 bg-[#F5F1E9] px-3 py-2.5 text-sm text-[#29241f] outline-none placeholder:text-[#8b8177] focus:border-[#766b61] disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isSending || !draft.trim()}
                aria-label="Send message"
                className="flex size-10 shrink-0 items-center justify-center bg-[#29241f] text-white transition-colors hover:bg-[#514a42] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#514a42] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send aria-hidden="true" size={17} strokeWidth={1.7} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close product assistant" : "Open product assistant"}
        aria-expanded={isOpen}
        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
        className="ml-auto flex size-14 items-center justify-center rounded-full bg-[#29241f] text-white shadow-lg transition-colors hover:bg-[#514a42] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29241f]"
      >
        {isOpen ? (
          <X aria-hidden="true" size={22} />
        ) : (
          <MessageCircle aria-hidden="true" size={22} strokeWidth={1.6} />
        )}
      </motion.button>
    </div>
  );
}

export default ChatAssistant;
