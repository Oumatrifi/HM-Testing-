Feature: Product Search and Add to Cart
  As a customer of the H&M website
  I want to search for a specific product and select my size
  So that I can add it to my shopping cart

  @search @cart @positive
  Scenario: Search for Relaxed Fit Cotton Shirt and add to cart in size M
    Given I navigate to the H&M homepage
    When I search for the product "Chemise Relaxed Fit en coton"
    And search results are displayed
    And I select the product "Chemise Relaxed Fit en coton" from the list
    And I select the size "M" on the product page
    And I add the product to the cart
    Then the product "Chemise Relaxed Fit en coton" in size "M" should be added to the cart successfully

  @search @positive
  Scenario: Search for Jeans and verify results display
    Given I navigate to the H&M homepage
    When I search for the product "Jeans"
    Then search results are displayed

  @search @negative
  Scenario: Search for a non-existent product keyword
    Given I navigate to the H&M homepage
    When I search for the product "xyz999nonexistentitem"
    Then a no results found message should be displayed

  @search @positive
  Scenario: Search for category Robe and verify results display
    Given I navigate to the H&M homepage
    When I search for the product "Robe"
    Then search results are displayed

  @cart @negative
  Scenario: Attempt to add product to cart without selecting a size
    Given I navigate to the H&M homepage
    When I search for the product "Chemise Relaxed Fit en coton"
    And I select the product "Chemise Relaxed Fit en coton" from the list
    And I add the product to the cart without selecting a size
    Then a size selection required message or prompt should be displayed
