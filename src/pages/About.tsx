import React from "react";
import aboutImg from "../assets/about.webp";
import Nav from "../components/Navbar"

const About = () => {
  return (
    <>
    <Nav />
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-dm-serif text-6xl text-foreground">About us</h1>
          </div>
          <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                  <h6 className="text-muted-foreground text-base font-normal leading-relaxed">
                    About Us
                  </h6>
                  <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                    <h2 className="text-foreground text-4xl font-bold font-dm-serif leading-normal lg:text-start text-center">
                      The Tale of Our Achievement Story
                    </h2>
                    <p className="text-muted-foreground text-base font-normal leading-relaxed lg:text-start text-center">
                      UniCircle is a dedicated marketplace designed exclusively
                      for college communities. It simplifies buying, selling, and
                      renting within campuses, ensuring secure transactions and a
                      seamless user experience. Built for NIILM University, Kaithal — focused on trust, sustainability,
                      and collaboration.
                    </p>
                  </div>
                </div>
                <div className="w-full flex-col justify-center items-start gap-6 flex">
                  <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                    <div className="w-full h-full p-3.5 rounded-xl border border-border hover:border-muted-foreground transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-foreground text-2xl font-bold leading-9">3+ Years</h4>
                      <p className="text-muted-foreground text-base font-normal leading-relaxed">
                        Connecting College Communities
                      </p>
                    </div>
                    <div className="w-full h-full p-3.5 rounded-xl border border-border hover:border-muted-foreground transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-foreground text-2xl font-bold leading-9">1000+ Transactions</h4>
                      <p className="text-muted-foreground text-base font-normal leading-relaxed">
                        Ensuring Secure and Seamless Transactions
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                    <div className="w-full p-3.5 rounded-xl border border-border hover:border-muted-foreground transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-foreground text-2xl font-bold leading-9">5+ Awards</h4>
                      <p className="text-muted-foreground text-base font-normal leading-relaxed">
                        Recognizing Excellence and Innovation
                      </p>
                    </div>
                    <div className="w-full h-full p-3.5 rounded-xl border border-border hover:border-muted-foreground transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                      <h4 className="text-foreground text-2xl font-bold leading-9">5000+ Users</h4>
                      <p className="text-muted-foreground text-base font-normal leading-relaxed">
                        Building a Strong and Vibrant Community
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:justify-start justify-center items-start flex">
              <div className="sm:w-[564px] w-full sm:h-[500px] h-full sm:bg-muted rounded-3xl sm:border border-border relative">
                <img
                  className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop"
                  alt="About us"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
