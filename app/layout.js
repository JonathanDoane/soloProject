import './globals.css'
import Provider from './components/provider'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main>{children}</main>
        </Provider>
        </body>
    </html>
  )
}
