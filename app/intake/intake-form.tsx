"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { submitIntake } from "./actions";

const DRUGS = [
  { value: "Claude Opus", label: "Opus", desc: "The hard stuff", icon: "◆", iconColor: "text-accent", reaction: "Critical. Straight to the intensive care unit." },
  { value: "Claude Sonnet", label: "Sonnet", desc: "Gateway drug", icon: "♦", iconColor: "text-amber-500", reaction: "Classic gateway pattern. They all say they can handle Sonnet." },
  { value: "Claude Haiku", label: "Haiku", desc: "Microdosing", icon: "•", iconColor: "text-emerald-500", reaction: "\"I only microdose.\" That's what they all say before moving to Opus." },
  { value: "All of the above", label: "All of them", desc: "Severe polysubstance", icon: "✕", iconColor: "text-red-500", reaction: "Polysubstance abuse. The most dangerous profile in our database." },
];

const HOUR_LEVELS = [
  { min: 1, max: 4, label: "Recreational", color: "text-emerald-500", reaction: "Recreational use. Sure. We'll revisit this in a week." },
  { min: 5, max: 8, label: "Concerning", color: "text-amber-500", reaction: "Your employer should be notified. If you still have one." },
  { min: 9, max: 14, label: "Severe", color: "text-orange-500", reaction: "You are spending more time with Claude than with any human being in your life." },
  { min: 15, max: 24, label: "Terminal", color: "text-red-500", reaction: "We are legally required to notify your next of kin." },
];

function getHourLevel(hours: number) {
  return HOUR_LEVELS.find((l) => hours >= l.min && hours <= l.max) || HOUR_LEVELS[HOUR_LEVELS.length - 1];
}

const TABS_OPTIONS = [
  { value: "1-5", label: "1 to 5", reaction: "Normal range. Suspicious, but normal." },
  { value: "6-20", label: "6 to 20", reaction: "You're not even trying to hide it anymore." },
  { value: "21-50", label: "21 to 50", reaction: "Your browser is crying for help." },
  { value: "50+", label: "50+", reaction: "At this point your RAM is the one with the addiction." },
];

type Step = 1 | 2 | 3 | 4 | 5;

