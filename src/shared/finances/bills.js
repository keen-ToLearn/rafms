export const BILLS = [
    {
        forPid : 1,
        allBills : [
            {
                sNo : 1,
                billName : 'Turbines for main use',
                billTo : 'Sarth Electricals Co.',
                billDate : '25/9/2020',
                billTotal : 1200000,
                billRecords : [
                    { itemQty : 2, itemDesc : '1MW Turbine', itemUnitCost : 300000, itemTotal : 600000 },
                    { itemQty : 3, itemDesc : '500KW Turbine', itemUnitCost : 200000, itemTotal : 600000 }
                ]
            },
            {
                sNo : 2,
                billName : 'Electric cables for transfer from powerhouse',
                billTo : 'Sarth Electricals Co.',
                billDate : '20/11/2020',
                billTotal : 300000,
                billRecords : [
                    { itemQty : 10, itemDesc : '100m red cables', itemUnitCost : 18000, itemTotal : 180000 },
                    { itemQty : 10, itemDesc : '100m yellow cables', itemUnitCost : 12000, itemTotal : 120000 }
                ]
            },
            {
                sNo : 3,
                billName : 'Reinforced cement for main structure',
                billTo : 'Oak Cement Ltd.',
                billDate : '5/9/2020',
                billTotal : 500000,
                billRecords : [
                    { itemQty : 1000, itemDesc : '50kg new age cement', itemUnitCost : 500, itemTotal : 500000 }
                ]
            }
        ]
    },
    {
        forPid : 2,
        allBills : []
    }
]