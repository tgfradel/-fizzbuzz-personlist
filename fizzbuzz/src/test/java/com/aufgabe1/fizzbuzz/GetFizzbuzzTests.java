package com.aufgabe1.fizzbuzz;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = FizzbuzzApplication.class)
@AutoConfigureMockMvc
class GetFizzbuzzTests {
	@Autowired
	private MockMvc mvc;

	/**
	 * If the input value is less than 1
	 * 
	 * @throws Exception
	 **/
	@Test
	void getFizzbuzzLessThan1() throws Exception {
		String expectedValue1 = "Error: The parameter \"0\" must be a number greater than zero";
		String expectedValue2 = "Error: The parameter \"-1\" must be a number greater than zero";

		mvc.perform(get("/fizzbuzz/0").contentType(MediaType.TEXT_PLAIN)).andExpect(status().isInternalServerError())
				.andExpect(content().contentTypeCompatibleWith(MediaType.TEXT_PLAIN))
				.andExpect(content().string(expectedValue1));

		mvc.perform(get("/fizzbuzz/-1").contentType(MediaType.TEXT_PLAIN)).andExpect(status().isInternalServerError())
				.andExpect(content().contentTypeCompatibleWith(MediaType.TEXT_PLAIN))
				.andExpect(content().string(expectedValue2));

	}

	/**
	 * If the input value is greater than 0
	 * 
	 * @throws Exception
	 **/
	@Test
	void getFizzbuzzGreaterThan0() throws Exception {
		String expectedValueFor16 = "[\"1\",\"2\",\"Fizz\",\"4\",\"Buzz\",\"Fizz\",\"7\",\"8\",\"Fizz\",\"Buzz\",\"11\",\"Fizz\",\"13\",\"14\",\"FizzBuzz\",\"16\"]";

		mvc.perform(get("/fizzbuzz/16").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andExpect(content().string(expectedValueFor16));

	}

	/**
	 * If the input value is greater than the maximum integer value (2147483647)
	 * 
	 * @throws Exception
	 **/
	@Test
	void getFizzbuzzMaxIntegerValue() throws Exception {
		String expectedValue = "Error: The parameter \"2147483648\" must be a number greater than zero and less than 2147483648";

		mvc.perform(get("/fizzbuzz/2147483648").contentType(MediaType.TEXT_PLAIN))
				.andExpect(status().isInternalServerError())
				.andExpect(content().contentTypeCompatibleWith(MediaType.TEXT_PLAIN))
				.andExpect(content().string(expectedValue));
	}

	/**
	 * If the input value has a non-numeric character
	 * 
	 * @throws Exception
	 **/
	@Test
	void getFizzbuzzWithNonNumericCharacter() throws Exception {
		String expectedValue = "Error: The parameter \"2s9ek2$%&6\" must be a number greater than zero and less than 2147483648";

		mvc.perform(get("/fizzbuzz/2s9ek2$%&6").contentType(MediaType.TEXT_PLAIN))
				.andExpect(status().isInternalServerError())
				.andExpect(content().contentTypeCompatibleWith(MediaType.TEXT_PLAIN))
				.andExpect(content().string(expectedValue));
	}
}
