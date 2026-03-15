import { ImageResponse } from "next/og";
import { createServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function getDiagnosis(hours: number): string {
  if (hours <= 4) return "RECREATIONAL USER";
  if (hours <= 8) return "SUBSTANCE DEPENDENT";
  if (hours <= 14) return "CHRONIC ABUSER";
  return "TERMINAL CASE";
}

function getSeverityPercent(hours: number): number {
  return Math.min(100, Math.round((hours / 24) * 100));
}

function daysClean(lastRelapseAt: string): number {
  const diff = Date.now() - new Date(lastRelapseAt).getTime();
  return Math.floor(diff / 86400000);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const supabase = createServiceClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) {
    return new Response("Patient not found", { status: 404 });
  }

  const days = daysClean(profile.last_relapse_at);
  const diagnosis = getDiagnosis(profile.hours_per_day);
  const severity = getSeverityPercent(profile.hours_per_day);
  const caseNumber = `CASE-${profile.id.substring(0, 8).toUpperCase()}`;
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const barcodeBars = Array.from({ length: 30 }).map((_, i) => ({
    width: i % 3 === 0 ? "3px" : "1.5px",
    height: `${16 + ((i * 7) % 12)}px`,
  }));

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1A1410",
          color: "#F0EDE7",
          fontFamily: "monospace",
          padding: "40px 50px",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "14px",
                letterSpacing: "4px",
                color: "#D97757",
                textTransform: "uppercase",
              }}
            >
              Claudict Recovery Center
            </div>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", marginTop: "4px" }}
            >
              Patient record
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <div style={{ fontSize: "12px", color: "#8A8078" }}>
              {caseNumber}
            </div>
            <div style={{ fontSize: "12px", color: "#8A8078" }}>{dateStr}</div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "2px",
            backgroundColor: "#2E2820",
            marginBottom: "30px",
            width: "100%",
          }}
        />

        {/* Main content */}
        <div style={{ display: "flex", flex: "1", gap: "40px" }}>
          {/* Left side */}
          <div
            style={{ display: "flex", flexDirection: "column", flex: "1" }}
          >
            <div
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                marginBottom: "4px",
              }}
            >
              {profile.username}
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#8A8078",
                marginBottom: "24px",
              }}
            >
              Drug of choice: {profile.drug_of_choice}
            </div>

            {/* Diagnosis */}
            <div
              style={{
                fontSize: "12px",
                color: "#8A8078",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Diagnosis
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "#D97757",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              {diagnosis}
            </div>

            {/* Severity bar */}
            <div
              style={{
                fontSize: "12px",
                color: "#8A8078",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Severity
            </div>
            <div
              style={{
                display: "flex",
                width: "300px",
                height: "12px",
                backgroundColor: "#2E2820",
                borderRadius: "6px",
                overflow: "hidden",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: `${severity}%`,
                  height: "100%",
                  borderRadius: "6px",
                  background:
                    severity <= 30
                      ? "#10b981"
                      : severity <= 50
                        ? "#f59e0b"
                        : severity <= 70
                          ? "#f97316"
                          : "#ef4444",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#8A8078",
                marginBottom: "24px",
              }}
            >
              {profile.hours_per_day}h/day self-reported usage
            </div>

            {/* Prognosis */}
            <div
              style={{
                fontSize: "12px",
                color: "#8A8078",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Prognosis
            </div>
            <div
              style={{
                fontSize: "16px",
                color: "#ef4444",
                fontWeight: "bold",
              }}
            >
              RECOVERY UNLIKELY
            </div>
          </div>

          {/* Right side - big stats */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "300px",
            }}
          >
            <div
              style={{
                fontSize: "96px",
                fontWeight: "bold",
                color: "#D97757",
                lineHeight: "1",
              }}
            >
              {days}
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#8A8078",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginTop: "8px",
              }}
            >
              Days clean
            </div>
            <div
              style={{
                height: "2px",
                width: "60px",
                backgroundColor: "#D97757",
                margin: "16px 0",
              }}
            />
            <div
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#8A8078",
              }}
            >
              {profile.relapse_count}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#8A8078",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              Lifetime relapses
            </div>
          </div>
        </div>

        {/* Footer with barcode-like element */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: "20px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#8A8078" }}>
            claudict.com/patient/{profile.username}
          </div>
          {/* Fake barcode */}
          <div
            style={{ display: "flex", gap: "2px", alignItems: "flex-end" }}
          >
            {barcodeBars.map((bar, i) => (
              <div
                key={i}
                style={{
                  width: bar.width,
                  height: bar.height,
                  backgroundColor: "#8A8078",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
