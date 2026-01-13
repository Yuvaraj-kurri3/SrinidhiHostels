import fetch from 'node-fetch';

const verifyPaymentStatus = async () => {
    try {
        const PORT = 5000;
        const response = await fetch(`http://localhost:${PORT}/api/students/latestpaymentstatus`);

        if (!response.ok) {
            console.error(`Error: Received status ${response.status}`);
            const text = await response.text();
            console.error('Response:', text);
            return;
        }

        const data = await response.json();
        console.log('Success! Received data:');
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Failed to fetch data:', error.message);
        console.log('Make sure the backend server is running.');
    }
};

verifyPaymentStatus();