export function IntakeForm({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [step, setStep] = useState<Step>(1);
  const [username, setUsername] = useState("");
  const [drug, setDrug] = useState("");
  const [hours, setHours] = useState(8);
  const [concerned, setConcerned] = useState(false);
  const [tabs, setTabs] = useState("");
  const [reaction, setReaction] = useState("");
  const [showReaction, setShowReaction] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const level = getHourLevel(hours);
  const percentage = ((hours - 1) / 23) * 100;

  // Increment patient counter on first visit
  useEffect(() => {
    if (!sessionStorage.getItem("intake_counted")) {
      sessionStorage.setItem("intake_counted", "1");
      fetch("/api/intake-started", { method: "POST" }).catch(() => {});
    }
  }, []);

  // Auto-submit after OAuth return
  useEffect(() => {
    const pending = sessionStorage.getItem("intake_pending");
    if (pending && isLoggedIn) {
      sessionStorage.removeItem("intake_pending");
      setSubmitting(true);
      const data = JSON.parse(pending);
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("drug_of_choice", data.drug);
      formData.append("hours_per_day", String(data.hours));
      if (data.concerned) formData.append("anyone_concerned", "on");
      submitIntake(formData);
    }
  }, [isLoggedIn]);

  function triggerReaction(text: string, nextStep: Step) {
    setReaction(text);
    setShowReaction(true);
    setTimeout(() => {
      setShowReaction(false);
      setTimeout(() => setStep(nextStep), 300);
    }, 1800);
  }

  function selectDrug(d: typeof DRUGS[0]) {
    setDrug(d.value);
    triggerReaction(d.reaction, 3);
  }

  function confirmHours() {
    triggerReaction(level.reaction, 4);
  }

  function selectTabs(t: typeof TABS_OPTIONS[0]) {
    setTabs(t.value);
    triggerReaction(t.reaction, 5);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!isLoggedIn) {
      e.preventDefault();
      // Save quiz data, then trigger OAuth
      sessionStorage.setItem("intake_pending", JSON.stringify({
        username: username.trim(),
        drug,
        hours,
        concerned,
      }));
      const supabase = createClient();
      supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    }
    // If logged in, let the form submit normally to the server action
  }

  if (submitting) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-muted font-mono animate-pulse">
          Processing your admission...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-[10px] font-mono text-muted/50 mb-1.5">
          <span>Assessment {step}/5</span>
          <span>{step === 5 ? "Diagnosis" : "In progress"}</span>
        </div>
        <div className="h-1 rounded-full bg-border overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Content area: reaction overlay + steps crossfade in place */}
      <div className="relative min-h-[280px]">
        {/* Reaction overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            showReaction ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <p className="text-sm text-accent font-mono italic max-w-sm text-center">
            {reaction}
          </p>
        </div>

        {/* Steps */}
        <div className={`transition-opacity duration-300 ${showReaction ? "opacity-0 pointer-events-none" : "opacity-100"}`}>

        {/* Step 1: Username */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-up">
            <div>
              <h2 className="text-sm font-medium mb-1">Patient alias</h2>
              <p className="text-xs text-muted mb-3">Choose a name for your file. This is permanent.</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your-username"
                pattern="[a-zA-Z0-9_-]+"
                minLength={3}
                maxLength={30}
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <p className="text-xs text-muted mt-1">Letters, numbers, hyphens, underscores only.</p>
            </div>
            <Button
              onClick={() => {
                if (username.trim().length >= 3 && /^[a-zA-Z0-9_-]+$/.test(username.trim())) {
                  setStep(2);
                }
              }}
              disabled={username.trim().length < 3 || !/^[a-zA-Z0-9_-]+$/.test(username.trim())}
              className="w-full"
            >
              Proceed
            </Button>
          </div>
        )}

        {/* Step 2: Drug of choice */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-up">
            <div>
              <h2 className="text-sm font-medium mb-1">What substance brought you here?</h2>
              <p className="text-xs text-muted mb-3">Be honest. We can tell anyway.</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DRUGS.map((d) => (
                <button
                  key={d.value}
                  onClick={() => selectDrug(d)}
                  className="rounded-lg border border-border p-3 transition-all duration-200 hover:border-accent/30 hover:bg-accent/5 text-left"
                >
                  <div className={`text-lg mb-1 ${d.iconColor}`}>{d.icon}</div>
                  <p className="text-sm font-medium">{d.label}</p>
                  <p className="text-xs text-muted">{d.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Hours per day */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-up">
            <div>
              <h2 className="text-sm font-medium mb-1">Daily usage</h2>
              <p className="text-xs text-muted mb-3">How many hours per day do you use? Lying is futile.</p>
            </div>

            <div className="py-4">
              <div className="text-center mb-4">
                <span className={`font-mono text-4xl font-bold ${level.color}`}>{hours}</span>
                <span className="text-sm text-muted ml-1">hours/day</span>
                <p className={`text-xs font-medium uppercase tracking-wider mt-1 ${level.color}`}>
                  {level.label}
                </p>
              </div>

              <div className="relative mt-2">
                <div className="relative h-2 rounded-full bg-border overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-150"
                    style={{
                      width: `${percentage}%`,
                      background: "linear-gradient(90deg, #10b981 0%, #f59e0b 40%, #f97316 70%, #ef4444 100%)",
                    }}
                  />
                </div>
                <input
                  type="range"
                  min={1}
                  max={24}
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 shadow-md pointer-events-none transition-all duration-150"
                  style={{
                    left: `calc(${percentage}% - 10px)`,
                    borderColor: hours <= 4 ? "#10b981" : hours <= 8 ? "#f59e0b" : hours <= 14 ? "#f97316" : "#ef4444",
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-muted">
                <span>1h</span>
                <span>8h</span>
                <span>16h</span>
                <span>24h</span>
              </div>
            </div>

            <Button onClick={confirmHours} className="w-full">
              Confirm dosage
            </Button>
          </div>
        )}

        {/* Step 4: Concern + tabs */}
        {step === 4 && (
          <div className="space-y-5 animate-fade-up">
            <div>
              <h2 className="text-sm font-medium mb-1">Social assessment</h2>
              <p className="text-xs text-muted mb-4">Two final questions for your file.</p>
            </div>

            <label className="flex items-start gap-3 p-3 rounded-md border border-border cursor-pointer hover:border-accent/30 transition-colors">
              <input
                type="checkbox"
                checked={concerned}
                onChange={(e) => setConcerned(e.target.checked)}
                className="mt-0.5 accent-accent"
              />
              <div>
                <span className="text-sm">Has anyone expressed concern about your usage?</span>
                <span className="block text-xs text-muted mt-0.5">
                  Partners, colleagues, your dog who no longer recognizes you.
                </span>
              </div>
            </label>

            <div>
              <p className="text-sm font-medium mb-2">How many browser tabs are open right now?</p>
              <div className="grid grid-cols-2 gap-2">
                {TABS_OPTIONS.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => selectTabs(t)}
                    className="rounded-lg border border-border p-3 transition-all duration-200 hover:border-accent/30 hover:bg-accent/5 text-left"
                  >
                    <p className="text-sm font-medium font-mono">{t.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Diagnosis + submit */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-up">
            <div>
              <h2 className="text-xs uppercase tracking-[3px] text-accent mb-3">Clinical diagnosis</h2>
            </div>

            <div className="rounded-lg border border-accent/30 bg-accent/5 p-5 font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted">Patient:</span>
                <span className="text-text font-bold">{username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Substance:</span>
                <span className="text-text">{drug}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Daily usage:</span>
                <span className={level.color}>{hours}h/day ({level.label})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Social support:</span>
                <span className="text-text">{concerned ? "Eroded" : "Unaware (worse)"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Browser tabs:</span>
                <span className="text-text">{tabs}</span>
              </div>
              <div className="border-t border-accent/20 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-muted">Prognosis:</span>
                  <span className="text-accent font-bold">
                    {hours >= 15 ? "Terminal" : hours >= 9 ? "Poor" : hours >= 5 ? "Guarded" : "Cautiously pessimistic"}
                  </span>
                </div>
              </div>
            </div>

            <form ref={formRef} action={submitIntake} onSubmit={handleSubmit}>
              <input type="hidden" name="username" value={username.trim()} />
              <input type="hidden" name="drug_of_choice" value={drug} />
              <input type="hidden" name="hours_per_day" value={hours} />
              {concerned && <input type="hidden" name="anyone_concerned" value="on" />}
              <Button type="submit" className="w-full">
                {isLoggedIn ? "Confirm admission" : "Sign in with GitHub to confirm"}
              </Button>
            </form>

            <p className="text-[10px] text-muted/50 text-center font-mono">
              By confirming, you acknowledge that recovery is statistically unlikely.
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
