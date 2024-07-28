"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Transaction } from "@/types/Transaction";
import { get } from "http";

async function getTransactions(): Promise<{
  transactions?: Transaction[];
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return { transactions };
  } catch (error) {
    return { error: "Datbase error" };
  }
}

export default getTransactions;
