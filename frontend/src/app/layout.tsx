
import './global.css';


export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

import ReactQueryProvider from './ReactQueryProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
