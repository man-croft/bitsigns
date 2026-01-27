import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";

export async function POST(request: Request) {
  // 1. Verify Authentication
  const authHeader = request.headers.get("authorization");
  
  // Chainhook sends 'Bearer <token>'
  const expectedSecret = `Bearer ${process.env.CHAINHOOK_SECRET}`;
  
  if (authHeader !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // 2. Process Apply Blocks
    for (const block of body.apply || []) {
      for (const tx of block.transactions || []) {
        if (tx.metadata?.receipt?.events) {
          for (const event of tx.metadata.receipt.events) {
            // Check for NFT Mint Event
            // Note: The event structure depends on the Chainhook configuration (default vs specific)
            // Looking for 'nft_mint_event' which is standard for Stacks
            if (event.type === "nft_mint_event") {
              const assetId = event.data.asset_identifier;
              
              // Verify it's our contract
              if (assetId.includes("bitsign-nft::bitsign")) {
                 const tokenId = event.data.value.repr.replace("u", ""); // Extract ID (e.g. u1 -> 1)
                 const owner = event.data.recipient;
                 
                 console.log(`Detected Mint: Token ${tokenId} by ${owner}`);

                 // 3. Trigger Inngest Workflow
                 await inngest.send({
                   name: "bitsigns/avatar.generate",
                   data: {
                     tokenId: Number(tokenId),
                     owner: owner,
                     txId: tx.transaction_identifier.hash,
                     blockHeight: block.block_identifier.index,
                   },
                 });
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Chainhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
