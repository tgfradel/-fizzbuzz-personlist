package com.aufgabe1.fizzbuzz;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FizzbuzzController {

	private FizzbuzzHelper fizzbuzzHelper = new FizzbuzzHelper();

	@GetMapping("/fizzbuzz/{fizzbuzzInput}")
	public ResponseEntity<?> getFizzbuzz(@PathVariable("fizzbuzzInput") final String fizzbuzzInput) {
		int inpusAsnumber;
		try {
			inpusAsnumber = Integer.parseInt(fizzbuzzInput);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error: The parameter \"" + fizzbuzzInput
					+ "\" must be a number greater than zero and less than 2147483648");
		}

		return inpusAsnumber > 0 ? ResponseEntity.ok().body(fizzbuzzHelper.generateFizzbuzz(inpusAsnumber))
				: ResponseEntity.status(500)
						.body("Error: The parameter \"" + fizzbuzzInput + "\" must be a number greater than zero");
	}
}