"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}) {
  return <AccordionPrimitive.Root data-slot="accordion" className="space-y-4" {...props} />;
}

function AccordionItem({
  className,
  ...props
}) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "border-0 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg",
        className
      )}
      {...props} />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-2xl py-6 px-6 text-left text-base font-semibold transition-all duration-300 outline-none hover:text-primary focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180 group relative overflow-hidden",
          className
        )}
        {...props}>
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Content */}
        <span className="relative z-10">{children}</span>
        <ChevronDownIcon
          className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-all duration-300 group-hover:text-primary relative z-10" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all duration-300"
      {...props}>
      <div className={cn("pt-0 pb-6 px-6 relative z-10", className)}>
        {/* Subtle border indicator */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/10 to-transparent" />
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
