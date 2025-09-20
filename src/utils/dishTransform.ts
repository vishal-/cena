export interface ApiDish {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    name: string;
    description?: string;
    recipe?: string;
    yt_link?: string;
    cuisine: string;
    calorie_per_serving?: number;
    prep_required?: boolean;
    cooking_time?: number;
    owner: string;
}

export interface Dish {
    id: string;
    name: string;
    description?: string;
    recipe?: string;
    ytLink?: string;
    cuisine: string;
    caloriePerServing?: number;
    prepRequired?: boolean;
    cookingTime?: number;
    updatedAt: string;
    owner: string;
}

export function fromApiDish(apiDish: ApiDish): Dish {
    return {
        id: apiDish.$id,
        name: apiDish.name,
        description: apiDish.description,
        recipe: apiDish.recipe,
        ytLink: apiDish.yt_link,
        cuisine: apiDish.cuisine,
        caloriePerServing: apiDish.calorie_per_serving,
        prepRequired: apiDish.prep_required,
        cookingTime: apiDish.cooking_time,
        updatedAt: apiDish.$updatedAt,
        owner: apiDish.owner,
    };
}

export function toApiDish(dish: Dish): Omit<ApiDish, '$id' | '$createdAt' | '$updatedAt'> {
    return {
        name: dish.name,
        description: dish.description,
        recipe: dish.recipe,
        yt_link: dish.ytLink,
        cuisine: dish.cuisine,
        calorie_per_serving: dish.caloriePerServing,
        prep_required: dish.prepRequired,
        cooking_time: dish.cookingTime,
        owner: dish.owner,
    };
}