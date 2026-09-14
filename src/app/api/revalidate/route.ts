import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  // Check for secret to confirm this is a valid request
  const secret = request.nextUrl.searchParams.get('secret');
  let path = request.nextUrl.searchParams.get('path');
  const type = request.nextUrl.searchParams.get('type');

  // Strip query params if they were accidentally included in the path
  if (path && path.includes('?')) {
    path = path.split('?')[0];
  }

  // We recommend adding REVALIDATION_SECRET to your .env file
  // For now, we fallback to a hardcoded secret if env var is missing for easier testing
  const expectedSecret = process.env.REVALIDATION_SECRET || 'my-super-secret-token';

  if (secret !== expectedSecret) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ message: 'Missing path parameter' }, { status: 400 });
  }

  try {
    // This will revalidate any path (e.g. '/degrees/business-management-ba')
    if (type === 'layout') {
      revalidatePath(path, 'layout');
    } else {
      revalidatePath(path);
    }
    return NextResponse.json({ revalidated: true, path, type, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
