import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Path to the CSV file
const csvFilePath = path.join(process.cwd(), 'failedAttempts.csv');

export async function GET() {
    try {
        // Check if the CSV file exists
        if (!fs.existsSync(csvFilePath)) {
            return NextResponse.json({ attempts: [] }, { status: 200 });
        }

        // Read the CSV file
        const data = fs.readFileSync(csvFilePath, 'utf8');
        const attempts = data.split('\n').slice(1).map((line) => {
            const [username, attemptedPassword, time] = line.split(',');
            return { username, attemptedPassword, time };
        }).filter(attempt => attempt.username); // Filter out any empty entries

        return NextResponse.json({ attempts }, { status: 200 });
    } catch (error) {
        console.error('Error reading failed attempts:', error);
        return NextResponse.json({ error: 'Failed to retrieve attempts' }, { status: 500 });
    }
}
