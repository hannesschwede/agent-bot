import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = { title: "Datenschutzerklärung | Agent Bot" };

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <h1 className="text-3xl font-black uppercase mb-8">Datenschutzerklärung</h1>
        <div className="space-y-8 text-sm leading-relaxed text-black/80">
          <section><h2 className="font-bold text-black mb-2">1. Verantwortlicher</h2><p>Verantwortlicher für die Datenverarbeitung auf dieser Website ist:</p><p className="mt-2">Hannes Schwede<br />Sömmeringstraße 15<br />50823 Köln<br />E-Mail: <a href="mailto:hannes@agent-bot.de" className="text-accent hover:underline">hannes@agent-bot.de</a></p></section>
          <section><h2 className="font-bold text-black mb-2">2. Allgemeine Hinweise zur Datenverarbeitung</h2><p>Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website, unserer Inhalte und Leistungen sowie zur Kommunikation mit Ihnen erforderlich ist. Die Verarbeitung erfolgt auf Grundlage der DSGVO und des BDSG.</p></section>
          <section><h2 className="font-bold text-black mb-2">3. Hosting und Server-Logfiles</h2><p>Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA gehostet. Beim Aufruf unserer Website werden durch den Hosting-Anbieter automatisch Informationen in sogenannten Server-Logfiles erhoben (z.B. IP-Adresse, Datum und Uhrzeit des Abrufs, Browsertyp, Betriebssystem, Referrer-URL). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technischen Bereitstellung und Sicherheit der Website).</p><p className="mt-2">Da Vercel seinen Sitz in den USA hat, können Daten in die USA übertragen werden. Vercel nimmt am EU-U.S. Data Privacy Framework teil.</p></section>
          <section><h2 className="font-bold text-black mb-2">4. Kontaktaufnahme per E-Mail</h2><p>Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben (E-Mail-Adresse, Inhalt der Nachricht und ggf. weitere von Ihnen übermittelte Daten) zur Bearbeitung der Anfrage verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um vorvertragliche oder vertragliche Anfragen geht, im Übrigen Art. 6 Abs. 1 lit. f DSGVO.</p></section>
          <section><h2 className="font-bold text-black mb-2">5. Newsletter / E-Mail-Kommunikation (Cheat Sheet & Updates)</h2><p>Wenn Sie das angebotene Cheat Sheet anfordern, verarbeiten wir Ihre E-Mail-Adresse, um Ihnen das PDF zuzusenden und Ihnen anschließend weitere E-Mails mit Inhalten zu macOS-Entwicklung, Docker und AI sowie Hinweise auf passende Angebote zu schicken. Rechtsgrundlage ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.</p><p className="mt-2">Die Anmeldung erfolgt im Double-Opt-in-Verfahren: Sie erhalten nach der Anmeldung eine E-Mail, in der Sie um Bestätigung Ihrer Anmeldung gebeten werden. Erst nach dieser Bestätigung wird Ihre E-Mail-Adresse in den Verteiler aufgenommen.</p><p className="mt-2">Ihre Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen, etwa über den Abmeldelink in jeder E-Mail oder durch eine Nachricht an die oben genannte Kontaktadresse.</p><p className="mt-2">Für den Versand und die Verwaltung der E-Mails nutzen wir den Dienst Beehiiv Inc., 228 Park Ave S, Suite 73498, New York, NY 10003, USA. Dies erfolgt im Rahmen einer Auftragsverarbeitung nach Art. 28 DSGVO. Da Beehiiv seinen Sitz in den USA hat, können Daten in die USA übertragen werden.</p></section>
          <section><h2 className="font-bold text-black mb-2">6. Cookies und vergleichbare Technologien</h2><p>Diese Website verwendet keine Cookies zu Tracking- oder Analysezwecken. Es werden ausschließlich technisch notwendige Cookies eingesetzt, soweit diese für die Funktion der Website erforderlich sind.</p></section>
          <section><h2 className="font-bold text-black mb-2">7. Analyse- und Tracking-Tools</h2><p>Auf dieser Website werden derzeit keine Analyse- oder Tracking-Tools eingesetzt.</p></section>
          <section><h2 className="font-bold text-black mb-2">8. Speicherdauer</h2><p>Wir speichern personenbezogene Daten grundsätzlich nur so lange, wie es für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.</p></section>
          <section><h2 className="font-bold text-black mb-2">9. Ihre Rechte</h2><p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit. Sie können erteilte Einwilligungen jederzeit widerrufen und der Verarbeitung widersprechen, soweit diese auf Art. 6 Abs. 1 lit. f DSGVO beruht.</p><p className="mt-2">Zur Ausübung Ihrer Rechte wenden Sie sich an die oben genannte Kontaktadresse. Zudem haben Sie das Recht, eine Beschwerde bei einer Datenschutzaufsichtsbehörde einzureichen.</p></section>
          <section><h2 className="font-bold text-black mb-2">10. Änderungen dieser Datenschutzerklärung</h2><p>Wir behalten uns vor, diese Datenschutzerklärung künftig zu ändern, damit sie stets den aktuellen rechtlichen Anforderungen entspricht. Für Ihren erneuten Besuch gilt dann die jeweils aktuelle Version.</p></section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
