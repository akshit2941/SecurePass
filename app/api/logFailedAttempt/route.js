import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Define paths for JSON and CSV files
const jsonFilePath = path.join(process.cwd(), 'failedAttempts.json');
const csvFilePath = path.join(process.cwd(), 'failedAttempts.csv');

// Function to create a new failed attempt object
const createFailedAttempt = (email, attemptedPassword, ip) => {
    return {
        email,  // Changed from username to email
        attemptedPassword,
        time: new Date().toLocaleString(),
        ip,     // Added IP address
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
    const csvHeader = 'Email,AttemptedPassword,Time,IP\n';  // Added IP column
    const csvData = `${newAttempt.email},${newAttempt.attemptedPassword},${newAttempt.time},${newAttempt.ip}\n`;

    // Create CSV file if it doesn't exist
    if (!fs.existsSync(csvFilePath)) {
        fs.writeFileSync(csvFilePath, csvHeader, 'utf8');
    }

    // Append new attempt to the CSV file
    fs.appendFileSync(csvFilePath, csvData, 'utf8');
};

// Function to fetch the public IP address using the  API
const fetchPublicIP = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching public IP address:', error);
        return 'Unknown IP'; // Fallback if the IP fetch fails
    }
};

export async function POST(request) {
    try {
        const { attemptedEmail, attemptedPassword } = await request.json();

        // Fetch the public IP address of the user
        const ip = await fetchPublicIP();  // Fetch the public IP

        // Create a new failed attempt object, including the public IP
        const newAttempt = createFailedAttempt(attemptedEmail, attemptedPassword, ip);

        // Log the failed attempt to both JSON and CSV
        logToJSON(newAttempt);
        logToCSV(newAttempt);

        return NextResponse.json({ message: 'Failed attempt logged' }, { status: 200 });
    } catch (error) {
        console.error('Error logging failed attempt:', error);
        return NextResponse.json({ error: 'Failed to log attempt' }, { status: 500 });
    }
}
