export const generateNewID = () =>
{
    const number = Math.random().toString( 36 ).substring( 2 );
    const date = Date.now().toString( 36 );
    const id = number + date;
    return id;
};
