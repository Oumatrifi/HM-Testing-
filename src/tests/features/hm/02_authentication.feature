Feature: User Authentication - Sign Up and Log Out
  As a new H&M customer
  I want to create a personal account and log out securely
  So that I can manage my orders and personal profile

  @auth @signup @positive
  Scenario: User sign up with valid credentials
    Given I navigate to the H&M homepage
    When I open the sign up form
    And I enter a unique email and valid password
    And I submit the sign up form
    Then my registration request should be processed successfully

  @auth @logout @positive
  Scenario: Successful user log out
    Given I navigate to the H&M homepage
    When I request to log out from my account
    Then I should be logged out successfully

  @auth @signup @negative
  Scenario: Sign up attempt with invalid email format
    Given I navigate to the H&M homepage
    When I open the sign up form
    And I enter an invalid email "invalid-email-format" and valid password "ValidPass123!"
    And I submit the sign up form
    Then an email format error message should be displayed

  @auth @signup @negative
  Scenario: Sign up attempt with weak password
    Given I navigate to the H&M homepage
    When I open the sign up form
    And I enter a valid email and weak password "123"
    And I submit the sign up form
    Then a password validation error message should be displayed

  @auth @signup @negative
  Scenario: Sign up attempt with missing email field
    Given I navigate to the H&M homepage
    When I open the sign up form
    And I enter an empty email "" and valid password "ValidPass123!"
    And I submit the sign up form
    Then an email format error message should be displayed
