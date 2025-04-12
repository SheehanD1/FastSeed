import { NextResponse } from 'next/server';
import { supabase, TABLES } from '@/lib/supabase';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data: startup, error } = await supabase
      .from(TABLES.STARTUPS)
      .update({ status: 'approved' })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(startup);
  } catch (error) {
    console.error('Error approving startup:', error);
    return NextResponse.json(
      { error: 'Failed to approve startup' },
      { status: 500 }
    );
  }
} 