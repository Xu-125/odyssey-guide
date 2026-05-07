import {
  IM_Fell_English,
  ZCOOL_XiaoWei,
  Noto_Serif_SC,
} from "next/font/google";
import "./globals.css";

const fellEnglish = IM_Fell_English({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-fell",
});

const zcoolXiaoWei = ZCOOL_XiaoWei({
  weight: ["400"],
  variable: "--font-zcool",
  display: "swap",
});

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["200", "300"],
  variable: "--font-noto-serif",
});

export const metadata = {
  title: "Odyssey · 你正在林中",
  description: "给 20 岁前后的迷茫，一面镜子、一个同路人、几条可走的路。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body
        className={`${fellEnglish.variable} ${zcoolXiaoWei.variable} ${notoSerif.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
