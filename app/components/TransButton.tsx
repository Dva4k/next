"use client";

import { Trans } from "react-i18next";
import { useRouter } from "next/navigation";

export default function TransButton() {
  const router = useRouter();

  return (
    <div style={{ marginTop: 30, padding: 20, background: "#f0f0f0", borderRadius: 8 }}>
      <Trans
        i18nKey="click_here"
        components={{
          1: (
            <button
              onClick={() => router.push("/register")}
              style={{
                background: "#4f46e5",
                color: "white",
                border: "none",
                borderRadius: 4,
                padding: "4px 12px",
                cursor: "pointer",
              }}
            >
              🔘 Вернуться к регистрации.
            </button>
          ),
        }}
      />
    </div>
  );
}