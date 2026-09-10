import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getPrisma } from "@/lib/prisma";

const requestSchema = z.object({
  solutionType: z.string().min(1),
  descriptionText: z.string().min(10),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  features: z.array(z.string()).optional().default([]),
  contactName: z.string().min(2),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  privacyAccepted: z.literal(true),
});

function generateReferenceNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NX-${stamp}-${rand}`;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed", details: parsed.error.flatten() }, { status: 422 });
  }

  const referenceNumber = generateReferenceNumber();

  try {
    const prisma = getPrisma();
    await prisma.projectRequest.create({
      data: {
        referenceNumber,
        solutionType: parsed.data.solutionType,
        descriptionText: parsed.data.descriptionText,
        budgetRange: parsed.data.budgetRange,
        timeline: parsed.data.timeline,
        featuresJson: JSON.stringify(parsed.data.features ?? []),
        contactName: parsed.data.contactName,
        contactEmail: parsed.data.contactEmail,
        contactPhone: parsed.data.contactPhone,
        privacyAccepted: parsed.data.privacyAccepted,
      },
    });
  } catch (err) {
    console.error("Failed to save project request:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  return NextResponse.json({ referenceNumber }, { status: 201 });
}
