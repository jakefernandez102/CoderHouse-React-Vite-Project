export function formatMoney ( ammount )
{
    const ammountFormated = ammount.toLocaleString( 'en-US', {
        style: 'currency',
        currency: 'USD'
    } );
    return ammountFormated;
}