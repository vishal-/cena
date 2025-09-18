import { Databases } from 'appwrite';
import { client } from './appwrite';

const databases = new Databases(client);

const COLLECTIONS = [
    {
        id: 'users',
        name: 'Users',
        attributes: [
            { key: 'name', type: 'string', size: 255, required: true },
            { key: 'email', type: 'string', size: 255, required: true, unique: true },
            { key: 'created_at', type: 'datetime', required: true },
        ],
    },
    {
        id: 'dishes',
        name: 'Dishes',
        attributes: [
            { key: 'name', type: 'string', size: 255, required: true },
            { key: 'description', type: 'string', size: 1000, required: false },
            { key: 'cuisine', type: 'string', size: 255, required: true },
            { key: 'price', type: 'float', required: true },
            { key: 'image_url', type: 'string', size: 1000, required: false },
            { key: 'created_by', type: 'string', size: 255, required: true },
            { key: 'created_at', type: 'datetime', required: true },
        ],
    },
    {
        id: 'meal_plans',
        name: 'Meal Plans',
        attributes: [
            { key: 'user_id', type: 'string', size: 255, required: true },
            { key: 'week_start', type: 'date', required: true },
            { key: 'week_end', type: 'date', required: true },
            { key: 'dishes', type: 'string[]', size: 255, required: true },
            { key: 'created_at', type: 'datetime', required: true },
        ],
    },
    {
        id: 'cuisines',
        name: 'Cuisines',
        attributes: [
            { key: 'name', type: 'string', size: 255, required: true },
            { key: 'description', type: 'string', size: 1000, required: false },
        ],
    },
    {
        id: 'notifications',
        name: 'Notifications',
        attributes: [
            { key: 'user_id', type: 'string', size: 255, required: true },
            { key: 'message', type: 'string', size: 1000, required: true },
            { key: 'read', type: 'boolean', required: true },
            { key: 'created_at', type: 'datetime', required: true },
        ],
    },
];

async function createCollections() {
    for (const collection of COLLECTIONS) {
        try {
            const existingCollections = await databases.list();
            const exists = existingCollections.collections.some((col) => col.$id === collection.id);

            if (!exists) {
                await databases.create(collection.id, collection.name);
                for (const attribute of collection.attributes) {
                    if (attribute.type === 'string') {
                        await databases.createStringAttribute(
                            collection.id,
                            attribute.key,
                            attribute.size,
                            attribute.required,
                            attribute.unique || false
                        );
                    } else if (attribute.type === 'float') {
                        await databases.createFloatAttribute(
                            collection.id,
                            attribute.key,
                            attribute.required
                        );
                    } else if (attribute.type === 'datetime') {
                        await databases.createDatetimeAttribute(
                            collection.id,
                            attribute.key,
                            attribute.required
                        );
                    } else if (attribute.type === 'boolean') {
                        await databases.createBooleanAttribute(
                            collection.id,
                            attribute.key,
                            attribute.required
                        );
                    } else if (attribute.type === 'string[]') {
                        await databases.createStringAttribute(
                            collection.id,
                            attribute.key,
                            attribute.size,
                            attribute.required,
                            false
                        );
                    }
                }
                console.log(`Collection '${collection.name}' created successfully.`);
            } else {
                console.log(`Collection '${collection.name}' already exists.`);
            }
        } catch (error) {
            console.error(`Error creating collection '${collection.name}':`, error);
        }
    }
}

createCollections();