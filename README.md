This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


Assumptions made for this project:
* all line items are in the same currency (and are in the following format: $###,###.## )
* if an item has only been partially entered, the total will not be calculated until both a qty and a price are available.


Item:
- allow duplicates item names?          yes, if 3 items initially purchased, and an item is added later, may prefer to keep seperate to maintain integrity of initial input 

Quantity:
- allow negative quantities?            yes (could be a return)

Price:
- allow negative price?                 no, returns can be used with negative value instead of "earning money on purchase" 
- allow zero price?                     yes, could be free
- 

(Line) Total: 
- read only, calculated by qty * price
- max 2 decimals

Tax: 
- constant, read only

Subtotal
- read only, calculated by sum of (Line) Totals
- max 2 decimals

Total
- read only, calculatd by subtotal * tax
- max 2 decimals

