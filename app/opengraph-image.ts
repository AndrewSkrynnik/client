import { ImageResponse } from "next/og";
import { join } from "node:path";
import React from "react";

import { IconLogoOg } from "@/components/icons/IconLogoOg";

import { readFile } from "node:fs/promises";

// 👈 добавлен импорт логотипа

// Image metadata
export const alt = "rotazap.ru – интернет-магазин автозапчастей";
export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default async function Image(): Promise<ImageResponse> {
  const robotoFont = await readFile(
    join(process.cwd(), "public/assets/roboto.ttf")
  );

  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          fontSize: 40,
          background: "#18181b",
          color: "#fff",
          fontFamily: "Roboto",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-0.03em",
          gap: "28px"
        }
      },
      React.createElement(IconLogoOg, null),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            lineHeight: "1.2"
          }
        },
        [
          React.createElement("div", { key: "line1" }, "Интернет-магазин"),
          React.createElement(
            "div",
            { key: "line2" },
            " автомобильных запчастей rotazap.ru"
          )
        ]
      )
    ),
    {
      ...size,
      fonts: [
        {
          name: "Roboto",
          data: robotoFont,
          style: "normal",
          weight: 400
        }
      ]
    }
  );
}
