import fs from 'fs';
import path from 'path';

// Utility function to log failed attempts to a JSON file
export function logFailedAttemptToJSON(username, attemptedPassword) {
    const filePath = path.join(process.cwd(), 'failedAttempts.json');
    const currentData = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
        : [];

    const newAttempt = {
        username,
        attemptedPassword,
        time: new Date().toLocaleString(),
    };

    currentData.push(newAttempt);

    fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2), 'utf8');
}

// Utility function to log failed attempts to a CSV file
export function logFailedAttemptToCSV(username, attemptedPassword) {
    const filePath = path.join(process.cwd(), 'failedAttempts.csv');
    const header = 'Username,AttemptedPassword,Time\n';
    const newAttempt = `${username},${attemptedPassword},${new Date().toLocaleString()}\n`;

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, header, 'utf8');
    }

    fs.appendFileSync(filePath, newAttempt, 'utf8');
}
