import { useState } from "react";
import { Sparkles, Copy, Check, Zap } from "lucide-react";
import { generatePRDescription } from "../utils/prGenerator";
import { MarkdownOutput } from "./MarkdownOutput";

export function PRGenerator() {
  const [commitMessages, setCommitMessages] = useState("");
  const [breakingChange, setBreakingChange] = useState(false);
  const [testsAdded, setTestsAdded] = useState(false);
  const [prDescription, setPrDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!commitMessages.trim()) return;

    setIsGenerating(true);
    setPrDescription("");

    // Simulate LLM processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const description = generatePRDescription(
      commitMessages,
      breakingChange,
      testsAdded
    );

    // Animate the text appearing
    let currentText = "";
    const words = description.split(" ");
    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? " " : "") + words[i];
      setPrDescription(currentText);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }

    setIsGenerating(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prDescription);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for when clipboard API is not available
      // Create a temporary textarea to copy the text
      const textArea = document.createElement("textarea");
      textArea.value = prDescription;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err2) {
        console.error("Failed to copy text: ", err2);
      }
      textArea.remove();
    }
  };

  const exampleCommits = `fix: resolve memory leak in event listeners
feat: add dark mode support
chore: update dependencies
docs: improve API documentation`;

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-black/40 backdrop-blur-sm border border-green-900/30 rounded-lg p-6 shadow-2xl shadow-green-500/5">
        <div className="flex items-center justify-between mb-4">
          <label className="text-green-400 flex items-center gap-2">
            <span className="text-cyan-400">$</span> Commit Messages
          </label>
          <button
            onClick={() => setCommitMessages(exampleCommits)}
            className="text-xs text-green-600 hover:text-green-400 transition-colors"
          >
            Load example
          </button>
        </div>

        <textarea
          value={commitMessages}
          onChange={(e) => setCommitMessages(e.target.value)}
          placeholder="Paste your commit messages here..."
          className="w-full h-48 bg-black/60 border border-green-900/50 rounded px-4 py-3 text-green-400 placeholder-green-900 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all font-mono text-sm resize-none"
          spellCheck={false}
        />

        {/* Checkboxes */}
        <div className="flex flex-wrap gap-6 mt-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={breakingChange}
                onChange={(e) => setBreakingChange(e.target.checked)}
                className="w-5 h-5 bg-black/60 border-2 border-green-900/50 rounded checked:bg-red-500 checked:border-red-500 cursor-pointer appearance-none transition-all"
              />
              {breakingChange && (
                <Check className="w-4 h-4 text-black absolute top-0.5 left-0.5 pointer-events-none" />
              )}
            </div>
            <span className="text-sm text-green-400 group-hover:text-green-300 transition-colors">
              🚨 Breaking Change
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={testsAdded}
                onChange={(e) => setTestsAdded(e.target.checked)}
                className="w-5 h-5 bg-black/60 border-2 border-green-900/50 rounded checked:bg-green-500 checked:border-green-500 cursor-pointer appearance-none transition-all"
              />
              {testsAdded && (
                <Check className="w-4 h-4 text-black absolute top-0.5 left-0.5 pointer-events-none" />
              )}
            </div>
            <span className="text-sm text-green-400 group-hover:text-green-300 transition-colors">
              ✅ Tests Added
            </span>
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!commitMessages.trim() || isGenerating}
          className="w-full mt-6 bg-linear-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed text-black py-3 rounded-lg transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/40 flex items-center justify-center gap-2 group relative overflow-hidden"
        >
          {isGenerating ? (
            <>
              <Zap className="w-5 h-5 animate-pulse" />
              <span className="font-mono">Generating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="font-mono">Generate PR Description</span>
            </>
          )}

          {/* Animated background on hover */}
          <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-green-400 opacity-0 group-hover:opacity-20 transition-opacity" />
        </button>
      </div>

      {/* Output Section */}
      {prDescription && (
        <div className="bg-black/40 backdrop-blur-sm border border-cyan-900/30 rounded-lg p-6 shadow-2xl shadow-cyan-500/5 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <label className="text-cyan-400 flex items-center gap-2">
              <span className="text-green-400">{">"}</span> Generated PR
              Description
            </label>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 bg-cyan-900/30 hover:bg-cyan-900/50 border border-cyan-700/50 rounded text-sm text-cyan-400 hover:text-cyan-300 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>

          <MarkdownOutput content={prDescription} />
        </div>
      )}
    </div>
  );
}
