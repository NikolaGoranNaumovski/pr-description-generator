import { Terminal, GitBranch } from "lucide-react";
import { PRGenerator } from "./components/PRGenerator";

export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black text-green-400">
      {/* Animated background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Glow effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="border-b border-green-900/30 bg-black/40 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Terminal className="w-8 h-8 text-green-400" />
                <div className="absolute inset-0 blur-md bg-green-400/50" />
              </div>
              <div>
                <h1 className="text-green-400 tracking-tight flex items-center gap-2">
                  PR Description Generator
                  <span className="text-cyan-400 text-sm">v1.0.0</span>
                </h1>
                <p className="text-green-600 text-sm">
                  {">"} Paste commits · Generate professional PR descriptions
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="min-w-screen overflow-auto">
          <main className="max-w-6xl mx-auto px-6 py-12 max-h-[calc(100vh-160px)]">
            <PRGenerator />
          </main>
        </div>

        {/* Footer */}
        <footer className="border-t border-green-900/30 bg-black/40 backdrop-blur-sm bottom-0 w-full absolute">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex items-center justify-center text-sm text-green-700">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                <span>Built for developers, by developers - in this case @nnaumovski :)</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
