const Footer = () => {
    return (
        <footer className="bg-base-300 text-base-content">
            <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3 text-center md:text-left">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold mb-2">Dropify</h2>
                    <p className="text-sm text-gray-500">
                        A modern digital marketplace for creators and businesses.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a className="link link-hover">Home</a></li>
                        <li><a className="link link-hover">About</a></li>
                        <li><a className="link link-hover">Contact</a></li>
                        <li><a className="link link-hover">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="font-semibold mb-3">Connect</h3>
                    <div className="flex justify-center md:justify-start gap-4">
                        <a className="btn btn-circle btn-outline btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.56c-.89.39-1.85.66-2.86.78a4.92 4.92 0 0 0 2.16-2.72c-.95.56-2 .97-3.12 1.19a4.9 4.9 0 0 0-8.35 4.47A13.9 13.9 0 0 1 1.67 3.15a4.88 4.88 0 0 0 1.52 6.54 4.87 4.87 0 0 1-2.22-.61v.06a4.9 4.9 0 0 0 3.93 4.8 4.93 4.93 0 0 1-2.21.08 4.9 4.9 0 0 0 4.57 3.4A9.83 9.83 0 0 1 0 19.54 13.9 13.9 0 0 0 7.55 22c9.05 0 14-7.5 14-14v-.64A10 10 0 0 0 24 4.56z" />
                            </svg>
                        </a>

                        <a className="btn btn-circle btn-outline btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 2.86 8.15 6.84 9.47.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A9.98 9.98 0 0 0 22 12c0-5.5-4.46-9.96-10-9.96z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-base-content/10 py-4 text-center text-sm">
                <p>
                    © {new Date().getFullYear()} Dropify Limited. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
