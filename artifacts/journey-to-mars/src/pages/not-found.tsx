import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="max-w-md w-full glass-panel p-8 text-center rounded-2xl border border-primary/20">
        <AlertCircle className="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-display font-bold text-white mb-2">404</h1>
        <h2 className="text-xl text-primary font-mono tracking-widest uppercase mb-6">Signal Lost</h2>
        <p className="text-muted-foreground mb-8">
          The orbital coordinates you requested could not be found in our database. The spacecraft may have drifted.
        </p>
        <Link href="/" className="inline-block px-8 py-3 bg-primary text-primary-foreground font-display font-bold tracking-widest uppercase rounded-full hover:bg-primary/90 transition-colors">
          Return to Mission Control
        </Link>
      </div>
    </div>
  );
}
