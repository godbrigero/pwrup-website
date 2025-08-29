"use client";

import { useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { NavMenuLinks } from "@/components/NavMenuLinks";

export function NavMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <LazyMotion features={domAnimation} strict>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <div className="fixed top-4 right-4 z-50">
          <Dialog.Trigger asChild>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              className="h-10 w-10 rounded-full cursor-pointer bg-white/10 hover:bg-white/15 text-white grid place-items-center backdrop-blur border border-white/20"
            >
              <span className="sr-only">Menu</span>
              <div className="relative h-4 w-5">
                <m.span
                  className="absolute left-0 top-0 h-0.5 w-full bg-white"
                  animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
                <m.span
                  className="absolute left-0 top-1/2 -mt-0.5 h-0.5 w-full bg-white"
                  animate={{ opacity: open ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <m.span
                  className="absolute left-0 bottom-0 h-0.5 w-full bg-white"
                  animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </div>
            </button>
          </Dialog.Trigger>

          <AnimatePresence>
            {open ? (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild>
                  <m.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                </Dialog.Overlay>
                <Dialog.Content asChild>
                  <m.nav
                    aria-label="Main"
                    className="fixed top-0 right-0 h-full w-[80vw] max-w-sm bg-zinc-900/95 border-l border-white/10 text-white p-6"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-lg font-semibold">Menu</span>
                      <Dialog.Close asChild>
                        <button className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/20 cursor-pointer">
                          Close
                        </button>
                      </Dialog.Close>
                    </div>
                    <NavMenuLinks onNavigate={close} />
                  </m.nav>
                </Dialog.Content>
              </Dialog.Portal>
            ) : null}
          </AnimatePresence>
        </div>
      </Dialog.Root>
    </LazyMotion>
  );
}
