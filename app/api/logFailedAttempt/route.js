import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Define paths for JSON and CSV files
const jsonFilePath = path.join(process.cwd(), 'failedAttempts.json');
const csvFilePath = path.join(process.cwd(), 'failedAttempts.csv');

// Function to create a new failed attempt object
const createFailedAttempt = (email, attemptedPassword) => {
    return {
        email,  // Change from username to email
        attemptedPassword,
        time: new Date().toLocaleString(),
    };
};

// Function to log failed attempts in JSON format
const logToJSON = (newAttempt) => {
    const existingData = fs.existsSync(jsonFilePath)
        ? JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'))
        : [];

    existingData.push(newAttempt);
    fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2), 'utf8');
};

// Function to log failed attempts in CSV format
const logToCSV = (newAttempt) => {
    const csvHeader = 'Email,AttemptedPassword,Time\n'; // Changed Username to Email
    const csvData = `${newAttempt.email},${newAttempt.attemptedPassword},${newAttempt.time}\n`;

    // Create CSV file if it doesn't exist
    if (!fs.existsSync(csvFilePath)) {
        fs.writeFileSync(csvFilePath, csvHeader, 'utf8');
    }

    // Append new attempt to the CSV file
    fs.appendFileSync(csvFilePath, csvData, 'utf8');
};

export async function POST(request) {
    try {
        const { attemptedEmail, attemptedPassword } = await request.json();

        // Create a new failed attempt object
        const newAttempt = createFailedAttempt(attemptedEmail, attemptedPassword); // Changed username to attemptedEmail

        // Log the failed attempt to both JSON and CSV
        logToJSON(newAttempt);
        logToCSV(newAttempt);

        return NextResponse.json({ message: 'Failed attempt logged' }, { status: 200 });
    } catch (error) {
        console.error('Error logging failed attempt:', error);
        return NextResponse.json({ error: 'Failed to log attempt' }, { status: 500 });
    }
}
