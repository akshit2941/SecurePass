import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Path to the JSON file
const jsonFilePath = path.join(process.cwd(), 'failedAttempts.json');

export async function GET() {
    try {
        // Check if the JSON file exists
        if (!fs.existsSync(jsonFilePath)) {
            return NextResponse.json({ attempts: [] }, { status: 200 });
        }

        // Read the JSON file
        const data = fs.readFileSync(jsonFilePath, 'utf8');
        const attempts = JSON.parse(data); // Parse the JSON data

        return NextResponse.json({ attempts }, { status: 200 });
    } catch (error) {
        console.error('Error reading failed attempts:', error);
        return NextResponse.json({ error: 'Failed to retrieve attempts' }, { status: 500 });
    }
}
