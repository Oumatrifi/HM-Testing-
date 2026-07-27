Feature: Country and Region Selection
  As a user of the H&M website
  I want to select my preferred country and region
  So that I can browse the localized catalog and pricing

  @country @smoke @positive
  Scenario: Successful country selection for France
    Given I navigate to the H&M homepage
    When I open the country selector page
    And I select the country "France"
    Then I should be redirected to the H&M website for "France" with URL code "fr_fr"

  @country @positive
  Scenario: Successful country selection for Germany
    Given I navigate to the H&M homepage
    When I open the country selector page
    And I select the country "Germany"
    Then I should be redirected to the H&M website for "Germany" with URL code "de_de"

  @country @positive
  Scenario: Successful country selection for Spain
    Given I navigate to the H&M homepage
    When I open the country selector page
    And I select the country "Spain"
    Then I should be redirected to the H&M website for "Spain" with URL code "es_es"

  @country @negative
  Scenario: Attempting to select an invalid region
    Given I navigate to the H&M homepage
    When I open the country selector page
    And I search for an invalid country "NonExistentCountry123"
    Then an option not found message should be displayed
