export const metadata = {
  title: "My Coding AI",
  description: "AI chatbot using Groq + Vercel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
