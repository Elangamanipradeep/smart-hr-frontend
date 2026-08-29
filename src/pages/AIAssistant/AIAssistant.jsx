import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { askAI } from "../../services/api";

import "./AIAssistant.css";

// function cleanAIResponse(text) {

//     if (!text) {
//         return "";
//     }

//     return text.replace(/\*\*/g, "").trim();
// }

function AIAssistant() {

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const textareaRef = useRef(null);
    const messagesEndRef = useRef(null);


    // Scroll to latest message
    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages, loading]);


    const handleAsk = async (text = question) => {

        const userQuestion = text.trim();

        if (!userQuestion || loading) {
            return;
        }

        const previousMessages = messages
            .slice(-10)
            .map((message) => ({
                role: message.role,
                content: message.content,
            }));


        // Add user message to UI
        setMessages((previousMessages) => [
            ...previousMessages,
            {
                role: "user",
                content: userQuestion
            }
        ]);

        setQuestion("");
        setLoading(true);

        try {

            const data = await askAI(
                userQuestion,
                previousMessages
            );

            setMessages((previousMessages) => [
                ...previousMessages,
                {
                    role: "assistant",
                    content: data.answer
                }
            ]);

        } catch (error) {

            console.error(
                "AI Assistant Error:",
                error
            );

            let errorMessage =
                "Unable to get a response from the AI Assistant.";

            if (error.response?.data?.error) {

                errorMessage =
                    error.response.data.error;

            }

            setMessages((previousMessages) => [
                ...previousMessages,
                {
                    role: "assistant",
                    content: errorMessage,
                    isError: true
                }
            ]);

        } finally {

            setLoading(false);

            setTimeout(() => {

                textareaRef.current?.focus();

            }, 100);

        }
    };


    const handleSubmit = (event) => {

        event.preventDefault();

        handleAsk();

    };


    const handleKeyDown = (event) => {

        // Enter sends message
        // Shift + Enter creates new line
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            handleAsk();

        }
    };


    const handleSuggestion = (suggestion) => {

        handleAsk(suggestion);

    };


    const clearChat = () => {

        setMessages([]);
        setQuestion("");

        setTimeout(() => {
            textareaRef.current?.focus();
        }, 100);

    };


    const suggestions = [
        "How many employees are currently in the system?",
        "Who is the highest paid employee?",
        "List all employees in the Information Technology department.",
        "How many active and inactive employees are there?"
    ];


    return (

        <div className="ai-assistant-page">

            {/* Header */}

            <div className="ai-assistant-header">

                {/* <div>

                    <div className="ai-title-row">

                        <div className="ai-title-icon">
                            🤖
                        </div>

                        <div>

                            <h1>
                                AI HR Assistant
                            </h1>

                            <p>
                                Ask questions about your HR data.
                            </p>

                        </div>

                    </div>

                </div> */}


                {messages.length > 0 && (

                    <button
                        type="button"
                        className="clear-chat-button"
                        onClick={clearChat}
                    >
                        Clear chat
                    </button>

                )}

            </div>


            {/* Chat container */}

            <div className="ai-chat-container">


                {/* Empty state */}

                {messages.length === 0 && (

                    <div className="ai-empty-state">

                        <div className="ai-large-icon">
                            🤖
                        </div>

                        <h2>
                            How can I help?
                        </h2>

                        <p>
                            Ask me anything about your employees,
                            departments, salaries, and HR data.
                        </p>


                        <div className="ai-suggestions">

                            <div className="suggestions-title">
                                Try asking
                            </div>


                            {suggestions.map(
                                (suggestion, index) => (

                                    <button
                                        key={index}
                                        type="button"
                                        className="suggestion-button"
                                        onClick={() =>
                                            handleSuggestion(suggestion)
                                        }
                                    >

                                        <span className="suggestion-icon">
                                            {index === 0 && "👥"}
                                            {index === 1 && "💰"}
                                            {index === 2 && "🏢"}
                                            {index === 3 && "📊"}
                                        </span>

                                        <span>
                                            {suggestion}
                                        </span>

                                    </button>

                                )
                            )}

                        </div>

                    </div>

                )}


                {/* Messages */}

                {messages.length > 0 && (

                    <div className="ai-messages">

                        {messages.map((message, index) => (

                            <div
                                key={index}
                                className={`ai-message ${
                                    message.role === "user"
                                        ? "user-message"
                                        : "assistant-message"
                                }`}
                            >

                                {message.role === "assistant" && (

                                    <div className="message-avatar">
                                        🤖
                                    </div>

                                )}


                                <div
                                    className={`message-bubble ${
                                        message.isError
                                            ? "message-error"
                                            : ""
                                    }`}
                                >

                                    <div className="message-label">

                                        {message.role === "user"
                                            ? "You"
                                            : "AI Assistant"
                                        }

                                    </div>

                                    <div className="message-content">

                                        {message.role === "assistant" ? (

                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {message.content}
                                            </ReactMarkdown>

                                        ) : (

                                            message.content

                                        )}

                                    </div>

                                </div>


                                {message.role === "user" && (

                                    <div className="message-avatar user-avatar">
                                        👤
                                    </div>

                                )}

                            </div>

                        ))}


                        {/* Loading */}

                        {loading && (

                            <div className="ai-message assistant-message">

                                <div className="message-avatar">
                                    🤖
                                </div>

                                <div className="message-bubble">

                                    <div className="message-label">
                                        AI Assistant
                                    </div>

                                    <div className="typing-indicator">

                                        <span></span>
                                        <span></span>
                                        <span></span>

                                    </div>

                                </div>

                            </div>

                        )}

                        <div ref={messagesEndRef} />

                    </div>

                )}

            </div>


            {/* Input area */}

            <div className="ai-input-section">

                <form
                    className="ai-input-form"
                    onSubmit={handleSubmit}
                >

                    <textarea
                        ref={textareaRef}
                        value={question}
                        onChange={(event) =>
                            setQuestion(event.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about employees, departments, salaries..."
                        rows="1"
                        disabled={loading}
                    />


                    <button
                        type="submit"
                        className="ai-send-button"
                        disabled={
                            loading ||
                            !question.trim()
                        }
                        title="Send message"
                    >

                        {loading ? "..." : "➤"}

                    </button>

                </form>


                <div className="ai-input-hint">
                    Press Enter to send · Shift + Enter for a new line
                </div>

            </div>

        </div>

    );

}

export default AIAssistant;