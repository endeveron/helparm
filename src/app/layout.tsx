import { Roboto, Montserrat_Alternates } from 'next/font/google';
import Script from 'next/script';

import { Providers } from 'components/Providers';
import { Navbar } from 'components/ui/nav/Navbar/Navbar';

export const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['cyrillic-ext'],
  display: 'swap',
});

export const montserrat = Montserrat_Alternates({
  weight: ['500', '700', '800'],
  style: ['normal'],
  subsets: ['cyrillic-ext'],
  display: 'swap',
});

import 'styles/index.scss';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="uk-UA" data-theme="light" className={roboto.className}>
      <head>
        <meta
          name="description"
          content="Корисна інформація українцям в Польщі. Житло, транспорт, працевлаштування, медицина, освіта, та інші важливі теми."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#edf2f7" />
        <meta property="og:title" content="Допомога українцям в Польщі" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://helparm.online/images/banner.jpg"
        />
        <meta property="og:url" content="https://helparm.online" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:description"
          content="Корисна інформація українцям в Польщі. Житло, працевлаштування, медицина, освіта, та інші важливі теми."
        />
        <meta property="og:site_name" content="HelpArm" />
        <meta
          name="twitter:image:alt"
          content="HelpArm - Допомога українцям в Польщі"
        />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JXKC3PBBEG"
        ></Script>
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-JXKC3PBBEG');
        `}
        </Script>
      </head>
      <body>
        <Providers>
          <div className="layout shadow--a">
            <div className="layout__content">{children}</div>
            <Navbar />
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
