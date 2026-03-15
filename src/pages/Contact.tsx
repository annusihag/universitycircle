import React from 'react';
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.jpeg";
import { ArrowRight, ShoppingBag } from "lucide-react";

function Contact() {
  return (
    <div>
        <Navbar />
      <section className="py-20">
              <div className="text-center mb-12">
                <h1 className="font-dm-serif text-6xl text-foreground">Contact us</h1>
              </div>
              <div className="my-10">
                <div className="grid sm:grid-cols-2 items-start gap-14 p-8 mx-auto max-w-4xl bg-card shadow-lg rounded-md">
                  <div>
                    <h1 className="text-foreground text-3xl font-extrabold">Let's Talk</h1>
                    <p className="text-sm text-muted-foreground mt-4">
                      If you have any questions or want to get in touch, please fill out
                      the form below. We will try to respond as soon as possible.
                    </p>
                    <div className="mt-12">
                      <h2 className="text-foreground text-base font-bold">Email</h2>
                      <p className="text-sm text-primary mt-2">info@niilmuniversity.ac.in</p>
                    </div>
                    <div className="mt-8">
                      <h2 className="text-foreground text-base font-bold">Location</h2>
                      <p className="text-sm text-muted-foreground mt-2">NIILM University, Kaithal, Haryana 136027</p>
                    </div>
                  </div>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full rounded-md py-2.5 px-4 border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full rounded-md py-2.5 px-4 border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="Subject"
                      className="w-full rounded-md py-2.5 px-4 border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                    <textarea
                      placeholder="Message"
                      rows={6}
                      className="w-full rounded-md px-4 border border-input bg-background text-foreground text-sm pt-2.5 outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                    <Button type="button" className="w-full">
                      Send
                    </Button>
                  </form>
                </div>
              </div>
            </section>
    </div>
  )
}

export default Contact
