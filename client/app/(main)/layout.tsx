// @ts-ignore
import '../globals.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { UploadProvider } from '../components/UploadContext';
import Upload from '../components/Upload';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <UploadProvider>
                    <Header />
                    <div className="container">
                        <Sidebar />
                        <main className="main-content">{children}</main>
                        <Upload />
                    </div>
                </UploadProvider>
            </body>
        </html>
    );
}
