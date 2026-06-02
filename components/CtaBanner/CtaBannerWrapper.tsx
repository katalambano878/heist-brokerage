"use client";

import { useState } from "react";
import { CtaBanner } from "@/components/CtaBanner/CtaBanner";
import { LeadModal } from "@/components/LeadModal/LeadModal";

export function CtaBannerWrapper() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CtaBanner onPrimaryClick={() => setOpen(true)} />
      <LeadModal
        key={open ? "open" : "closed"}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
