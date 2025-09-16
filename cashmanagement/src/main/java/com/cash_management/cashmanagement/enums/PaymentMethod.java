package com.cash_management.cashmanagement.enums;

import lombok.Getter;

@Getter
public enum PaymentMethod {
    CASH("Cash"),
    CREDIT_CARD_AXIS("Credit Card Axis"),
    CREDIT_CARD_HDFC("Credit Card HDFC"),
    CREDIT_CARD_ICICI("Credit Card ICICI"),
    CREDIT_CARD_HSBC("Credit Card HSBC"),
    CREDIT_CARD_SBI("Credit Card SBI"),
    DEBIT_CARD_HSBC("Debit Card HSBC"),
    DEBIT_CARD_HDFC("Debit Card HDFC"),
    UPI("UPI"),
    NET_BANKING("Net Banking"),
    OTHER("Other");

    private final String displayName;

    PaymentMethod(String displayName) {
        this.displayName = displayName;
    }

}
