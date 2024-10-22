import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { username, attemptedPassword } = await request.json();

    // Path to the JSON file where we'll log failed attempts
    const jsonFilePath = path.join(process.cwd(), 'failedAttempts.json');
    const csvFilePath = path.join(process.cwd(), 'failedAttempts.csv');

    // Read existing JSON data or initialize an empty array
    const existingData = fs.existsSync(jsonFilePath)
        ? JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'))
        : [];

    const newAttempt = {
        username,
        attemptedPassword,
        time: new Date().toLocaleString(),
    };

    // Add the new attempt to the JSON data
    existingData.push(newAttempt);

    // Write the updated data to the JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2), 'utf8');

    // Also log the attempt to a CSV file
    const csvHeader = 'Username,AttemptedPassword,Time\n';
    const csvData = `${username},${attemptedPassword},${new Date().toLocaleString()}\n`;

    // If CSV file doesn't exist, create it with the header
    if (!fs.existsSync(csvFilePath)) {
        fs.writeFileSync(csvFilePath, csvHeader, 'utf8');
    }

    // Append the new attempt to the CSV file
    fs.appendFileSync(csvFilePath, csvData, 'utf8');

    return NextResponse.json({ message: 'Failed attempt logged' });
}
