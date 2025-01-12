import Script from 'next/script';
import '../styles.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://cloud.umami.is/script.js"
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
      ></Script>
      <Component {...pageProps} />
    </>
  );
}
