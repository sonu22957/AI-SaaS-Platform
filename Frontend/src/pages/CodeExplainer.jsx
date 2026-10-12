import { useState } from "react";
import { Code2, Copy, Check, LoaderCircle, Sparkles } from "lucide-react";
import { generateText } from "../services/aiService";

export default function CodeExplainer() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExplain = async (e) => {
    e.preventDefault();
    setError("");
    setResult("");

    if (!code.trim()) {
      setError("Please enter some code first.");
      return;
    }

    setLoading(true);

    try {
      const explanation = await generateText(
        `Explain the following ${language} code in simple English. Describe what it does, explain the important parts step by step, and mention any potential issues.\n\nCode:\n${code}`,
        "general"
      );
      setResult(explanation);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Code explain nahi ho saka."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Copy failed. Please copy the text manually.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
            <Code2 size={25} />
          </div>

          <h1 className="text-3xl font-bold">Code Explainer</h1>

          <p className="mt-2 text-slate-400">
            Paste your code and let AI explain how it works.
          </p>
        </div>

        <form
          onSubmit={handleExplain}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8"
        >
          <label className="mb-2 block text-sm font-medium">
            Programming Language
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mb-6 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-cyan-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="typescript">TypeScript</option>
            <option value="html-css">HTML / CSS</option>
            <option value="sql">SQL</option>
          </select>

          <label className="mb-2 block text-sm font-medium">
            Your Code
          </label>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`// Paste your ${language} code here...`}
            rows={12}
            maxLength={15000}
            required
            spellCheck={false}
            className="w-full resize-y rounded-lg border border-slate-700 bg-slate-950 px-4 py-4 font-mono text-sm leading-6 outline-none placeholder:text-slate-600 focus:border-cyan-500"
          />

          <p className="mt-2 text-right text-xs text-slate-500">
            {code.length}/15000 characters
          </p>

          {error && (
            <p className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 font-semibold transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {loading ? (
              <>
                <LoaderCircle size={18} className="animate-spin" />
                Explaining...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Explain Code
              </>
            )}
          </button>
        </form>

        {result && (
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Code Explanation</h2>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="whitespace-pre-wrap break-words leading-7 text-slate-300">
              {result}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}