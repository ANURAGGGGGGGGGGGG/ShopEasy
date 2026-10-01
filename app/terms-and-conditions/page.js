import Link from "next/link";
import NavBar from "../../components/NavBar";
import SiteFooter from "../../components/SiteFooter";

const SECTIONS = [
  {
    title: "User agreement",
    body: "By accessing and using this website, you agree to comply with all applicable laws and regulations. You must not use our services for any unlawful or prohibited activities.",
  },
  {
    title: "Privacy policy",
    body: "We are committed to protecting your privacy. Any personal information collected will be used solely for order processing and will not be shared with third parties except as required by law.",
  },
  {
    title: "Payment and refunds",
    body: "Payments are processed securely. Refunds are subject to our refund policy. Please contact support for any payment-related queries.",
  },
  {
    title: "Changes to terms",
    body: "We reserve the right to update these terms and conditions at any time. Changes will be posted on this page and are effective immediately.",
  },
  {
    title: "Contact us",
    body: "If you have any questions about these terms, please contact us at support@example.com.",
  },
];

export default function TermsAndConditions() {
  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <NavBar />

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-5 py-10 md:px-8 md:py-14">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink"
        >
          ← Back to the shop
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
                The fine print
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
                Terms and conditions
              </h1>
              <p className="mt-5 max-w-[40ch] text-sm leading-relaxed text-ink-soft">
                Plain rules for using ShopEasy — this is a demo storefront, so
                nothing here constitutes a real commercial agreement.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-line">
              {SECTIONS.map((section, index) => (
                <section key={section.title} className="border-b border-line py-8">
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-ink-mute tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
                        {section.title}
                      </h2>
                      <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-ink-soft md:text-[15px]">
                        {section.body}
                      </p>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
