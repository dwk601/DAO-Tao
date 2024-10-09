"use client";

import { useState } from "react";
import Anthropic from "@anthropic-ai/sdk";
import type { NextPage } from "next";

const DAOTAOApp: NextPage = () => {
  const [question, setQuestion] = useState("Why is the ocean salty?");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const anthropic = new Anthropic({
        apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const message = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1000,
        temperature: 0,
        system: "Respond only with short poems.",
        messages: [
          {
            role: "user",
            content: question,
          },
        ],
      });

      const textContent = message.content
        .filter((block): block is { type: "text"; text: string } => block.type === "text")
        .map(block => block.text)
        .join("\n");

      setResponse(textContent);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">AI DAO Synopsys</h1>
        <p className="text-neutral">Chat with Claude about DAOs (in poems)</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8">
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your question here..."
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-primary text-white rounded" disabled={loading}>
          {loading ? "Thinking..." : "Get Poem"}
        </button>
      </form>

      {response && (
        <div className="mt-8 p-4 bg-secondary rounded">
          <h2 className="text-2xl mb-2">Claude&apos;s Poetic Response:</h2>
          <pre className="whitespace-pre-wrap">{response}</pre>
        </div>
      )}
    </div>
  );
};

export default DAOTAOApp;
