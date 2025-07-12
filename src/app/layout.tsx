import '../styles/global.css';
import { Inter } from 'next/font/google';
import { LoginProvider } from '../context/LoginContext';
import ClientWrapper from '../components/shared/ClientWrapper';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        {/* Removed style and script for booknow-hide-footer to avoid hydration issues */}
      </head>
      <body>
        <LoginProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </LoginProvider>
      </body>
    </html>
  );
}
