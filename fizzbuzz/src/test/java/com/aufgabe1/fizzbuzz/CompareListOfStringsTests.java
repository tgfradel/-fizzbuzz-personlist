package com.aufgabe1.fizzbuzz;

import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CompareListOfStringsTests {

	private FizzbuzzHelper fizzbuzzHelper = new FizzbuzzHelper();

	/**
	 * Compare same lists
	 **/
	@Test
	void compareListOfStringsSameLists() {
		List<String> firstList = new ArrayList<String>(Arrays.asList("1", "2", "Fizz", "4", "Buzz"));
		List<String> secondList = new ArrayList<String>(Arrays.asList("1", "2", "Fizz", "4", "Buzz"));
		assertTrue(fizzbuzzHelper.compareListOfStrings(firstList, secondList));
	}

	/**
	 * Compare different lists with same length
	 **/
	@Test
	void compareListOfStringsDifferentListsWithSameLength() {
		List<String> firstList = new ArrayList<String>(Arrays.asList("1", "2", "Buzz", "4", "Fizz"));
		List<String> secondList = new ArrayList<String>(Arrays.asList("0", "2", "Fizz", "4", "Buzz"));
		assertTrue(!fizzbuzzHelper.compareListOfStrings(firstList, secondList));
	}

	/**
	 * Compare different lists with different length
	 **/
	@Test
	void compareListOfStringsDifferentListsWithDiferentLength() {
		List<String> firstList = new ArrayList<String>(Arrays.asList("1", "2", "Buzz", "4", "Fizz"));
		List<String> secondList = new ArrayList<String>(Arrays.asList("1", "2"));
		assertTrue(!fizzbuzzHelper.compareListOfStrings(firstList, secondList));
	}

}
