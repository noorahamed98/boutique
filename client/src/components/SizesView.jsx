import ScrollReveal from "./ScrollReveal";
import { createGeneralInquiryMessage, createWhatsAppLink } from "../lib/storefront";

const SIZE_ROWS = [
  ["XS", "14", "32", "26", "35"],
  ["S", "14", "34", "28", "37"],
  ["M", "15", "36", "30", "39"],
  ["L", "16", "39", "33", "42"],
  ["XL", "16", "42", "36", "45"],
  ["XXL", "17", "45", "39", "48"],
  ["XXXL", "17", "48", "42", "51"]
];

const FIT_GUIDE = [
  "Length may vary according to the design/pattern.",
  "Size can vary by 2-3cm because they are measured by hands.",
  "Sneha's Boutique pieces are made from premium fabrics which may shrink a little.",
  "Every outfit contains inner margins to alter according to your perfect fit.",
  "XXL and XXXL size are available upon customization."
];

const BODY_MARKERS = [
  { id: 1, label: "SHOULDER", top: "22%", lineWidth: "78px" },
  { id: 2, label: "BUST", top: "40%", lineWidth: "88px" },
  { id: 3, label: "WAIST", top: "58%", lineWidth: "86px" },
  { id: 4, label: "HIP", top: "76%", lineWidth: "84px" }
];

export default function SizesView({ onTrackInquiry }) {
  return (
    <section className="size-chart-display wix-page-shell">
      <ScrollReveal className="size-chart-sheet" direction="up">
        <header className="size-chart-sheet-header">
          <div className="size-chart-brand-badge" aria-hidden="true">
            <img src="/assets/home-references/brand-monogram.png" alt="" />
          </div>
          <h1>SNEHA&apos;S BOUTIQUE</h1>
          <p>
            <span aria-hidden="true" />
            SIZE CHART
            <span aria-hidden="true" />
          </p>
        </header>

        <div className="size-chart-sheet-card">
          <h2 className="size-chart-sheet-title">SIZE CHART</h2>

          <div className="size-chart-sheet-grid">
            <div className="size-chart-table-shell">
              <table className="size-chart-sheet-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>To fit Shoulder</th>
                    <th>To fit Bust</th>
                    <th>To fit Waist</th>
                    <th>To fit Hip</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_ROWS.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell) => (
                        <td key={`${row[0]}-${cell}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="size-chart-sheet-side">
              <div className="size-chart-figure-wrap" aria-hidden="true">
                <svg className="size-chart-figure-art" viewBox="0 0 220 340" role="presentation">
                  <circle cx="110" cy="44" r="28" />
                  <path d="M85 78c-25 12-41 42-41 74v55c0 26 18 48 43 55l-14 60h21l17-53h-1l17 53h21l-14-60c25-7 43-29 43-55v-55c0-32-16-62-41-74z" />
                  <path d="M74 116L42 212" fill="none" strokeWidth="16" strokeLinecap="round" />
                  <path d="M146 116l32 96" fill="none" strokeWidth="16" strokeLinecap="round" />
                  <path d="M93 262l-24 70" fill="none" strokeWidth="18" strokeLinecap="round" />
                  <path d="M127 262l24 70" fill="none" strokeWidth="18" strokeLinecap="round" />
                </svg>

                {BODY_MARKERS.map((item) => (
                  <div
                    key={item.label}
                    className="size-chart-figure-marker"
                    style={{ top: item.top, "--marker-width": item.lineWidth }}
                  >
                    <span className="size-chart-marker-dot">{item.id}</span>
                    <span className="size-chart-marker-dash" />
                    <span className="size-chart-marker-label">{item.label}</span>
                  </div>
                ))}
              </div>

              <ul className="size-chart-note-list">
                {FIT_GUIDE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="size-chart-display-actions">
        <a
          className="wix-inquire-btn inline"
          href={createWhatsAppLink(createGeneralInquiryMessage())}
          target="_blank"
          rel="noreferrer"
          onClick={onTrackInquiry}
        >
          Send Measurements on WhatsApp
        </a>
      </div>
    </section>
  );
}
