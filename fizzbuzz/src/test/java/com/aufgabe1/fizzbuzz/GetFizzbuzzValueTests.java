package com.aufgabe1.fizzbuzz;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class GetFizzbuzzValueTests {

	private FizzbuzzHelper fizzbuzzHelper = new FizzbuzzHelper();

	/**
	 * If the input value is divisible by 3 and not by 5
	 **/
	@Test
	void getFizzbuzzValueDivisibleBy3AndNotBy5() {
		assertEquals("Fizz", fizzbuzzHelper.getFizzbuzzValue(3));
		assertEquals("Fizz", fizzbuzzHelper.getFizzbuzzValue(6));
	}

	/**
	 * If the input value is divisible by 5 and not by 3
	 **/
	@Test
	void getFizzbuzzValueDivisibleBy5AndNotBy3() {
		assertEquals("Buzz", fizzbuzzHelper.getFizzbuzzValue(5));
		assertEquals("Buzz", fizzbuzzHelper.getFizzbuzzValue(10));
	}

	/**
	 * If the input value is divisible by 3 and by 5
	 **/
	@Test
	void getFizzbuzzValueDivisibleBy3AndBy5() {
		assertEquals("FizzBuzz", fizzbuzzHelper.getFizzbuzzValue(15));
		assertEquals("FizzBuzz", fizzbuzzHelper.getFizzbuzzValue(30));
	}

	/**
	 * If the input value is not divisible by 3 or by 5
	 **/
	@Test
	void getFizzbuzzValueNotDivisibleBy3orBy5() {
		assertEquals("14", fizzbuzzHelper.getFizzbuzzValue(14));
	}
}
