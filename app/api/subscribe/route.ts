import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
    const BEEHIIV_PUB_ID = process.env.BEEHIIV_PUB_ID;

    if (!BEEHIIV_API_KEY || !BEEHIIV_PUB_ID) {
      return NextResponse.json(
        { error: "Newsletter-API nicht konfiguriert." },
        { status: 500 }
      );
    }

    const { email, utm_medium } = await req.json();

    if (
      !email ||
      typeof email !== "string" ||
      email.length > 320 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json({ error: "Ungültige E-Mail-Adresse." }, { status: 400 });
    }

    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: "website",
          utm_medium: utm_medium || "newsletter_page",
        }),
      }
    );

    if (!res.ok) {
      console.error("Beehiiv error:", res.status);
      return NextResponse.json({ error: "Anmeldung fehlgeschlagen. Bitte versuche es erneut." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Subscribe error:", e);
    return NextResponse.json({ error: "Serverfehler. Bitte versuche es erneut." }, { status: 500 });
  }
}
