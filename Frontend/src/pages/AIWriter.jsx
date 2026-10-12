import { useState } from "react";
import { Sparkles, Copy, Check, LoaderCircle } from "lucide-react";
import { generateText } from "../services/aiService";

export default function AIWriter() {
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState("blog");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError("");
    setResult("");

    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setLoading(true);

    try {
      const generatedText = await generateText(prompt.trim(), contentType);
      setResult(generatedText);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "AI content generate nahi ho saka."
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
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
            <Sparkles size={25} />
          </div>

          <h1 className="text-3xl font-bold">AI Writer</h1>

          <p className="mt-2 text-slate-400">
            Generate content using your AI backend.
          </p>
        </div>

        <form
          onSubmit={handleGenerate}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8"
        >
          <label className="mb-2 block text-sm font-medium">
            Content Type
          </label>

          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="mb-6 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-violet-500"
          >
            <option value="blog">Blog Post</option>
            <option value="email">Professional Email</option>
            <option value="social">Social Media Post</option>
            <option value="description">Product Description</option>
            <option value="general">General Content</option>
          </select>

          <label className="mb-2 block text-sm font-medium">
            What would you like to write?
          </label>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Write a blog about the benefits of learning programming..."
            rows={6}
            maxLength={5000}
            required
            className="w-full resize-y rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none placeholder:text-slate-500 focus:border-violet-500"
          />

          <div className="mt-2 text-right text-xs text-slate-500">
            {prompt.length}/5000 characters
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {loading ? (
              <>
                <LoaderCircle size={18} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Content
              </>
            )}
          </button>
        </form>

        {result && (
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Generated Content</h2>

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