const ICONS = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.25" />
      <path d="m16 16 4 4" />
    </>
  ),
  grid: (
    <>
      <path d="M4 4h6v6H4z" />
      <path d="M14 4h6v6h-6z" />
      <path d="M4 14h6v6H4z" />
      <path d="M14 14h6v6h-6z" />
    </>
  ),
  list: (
    <>
      <path d="M8 6h12" />
      <path d="M8 12h12" />
      <path d="M8 18h12" />
      <path d="M4 6h.01" />
      <path d="M4 12h.01" />
      <path d="M4 18h.01" />
    </>
  ),
  heart: (
    <path d="M20.4 5.7a5.2 5.2 0 0 0-7.4 0L12 6.8l-1-1.1a5.2 5.2 0 0 0-7.4 7.4l1 1L12 21l7.4-6.9 1-1a5.2 5.2 0 0 0 0-7.4Z" />
  ),
  eye: (
    <>
      <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  "eye-off": (
    <>
      <path d="M3 3 21 21" />
      <path d="M10.6 6.4A10.6 10.6 0 0 1 12 6c6.1 0 9.5 6 9.5 6a16.5 16.5 0 0 1-4.1 4.5" />
      <path d="M6.1 6.2A16.2 16.2 0 0 0 2.5 12s3.4 6 9.5 6c1.3 0 2.5-.2 3.5-.6" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </>
  ),
  message: (
    <>
      <path d="M21 12a8.5 8.5 0 0 1-12.7 7.4L3 21l1.6-5.1A8.5 8.5 0 1 1 21 12Z" />
      <path d="M8.5 12h7" />
      <path d="M8.5 15h4.5" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 20h14" />
    </>
  ),
  edit: (
    <>
      <path d="M4 20h4l10.5-10.5a2.8 2.8 0 0 0-4-4L4 16v4Z" />
      <path d="m13.5 6.5 4 4" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M6 7l1 14h10l1-14" />
      <path d="M9 7V4h6v3" />
    </>
  ),
  logout: (
    <>
      <path d="M14 8V5a2 2 0 0 0-2-2H5v18h7a2 2 0 0 0 2-2v-3" />
      <path d="M9 12h12" />
      <path d="m17 8 4 4-4 4" />
    </>
  ),
  ruler: (
    <>
      <path d="M4 17 17 4l3 3L7 20l-3-3Z" />
      <path d="m14 7 3 3" />
      <path d="m11 10 2 2" />
      <path d="m8 13 3 3" />
    </>
  ),
  star: (
    <path d="m12 3 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.4 6.3 20.5l1.1-6.3-4.6-4.5 6.4-.9L12 3Z" />
  ),
  cotton: (
    <>
      <path d="M12 6.2c0-1.7 1.2-3.2 2.8-3.7" />
      <path d="M12 6.2c0-1.7-1.2-3.2-2.8-3.7" />
      <path d="M8.2 8.7a3.5 3.5 0 1 0 0 7h7.6a3.5 3.5 0 1 0 0-7" />
      <path d="M12 15.7v5.3" />
      <path d="M9.3 21h5.4" />
    </>
  ),
  loom: (
    <>
      <path d="M5 4h14v16H5z" />
      <path d="M8 4v16" />
      <path d="M12 4v16" />
      <path d="M16 4v16" />
      <path d="M5 8h14" />
      <path d="M5 12h14" />
    </>
  ),
  handmade: (
    <>
      <path d="M8 12.5 10 5a1.8 1.8 0 0 1 3.4.2l1.1 4.1" />
      <path d="M7 12.5h10" />
      <path d="M7.5 12.5 6 18a2 2 0 0 0 1.9 2.5h8.2A2 2 0 0 0 18 18l-1.5-5.5" />
      <path d="M10 9.5h4" />
    </>
  ),
  package: (
    <>
      <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z" />
      <path d="M12 21V12" />
      <path d="M3.5 7.5 12 12l8.5-4.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.4 2.9 8.4 7 10 4.1-1.6 7-5.6 7-10V6l-7-3Z" />
      <path d="m9.5 12 1.7 1.7L15 10" />
    </>
  ),
  mail: (
    <>
      <path d="M4 6h16v12H4z" />
      <path d="m4 8 8 6 8-6" />
    </>
  ),
  phone: (
    <>
      <path d="M7.5 4h3l1 4-2 1.5a14 14 0 0 0 5 5l1.5-2 4 1v3a2 2 0 0 1-2 2A16 16 0 0 1 6 6a2 2 0 0 1 1.5-2Z" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s6-5.6 6-11a6 6 0 1 0-12 0c0 5.4 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 1 1 8 0v3" />
    </>
  ),
  spark: (
    <>
      <path d="m12 3 1.3 4.2L17.5 8.5l-4.2 1.3L12 14l-1.3-4.2L6.5 8.5l4.2-1.3L12 3Z" />
      <path d="m18.5 15 .8 2.3 2.2.8-2.2.8-.8 2.3-.8-2.3-2.2-.8 2.2-.8.8-2.3Z" />
      <path d="m5.5 14 .8 2.1 2.2.8-2.2.8-.8 2.1-.8-2.1-2.2-.8 2.2-.8.8-2.1Z" />
    </>
  )
};

export default function Icon({ name, className = "", title = "" }) {
  return (
    <svg
      className={`icon ${className}`.trim()}
      viewBox="0 0 24 24"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {ICONS[name] || null}
    </svg>
  );
}
