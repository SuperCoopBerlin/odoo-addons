Fix tax rounding problem when buying the same product multiple times

Quantity=1 -------- 1,23×1,19+0,15 = 1,6137 = 1,61
Quantity=2 -------- (1,23×1,19+0,15)×2 = 3,2274 = 3,23 <- odoo default (round after applying quantity)
Quantity=2 -------- 1,61 * 2 = 3,22 <- desired (round before applying quantity)