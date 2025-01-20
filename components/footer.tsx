export default function Footer() {
  return (
    <footer className="bg-background/60 border-t border-black dark:border-white text-slate-800 dark:text-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-5 justify-between items-center">
          <div className="flex items-center justify-center md:justify-start space-x-4">
            <a
              href="#"
              className="text-lg font-bold tracking-tight hover:text-primary"
            >
              MovieVerse
            </a>
            <span className="text-muted-foreground">© 2024</span>
          </div>
          <div className="flex items-center flex-wrap justify-center md:justify-end space-x-4 gap-3 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-500">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-500">
              Terms of Service
            </a>
            <a href="#" className="hover:text-slate-500">
              Contact Us
            </a>
          </div>
          <div className="flex items-center justify-center md:justify-end space-x-4 mt-4 md:mt-0">
            Made with ❤️ by{" "} Thathsara
          </div>
        </div>
      </div>
    </footer>
  );
}
