import { Client, Account, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://[HOSTNAME_OR_IP]/v1') // Replace with your Appwrite endpoint
    .setProject('[PROJECT_ID]'); // Replace with your Appwrite project ID

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };