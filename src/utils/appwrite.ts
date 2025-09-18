import { Client, Account, TablesDB } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('68cab8b4000c1ab01e51'); // Replace with your Appwrite project ID

const account = new Account(client);
const tablesDB = new TablesDB(client);

export { client, account, tablesDB };