import './globals.css';
export const metadata = {
  title: 'how hackable are you? | divs',
  description: 'A visual concept for a closer look at what your connection gives away.'
};
export default function RootLayout({ children }) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html: `try{document.documentElement.dataset.theme=sessionStorage.getItem('hackable-theme')==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}`}} /></head><body>{children}</body></html>;
}
