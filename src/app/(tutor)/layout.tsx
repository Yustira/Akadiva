export default function TutorLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <main>{children}</main>
            </body>
        </html>
    )
}