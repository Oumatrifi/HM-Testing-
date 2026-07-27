Feature: Favorites List Management
  As an H&M customer
  I want to add and manage items in my favorites list
  So that I can save items for later purchase

  @favorites @positive
  Scenario: Add a product to the favorites list
    Given I navigate to the H&M homepage
    When I search for the product "Jean"
    And I select an item from the results
    And I add this item to my favorites
    Then the item should be visible in my favorites list

  @favorites @positive
  Scenario: View items in the favorites list
    Given I navigate to the H&M homepage
    When I navigate to the favorites page
    Then the favorites page title should be displayed

  @favorites @negative
  Scenario: Remove an item from the favorites list
    Given I navigate to the H&M homepage
    When I search for the product "Jean"
    And I select an item from the results
    And I add this item to my favorites
    And I remove this item from my favorites
    Then the item should no longer be marked as favorite

  @favorites @positive
  Scenario: Access favorites page and verify list layout
    Given I navigate to the H&M homepage
    When I navigate to the favorites page
    Then the favorites page title should be displayed
