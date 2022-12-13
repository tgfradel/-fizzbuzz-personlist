package com.aufgabe1.fizzbuzz;

import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class GenerateFizzbuzzTests {

	private FizzbuzzHelper fizzbuzzHelper = new FizzbuzzHelper();
	
	/**
	 * If the input value is less than 1
	 **/
	@Test
	void generateFizzbuzzLessThan1() {
		List<String> expectedValue = new ArrayList<String>();
		assertTrue(fizzbuzzHelper.compareListOfStrings(expectedValue, fizzbuzzHelper.generateFizzbuzz(0)));
		assertTrue(fizzbuzzHelper.compareListOfStrings(expectedValue, fizzbuzzHelper.generateFizzbuzz(-1)));

	}

	/**
	 * If the input value is greater than 0
	 **/
	@Test
	void generateFizzbuzzGreaterThan0() {
		List<String> expectedValue = new ArrayList<String>(Arrays.asList("1", "2", "Fizz", "4", "Buzz", "Fizz", "7",
				"8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz", "16"));
		List<String> actualValue = fizzbuzzHelper.generateFizzbuzz(16);
		assertTrue(fizzbuzzHelper.compareListOfStrings(expectedValue, actualValue));
	}

}
