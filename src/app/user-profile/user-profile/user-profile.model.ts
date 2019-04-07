export interface UserProfile {
    avatarUrl: string;
    name: string;
    gender: boolean;
    age: number;
    description: string;
    partner: {
        gender: boolean;
        age: number;
        distance: number
    };
}
