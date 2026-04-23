import Icon from "./Icon";
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
  "Length may vary according to the design pattern.",
  "Size can vary slightly because these are measured by hand.",
  "Sneha's Boutique pieces are made from premium fabrics which may shrink a little.",
  "Every outfit contains inner margins to alter according to your perfect fit."
];

export default function SizesView() {
  return (
    <section className="size-chart-page">
      <div className="size-chart-header">
        <img src="/assets/nav-logo.png" alt="Snehas Boutique logo" />
        <div className="size-chart-brand">Sneha&apos;s Boutique</div>
        <div className="size-chart-subtitle">Size Chart</div>
      </div>

      <div className="size-chart-card">
        <div className="size-chart-table-wrap">
          <h2>Size Chart</h2>
          <table className="tbl size-table">
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

        <aside className="size-guide-panel">
          <div className="silhouette-card">
            <div className="silhouette-shape" />
            <div className="silhouette-tags">
              <span>Shoulder</span>
              <span>Bust</span>
              <span>Waist</span>
              <span>Hip</span>
            </div>
          </div>

          <ul className="fit-guide-list">
            {FIT_GUIDE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <a className="measure-card size-card-cta" href={createWhatsAppLink(createGeneralInquiryMessage())} target="_blank" rel="noreferrer">
            <Icon name="ruler" />
            <strong>Need fit help?</strong>
            <span>Send measurements on WhatsApp</span>
          </a>
        </aside>
      </div>
    </section>
  );
}
