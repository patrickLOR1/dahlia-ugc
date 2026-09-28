export const metadata = {
  title: 'Dahlia Studio',
  description: 'Manage DAHLIA portfolio content',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
