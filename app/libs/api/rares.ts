import { NextResponse } from "next/server";

import axios from "@/libs/axios";

export async function GET() {
  try {
    const res = await axios.get("https://www.cbr-xml-daily.ru/daily_json.js");
    const valutes = res.data.Valute;
    const date = res.data.Date;

    const rates = {
      USD: valutes.USD.Value,
      EUR: valutes.EUR.Value,
      CNY: valutes.CNY.Value
    };

    return NextResponse.json({ rates, date });
  } catch (error) {
    console.error("Ошибка запроса к ЦБ РФ:", error);
    return NextResponse.json(
      { error: "Failed to fetch rates" },
      { status: 500 }
    );
  }
}
