let acumulate = 0;

export function calculateSubTotal ( ammount, quantity )
{
    acumulate = acumulate + ( ammount * quantity );
    return ( acumulate );
}
export function calculateTaxes ( acumulate )
{
    return acumulate * 0.12;

}

export function calculateFee ( acumulate )
{
    return acumulate * 0.05;
}
export function calculateTotal ( taxes, fee, acumulate )
{

    return acumulate + taxes + fee;
}