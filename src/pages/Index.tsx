import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.jpeg";
import { ArrowRight, ShoppingBag } from "lucide-react";
import About from "./About";
import Contact from "./Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-16">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 min-h-[80vh] flex justify-center flex-col px-8 md:px-20">
            <h4 className="text-2xl text-muted-foreground">Reuse your stuff ♻️</h4>
            <h1 className="font-dm-serif text-5xl md:text-7xl text-foreground mt-2">
              E-Commerce Store For Your College.
            </h1>
            <p className="font-dm-serif my-6 pl-5 border-l-muted-foreground border-l-[3px] text-xl text-muted-foreground">
              Sell, Rent or Buy stuff from your Friends and Faculties in your own
              college campus!
            </p>
            <div className="flex space-x-4">
              <Link to="/auth">
                <Button>
                  <span className="flex items-center">
                    Get Started &nbsp;
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button>
                  <span className="flex items-center">
                    Check Out The Store &nbsp;
                    <ShoppingBag className="w-4 h-4" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-[80vh] flex items-center overflow-hidden p-8">
            <img src={heroImg} className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover" alt="" />
          </div>
        </div>
      </section>
      <About />
      <Contact />
     

      {/* Footer */}
      <footer className="bg-background border-t-2 border-border">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <span className="text-2xl font-semibold font-josefin text-foreground">
                UniCircle
              </span>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-foreground uppercase">Resources</h2>
                <ul className="text-muted-foreground font-medium">
                  <li className="mb-4"><Link to="/marketplace" className="hover:underline">Store</Link></li>
                  <li><Link to="/map" className="hover:underline">Campus Map</Link></li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-foreground uppercase">Features</h2>
                <ul className="text-muted-foreground font-medium">
                  <li className="mb-4"><Link to="/chatbot" className="hover:underline">AI Chatbot</Link></li>
                  <li><Link to="/about" className="hover:underline">About</Link></li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-foreground uppercase">Legal</h2>
                <ul className="text-muted-foreground font-medium">
                  <li className="mb-4"><a href="#" className="hover:underline">Privacy Policy</a></li>
                  <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-border" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-muted-foreground">
              © 2026 UniCircle — NIILM University, Kaithal. All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
