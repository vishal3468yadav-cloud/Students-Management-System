import { useState } from "react";
import axios from "axios";

interface Message {
  sender: "user" | "bot";
  text: string;
}

function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I am the SVIET AI Assistant. How can I help you?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) {
      return;
    }

    const userMessage = message.trim();

    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.post(
        "http://127.0.0.1:8000/chatbot/chat",
        {
          message: userMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((previous) => [
        ...previous,
        {
          sender: "bot",
          text: response.data.response,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((previous) => [
        ...previous,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <div className="hero">
        <div>
          <span className="hero-label">
            SVIET AI ASSISTANT
          </span>

          <h2>
            How can I help you today?
          </h2>

          <p>
            Ask questions about SVIET, attendance,
            results, placement or student services.
          </p>
        </div>

        <div className="hero-mark">AI</div>
      </div>

      <div
        className="panel"
        style={{
          marginTop: "25px",
          padding: "20px",
        }}
      >
        <div
          style={{
            height: "420px",
            overflowY: "auto",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          {messages.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  item.sender === "user"
                    ? "flex-end"
                    : "flex-start",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background:
                    item.sender === "user"
                      ? "#111827"
                      : "#f1f5f9",
                  color:
                    item.sender === "user"
                      ? "#ffffff"
                      : "#111827",
                }}
              >
                {item.text}
              </div>
            </div>
          ))}

          {loading && (
            <div
              style={{
                color: "#64748b",
                padding: "10px",
              }}
            >
              SVIET AI is typing...
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            type="text"
            value={message}
            placeholder="Ask something about SVIET..."
            onChange={(event) =>
              setMessage(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
            style={{
              flex: 1,
              padding: "13px 15px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              outline: "none",
            }}
          />

          <button
            type="button"
            onClick={sendMessage}
            disabled={loading}
            style={{
              padding: "13px 22px",
              border: "none",
              borderRadius: "8px",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              fontWeight: 600,
            }}
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}

export default Chatbot;