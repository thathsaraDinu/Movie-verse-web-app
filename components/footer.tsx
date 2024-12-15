export default function Footer() {
  return (
    <footer className="bg-background/80 border-t border-black dark:border-white text-black dark:text-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-5 justify-between items-center">
          <div className="flex items-center justify-center md:justify-start space-x-4">
            <a
              href="#"
              className="text-lg font-bold tracking-tight hover:text-primary"
            >
              MovieVerse
            </a>
            <span className="text-muted-foreground">© 2021</span>
          </div>
          <div className="flex items-center justify-center md:justify-end space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}