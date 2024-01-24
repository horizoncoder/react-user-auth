export const getCookie = (name: string): string | null => {
    const cookieValue = document.cookie
        .split(';')
        .find(cookie => cookie.trim().startsWith(`${name}=`));

    return cookieValue ? cookieValue.split('=')[1].trim() : null;
};
