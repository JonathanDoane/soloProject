import './globals.css'
import Provider from './components/provider'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-blue-200'>
        <Provider>
          <main>{children}</main>
        </Provider>
        </body>
    </html>
  )
}
