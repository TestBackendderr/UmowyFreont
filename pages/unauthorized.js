import Link from "next/link";

export default function Custom404() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "#f8f9fa",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>403</h1>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        Dostęp zablokowany{" "}
      </h2>
      <p style={{ marginBottom: "2rem", color: "#666" }}>
        Sprawdź adres lub wróć na stronę główną.
      </p>
      <Link
        href="/dashboard"
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#0070f3",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Powrót na stronę główną
      </Link>
    </div>
  );
}
