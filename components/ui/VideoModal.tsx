"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title: string;
}

export function VideoModal({ isOpen, onClose, videoSrc, title }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isEmbed =
    videoSrc.includes("youtube.com") ||
    videoSrc.includes("youtu.be") ||
    videoSrc.includes("loom.com");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-base/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl transition-all duration-300 animate-in fade-in zoom-in-95"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <p className="font-display font-semibold tracking-tight text-text">
              {title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="rounded-full border border-border/80 px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
          >
            Esc [✕]
          </button>
        </div>

        {/* Video container with 16:9 ratio */}
        <div className="relative aspect-video w-full bg-black">
          {isEmbed ? (
            <iframe
              src={videoSrc}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <video
              src={videoSrc}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 h-full w-full object-contain"
            >
              Your browser does not support video playback.
            </video>
          )}
        </div>
      </div>
    </div>
  );
}
