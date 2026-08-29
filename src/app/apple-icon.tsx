import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#DC1F26",
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 999,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 16,
                  background: "#DC1F26",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              />
              <div
                style={{
                  width: 58,
                  height: 16,
                  background: "#DC1F26",
                  borderRadius: 6,
                  marginTop: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingBottom: 2,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: "#1A0A0C",
                  }}
                />
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: "#1A0A0C",
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "22px solid transparent",
              borderRight: "22px solid transparent",
              borderTop: "34px solid #ffffff",
              marginTop: -6,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
