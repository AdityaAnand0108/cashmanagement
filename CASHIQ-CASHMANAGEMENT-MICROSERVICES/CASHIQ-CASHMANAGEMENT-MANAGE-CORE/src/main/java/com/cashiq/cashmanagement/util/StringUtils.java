package com.cashiq.cashmanagement.util;

public class StringUtils {

    /**
     * Converts a string to Title Case (first letter uppercase, rest lowercase).
     * 
     * @param input The string to convert.
     * @return The Title Cased string, or the input if null/empty.
     */
    public static String toTitleCase(String input) {
        if (input == null || input.isEmpty())
            return input;
        return input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase();
    }
}
