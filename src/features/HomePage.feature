Feature: Add items from homepage
    Scenario: Add first product in cart
        Given I navigate to the homepage
        When I click on the first button
        And Go to the cart page
        Then I should see the first item added 

    Scenario: Add ALL products in cart
        Given I navigate to the homepage
        When I add all products
        And Go to the cart page
        Then I should see all products added 

    Scenario: Add a selected product in cart
        Given I navigate to the homepage
        When I add product number
        And Go to the cart page
        Then I should see the selected product added

  