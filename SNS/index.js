require('dotenv').config() // Load environment variables
const {SNSClient, PublishCommand} = require('@aws-sdk/client-sns') // Import necessary modules

async function sendSMSMessage(sns, params){
    const command = new PublishCommand(params); // Create a new PublishCommand with the provided parameters
    const message = await sns.send(command); // Send the command using the SNS client and wait for the response
    return message; // Return the response message
}

(async() => {
    const otp = Math.random().toString().substring(2, 6); // Generate a random OTP (One-Time Password)
    const params = {
        Message: `Hello, world!\nOTP: ${otp}`, // Set the message content with the OTP
        PhoneNumber: process.env.PHONE_NUMBER, // Get the phone number from environment variables
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                DataType: 'String',
                StringValue: 'String'
            }
        }
    }
    
    const sns = new SNSClient({
        region: process.env.AWS_REGION, // Get the AWS region from environment variables
        credentials: { 
            accessKeyId: process.env.AWS_ACCESS_KEY, // Get the AWS access key from environment variables
            secretAccessKey: process.env.AWS_SECRET_KEY // Get the AWS secret key from environment variables
        }
    });

    await sendSMSMessage(sns, params); // Call the sendSMSMessage function to send the SMS message
    console.log(`\nOTP ${otp} successfully\n`); // Print a success message with the OTP
})()