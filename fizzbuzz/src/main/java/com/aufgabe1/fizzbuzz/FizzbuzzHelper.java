package com.aufgabe1.fizzbuzz;

import java.util.ArrayList;
import java.util.List;

public class FizzbuzzHelper {

	/**
	 * Generate the FizzBuzz list of a number
	 **/
	public List<String> generateFizzbuzz(int fizzbuzzInput) {
		List<String> fizzbuzzOutput = new ArrayList<String>();
		for (int i = 1; i <= fizzbuzzInput; i++) {
			fizzbuzzOutput.add(getFizzbuzzValue(i));
		}
		return fizzbuzzOutput;
	}

	/**
	 * Get the Fizzbuzz value of a number
	 **/
	public String getFizzbuzzValue(int inputNumber) {
		String fizzbuzzValue;
		if (inputNumber % 3 == 0 && inputNumber % 5 == 0)
			fizzbuzzValue = ("FizzBuzz");
		else if (inputNumber % 3 == 0)
			fizzbuzzValue = ("Fizz");
		else if (inputNumber % 5 == 0)
			fizzbuzzValue = ("Buzz");
		else
			fizzbuzzValue = (String.valueOf(inputNumber));

		return fizzbuzzValue;
	}

	/**
	 * Compare 2 string lists
	 **/
	boolean compareListOfStrings(List<String> firstList, List<String> secondList) {
		boolean result = true;
		if (firstList.size() != secondList.size()) {
			result = false;
		} else {
			for (int i = 0; i < firstList.size(); i++) {
				if (!firstList.get(i).equals(secondList.get(i))) {
					result = false;
					break;
				}
			}
		}
		return result;

	}

}
