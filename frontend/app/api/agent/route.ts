import { NextResponse } from 'next/server';

export async function GET() {
  const agentStatus = { status: 'active', name: 'Agent-001' };
  return NextResponse.json(agentStatus);
}
