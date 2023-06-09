import "./reset.css";
import "./global.css";
import styles from "./layout.module.css";
import Providers from "@/stores/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Next로 만든 투두리스트",
  description: "SEO까지 최적화된 Next 투두리스트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <body className={styles.body_wrap}>
        <Header />
        <main className={styles.body_main}>
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
