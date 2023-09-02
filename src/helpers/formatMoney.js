export function formatMoney ( ammount = 0 )
{
    const ammountFormated = ammount.toLocaleString( 'en-US', {
        style: 'currency',
        currency: 'USD'
    } );
    return ammountFormated;
}