
import * as SecureStore from 'expo-secure-store';

export async function getUserEmail(storedEmail: string | null){
    const emailString  = await SecureStore.getItemAsync('email');
    if(emailString){
        return emailString
    };
    return null;
}