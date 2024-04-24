# [**Toyota Web Cash Desk**](https://github.com/yavuzyigitmuhammetali/toyotawebcashdesk)

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Configure](#configure)
5. [Usage](#usage)
6. [File Structure](#file-structure)
7. [Pages](#pages)
   - [LoginPage](#loginpage)
   - [MainContainer](#maincontainer)
   - [MainScreen](#mainscreen)
   - [OfflineErrorPage](#offlineerrorpage)
   - [PaymentDashboard](#paymentdashboard)
   - [ProductEntryPanel](#productentrypanel)
   - [ProductsDashboard](#productsdashboard)
   - [PurchaseReceipts](#purchasereceipts)
   - [RefundDashboard](#refunddashboard)
   - [ResponsiveReceipt](#responsivereceipt)
   - [SalesDashboard](#salesdashboard)
   - [SettingsDashboard](#settingsdashboard)
   - [SummaryDashboard](#summarydashboard)
8. [Components](#components)
9. [Contexts](#contexts)
10. [Localization](#localization)
11. [Routing](#routing)
12. [Contributing](#contributing)
13. [License](#license)

## Introduction
The Point of Sale (POS) System is a comprehensive and user-friendly application built with React.js. It provides a wide range of features for managing sales, inventory, refunds, and generating reports. The system is designed to be efficient, scalable, and easy to use, making it an ideal solution for businesses of all sizes.

## Features
The POS System offers the following key features:

1. **Sales Management**: Create new orders, add products to the cart, apply discounts, and process payments (cash and card).
2. **Inventory Management**: Add new products, update product details, and track stock levels.
3. **Refund Processing**: Process refunds for previous orders and update stock levels accordingly.
4. **Receipt Generation**: Generate detailed receipts for completed transactions.
5. **Reporting**: Generate comprehensive reports on sales, profits, top-selling products, and more.
6. **User Management**: Manage cashier accounts and track sales by cashier.
7. **Localization**: Support for multiple languages (English and Turkish currently included).
8.  **Online/Offline Mode**: The system operates online during specified time intervals and switches to offline mode for the remaining duration. Thus, stricter measures are taken against accessible hours.
9. **Responsive Design**: Many reusable elements in the user interface are optimized for various screen sizes, including desktop and mobile devices.
10. **Dark Mode**: Implement dark mode for better user experience in low-light environments.

## Installation
To set up the POS System, follow these steps:

1. Clone the repository and extract it from the archive to an easily accessible location:
   ```
   git clone https://github.com/yavuzyigitmuhammetali/toyotawebcashdesk
   ```

2. Navigate to the project directory:
   ```
   cd toyotawebcashdesk
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

The application should now be running at `http://localhost:3000`.
_If you want to try the sample data with which I tested the system, you can access the json files from  [this link](https://www.mediafire.com/file/y7qjopeu2xujk5w/mock.zip/file)._


## Configure

To configure the POS System, you can utilize the `config.json` file, modify the files in the [public](./public/index.html) folder, and use the default data templates provided in `defaultData.js`. Let's dive into each aspect in detail.

### Using `config.json`
The `config.json` file is used to store various configuration settings for the POS System. It includes the following properties:

- [caseNumber](./src/config.json): Represents the case number associated with the POS System.
- [storeNumber](./src/config.json): Specifies the store number or identifier.
- [storeName](./src/config.json): Indicates the name of the store.
- [apiBaseUrl](./src/config.json): Defines the base URL for the API endpoints.
- [apiEndpoints](./src/config.json): Contains the specific API endpoints for different functionalities, such as products, receipts, categories, subcategories, login, status, and test.
- [externalEndpoints](./src/config.json): Specifies any external API endpoints used by the system, such as the IP address lookup service.

To modify the configuration settings, you can directly edit the values in the `config.json` file. For example, you can change the [storeName](./src/config.json) to reflect your own store's name or update the [apiBaseUrl](./src/config.json) to point to your backend API.

### Modifying Icons and Fonts in the [public](./public/index.html) Folder
The [public](./public/index.html) folder in a React application is used to store static assets that are not processed by the build system. You can customize the icons and fonts used in the POS System by modifying the files in this folder.

- **Icons**: To change the favicon and app icons, replace the `favicon.ico` file in the [public](./public/index.html) folder with your desired icons. Make sure to update the corresponding references in the `manifest.json` file.

- **Fonts**: To use custom fonts, you can add the font files to the `public/fonts` directory. In the provided example, the Rubik font is used. You can replace the font files with your preferred fonts and update the `<link>` tag in the `index.html` file to reference the new font files.

### Creating Data with Template Data in `defaultData.js`
The `defaultData.js` file contains template data for various entities used in the POS System, such as products, categories, subcategories, and receipts. These templates provide a structure for creating new instances of these entities with default values.

For example, to create a new product, you can use the [defaultProduct](./src/shared/states/AppData/defaultData.js) template as follows:

Products:
```json
{
   "id": 1,
   "barcode": 1000000,
   "name": "Product",
   "stock": 1,
   "price": 1,
   "tax": 10,
   "campaign": "",
   "isFavourite": false,
   "image": "",
   "categoryId": 1,
   "subCategoryId": 1,
   "fraction":false
}
```

Categories:
```json
{
   "id":1,
   "name":"Categories",
   "image":""
}
```

Sub-Categories:
```json
{
   "id":1,
   "name":"Sub",
   "image":"",
   "categoryId":1
}
```

Categories:
```json
{
   "receiptNumber": "25ab8fa4-5bef-410e-99d3-7113211240e4",
   "active": true,
   "storeNumber": "1001(Web)",
   "case": 1,
   "cashierName":"Name",
   "cashierNumber": 1,
   "date": "2000-01-01T09:00:00.175Z",
   "total": 1,
   "subTotal": 1,
   "amountPaid": 2,
   "totalTax": 1,
   "change": 1,
   "cart": [
      {
         "id": 1,
         "barcode": 1000000,
         "name": "Product",
         "stock": 1,
         "price": 1,
         "tax": 10,
         "campaign": "",
         "isFavourite": false,
         "image": "",
         "categoryId": 1,
         "subCategoryId": 1,
         "fraction":false,
         "quantity": 4,
         "discountedPrice": 0
      }
   ],
   "transactions": [
      {
         "price": 1,
         "type": "cash"
      },
      {
         "price": 1,
         "type": "card"
      }
   ],
   "refund": "",
   "email":""
}
```

##### Other data:

`/status`:
```json
{
   "version":"v1.00",
   "schedule": {
      "Monday": {"start": "0:00", "end": "24:00"},
      "Tuesday": {"start": "0:00", "end": "24:00"},
      "Wednesday": {"start": "0:00", "end": "24:00"},
      "Thursday": {"start": "0:00", "end": "24:00"},
      "Friday": {"start": "0:00", "end": "24:00"},
      "Saturday": {"start": "0:00", "end": "24:00"},
      "Sunday": {"start": "0:00", "end": "24:00"}
   }
}
```

`/login`:
```json
{
   "cashierName": "Cashier Name",
   "cashierNumber": 1
}
```

### Using Sample Data with Mockoon
If you want to test the POS System with sample data, I recommend using a tool like [Mockoon](https://mockoon.com/). Mockoon is an open-source tool that allows you to create mock APIs and simulate realistic responses.

To use the sample data with Mockoon:

1. Install Mockoon on your machine.
2. Create a new environment in Mockoon and define the necessary routes and responses based on the sample data.
3. Configure the routes to match the API endpoints defined in the `config.json` file.
4. Start the Mockoon server and ensure it is accessible from your development environment.
5. Update the `apiBaseUrl` in the `config.json` file to point to the Mockoon server's URL.

By using Mockoon, you can simulate the backend API responses and test the POS System with realistic data without relying on an actual backend server.

Remember to adjust the sample data and configurations according to your specific requirements and use case.

I hope this detailed explanation helps you understand how to configure the POS System using `config.json`, modify icons and fonts in the `public` folder, create data with template data in `defaultData.js`, and utilize Mockoon for testing with sample data.




## Usage
The POS System offers a comprehensive and intuitive interface for managing various business operations efficiently. Below is an expanded overview of the main functionalities provided by the system:

### Sales Management
- **Order Creation**: Initiate new sales transactions by adding products to the shopping cart. This can be done through the `SalesDashboard` where products can be selected and quantities adjusted.
- **Discount Application**: Apply discounts at the item level or to the entire cart. This feature is accessible within the `PaymentDashboard`, allowing for dynamic pricing adjustments before finalizing the sale.
- **Payment Processing**: Handle multiple forms of payment including cash, credit/debit cards, and digital wallets. The `PaymentDashboard` facilitates the entry of payment details and processes transactions securely.
- **Sales History**: View and manage past transactions through the `PurchaseReceipts` page, which provides detailed historical data on all sales activities.

### Inventory Management
- **Product Addition**: Add new products to the inventory with details such as name, price, stock levels, and images through the `ProductEntryPanel`.
- **Product Updates**: Modify existing product details to reflect changes in price, stock quantities, or product descriptions. This can be done through the `ProductsDashboard` where each product can be individually edited.
- **Stock Monitoring**: Keep track of current stock levels to manage inventory effectively. Alerts for low stock levels can be configured to prompt timely reordering.

### Refund Processing
- **Refund Initiation**: Process refunds for previously completed orders. This involves selecting the order from the `PurchaseReceipts` and moving it to the `RefundDashboard` where specific items can be selected for refund.
- **Stock Adjustment**: Manually adjust stock levels when a refund is processed to ensure inventory accuracy with `ProductsDashboard`.

### Reporting
- **Sales Reports**: Generate detailed reports on total sales, profits, and revenue streams. The `SummaryDashboard` allows for filtering data by various time frames such as daily, weekly, or monthly.
- **Product Performance**: Analyze which products are performing best in terms of sales volume and profitability. This helps in making informed decisions about stock replenishment and promotions.

### User Management
- **Cashier Accounts**: Manage accounts for each cashier, and including setting up new accounts.
- **Sales Tracking**: Monitor sales transactions linked to individual cashiers to assess performance and ensure accountability.

These functionalities are designed to streamline operations, enhance user experience, and improve management efficiency across various aspects of the business.

## File Structure
The POS System's file structure is organized as follows:
```
│   ├── pages/
│   │   ├── LoginPage/
│   │   ├── MainContainer/
│   │   ├── MainScreen/
│   │   ├── OfflineErrorPage/
│   │   ├── PaymentDashboard/
│   │   ├── ProductEntryPanel/
│   │   ├── ProductsDashboard/
│   │   ├── PurchaseReceipts/
│   │   ├── RefundDashboard/  
│   │   ├── ResponsiveReceipt/
│   │   ├── SalesDashboard/
│   │   ├── SettingsDashboard/
│   │   └── SummaryDashboard/
│   ├── shared/
│   │   ├── components/
│   │   ├── functions/
│   │   └── states/
│   ├── router/
│   ├── utils/
│   ├── locales/
│   ├── config.json
│   └── index.js
├── package.json
└── README.md
```

The main components of the file structure are:

1. **pages**: This directory contains the main pages of the POS System, such as the MainScreen, PaymentDashboard, ProductsDashboard, and more.
2. **shared**: This directory holds shared components and state management contexts used across the application.
3. **router**: This directory contains the routing configuration for the POS System.
4. **locales**: This directory stores the translation files for different languages.
5. **index.js**: The entry point of the application.
6. **config.json**: The configuration file for the POS System, containing settings such as the API base URL, online/offline schedule, and cashier information.


## Pages
The POS System consists of the following pages:

### LoginPage
The `LoginPage` component is the initial page that users see when accessing the POS System. It provides a login form where users can enter their credentials to authenticate and access the main application.

### MainContainer
The `MainContainer` component serves as the main wrapper for the application, handling the overall layout and rendering the `MainScreen` component.

### MainScreen
The `MainScreen` component is the main entry point for the POS System. It displays the active area, which includes the various functionalities of the application, such as order creation, product management, and refund processing.

### OfflineErrorPage
The `OfflineErrorPage` component is displayed when the user tries to access the POS System while in offline mode. It provides a clear indication of the offline state and offers guidance on how to proceed.

### PaymentDashboard
The `PaymentDashboard` component is responsible for handling the payment process. It consists of three main areas:
1. **PaymentDashboardLeftArea**: Displays the total amount, payment transactions, and a form for entering the customer's email.
2. **PaymentDashboardMiddleArea**: Shows the items in the shopping cart and the total amount.
3. **PaymentDashboardRightArea**: Provides the numeric keyboard, payment method selection, and the "Confirm Payment" button.

### ProductEntryPanel
The `ProductEntryPanel` component allows users to add new products to the system. It includes a product display area, a product form area, and a product dialog for confirming the product details.

### ProductsDashboard
The `ProductsDashboard` component is the main page for managing the product inventory. It displays a grid of product cards, allowing users to navigate through the categories and subcategories, search for products, and add them to the cart.

### PurchaseReceipts
The `PurchaseReceipts` component provides a comprehensive view of all the completed transactions. Users can see the details of each receipt, including the receipt number, product count, total amount, and the date of the transaction.

### RefundDashboard
The `RefundDashboard` component allows users to process refunds for previous orders. It displays the items in the cart, the refunded products, and the total refund amount. Users can remove items from the cart, add them back, and confirm the refund.

### ResponsiveReceipt
The `ResponsiveReceipt` component is responsible for rendering the receipt in a responsive manner. It provides options to align the receipt horizontally and switch between the receipt and the product details view.

### SalesDashboard
The `SalesDashboard` component is the main interface for managing sales. It consists of three main areas:
**SalesDashboardLeftArea**: Displays the product categories, subcategories, and individual products, allowing users to search and add items to the cart.
1**SalesDashboardMiddleArea**: Shows the items in the shopping cart and the total amount.
2**SalesDashboardRightArea**: Provides the numeric keyboard, discount options, and the "Confirm Payment" button.

### SettingsDashboard
The `SettingsDashboard` component is responsible for managing the application settings, such as language selection and user preferences.

### SummaryDashboard
The `SummaryDashboard` component generates comprehensive reports on the business performance. It displays various metrics, such as total sales, top-selling products, most profitable categories, and refund statistics. Users can filter the data by different time periods (hourly, daily, monthly, yearly, or all-time).

## Components

The POS System utilizes a variety of reusable components located in the `shared/components` directory. These components are designed to be modular and versatile, allowing them to be easily integrated into other projects. Below is a detailed description of each component, highlighting their functionalities and the extra features they provide related to the POS System.

### ShoppingCartItem
- **Description**: Displays a single item in the shopping cart, including product details such as name, quantity, and price.
- **Extra Features**: Includes interactive elements for adjusting item quantities directly from the cart and removing items if needed.

### ProductCard
- **Description**: Represents a single product, displaying its image, name, price, and stock information.
- **Extra Features**: Features a quick-add button to instantly add the product to the shopping cart, and a favorite toggle to mark products as favorites for quicker access.

### NumericKeyboard
- **Description**: Provides a numeric keyboard for entering values, which is particularly useful for touch screen devices in a retail environment.
- **Extra Features**: Customizable keys to include specific functionalities like applying discounts or setting exact quantities.

### FormDialog
- **Description**: Displays a modal dialog for collecting user input, which can be used for various purposes such as entering a customer's email or a discount code.
- **Extra Features**: Validation functionality to ensure the input meets specific criteria before submission.

### ResponsiveDialog
- **Description**: Renders a responsive dialog with customizable content and actions, adapting its layout based on the screen size.
- **Extra Features**: Supports multiple actions, allowing it to be used for confirmations, information, or to host forms with multiple fields.

### ScreenKeyboard
- **Description**: Handles the on-screen keyboard functionality, providing a full QWERTY keyboard for data entry.
- **Extra Features**: Includes language support and can switch between multiple layouts (e.g., numeric, alphanumeric).

### OnlineOfflineIndicator
- **Description**: Displays the current online/offline status of the application, updating in real-time based on network conditions.
- **Extra Features**: Can trigger certain actions when the status changes, such as syncing offline data when the connection is restored.

### AlertComponent
- **Description**: Provides a centralized location for displaying alerts and error messages across the application.
- **Extra Features**: Supports different types of alerts (info, warning, error, success) and can be configured to disappear after a set duration or to require user dismissal.

### Receipt
- **Description**: Generates and renders the receipt for a completed transaction, showing detailed breakdowns of items, taxes, discounts, and totals.
- **Extra Features**: Can be configured to print or email directly from the component, and supports multiple formats (e.g., full page, slip).

These components are built with reusability in mind, ensuring that they can be easily adapted or extended for use in other projects beyond the POS System. Their modular design also facilitates maintenance and scalability, allowing for new features to be added as the system evolves.

## Contexts

The POS System leverages a sophisticated suite of context providers, each meticulously designed to manage and streamline different facets of the application's state. This architecture not only enhances the performance but also ensures a seamless and efficient data flow across components, crucial for maintaining a responsive and dynamic user interface.

### 1. **AppStatusContext**
This context is pivotal in managing the overall application status. It oversees critical aspects such as the online/offline state, language settings, and user information. By centralizing these functionalities, the system ensures that any status changes propagate swiftly and efficiently throughout the application, thereby enhancing the responsiveness and adaptability of the system.

### 2. **AppDataContext**
Focused on handling the data related to products, categories, and subcategories, this context acts as a backbone for the POS system's inventory management. It efficiently manages data fetching and updates, which is vital for maintaining up-to-date and accurate inventory information. The use of session storage for persisting state across sessions further boosts the system's performance by reducing unnecessary data fetches.

### 3. **KeyboardContext**
This context underpins the functionality of the on-screen keyboard, a critical component in enhancing user interaction, especially in touch-centric environments. By managing keyboard state and interactions centrally, the system ensures a fluid and error-free user experience, which is essential for environments that demand speed and accuracy, such as point-of-sale systems.

### 4. **PaymentContext**
At the heart of any POS system is the processing of transactions, and this context is dedicated to managing all payment-related data. From handling the shopping cart to overseeing payment transactions and confirmations, this context ensures that all payment processes are executed flawlessly. The meticulous management of payment data not only secures transactions but also optimizes the checkout process, thereby enhancing overall system performance.

### 5. **CartContext**
Essential for managing the shopping cart, this context handles additions, removals, and modifications of products within the cart. It is intricately designed to calculate totals, subtotals, taxes, and discounts efficiently. This not only ensures accuracy in financial calculations but also significantly enhances the system's performance by optimizing data handling and state updates.

Each context provider in the POS System is engineered to perform its role with maximum efficiency and minimum overhead. This design philosophy not only ensures stellar performance across different modules of the system but also simplifies maintenance and scalability. By compartmentalizing state management, the system can easily adapt to new requirements and integrate additional functionalities without compromising on performance. This strategic approach to context management is a testament to the system's robust architecture and its capability to handle the dynamic needs of modern retail environments.

## Localization
The POS System supports multiple languages, with English and Turkish currently included. The localization is implemented using the `i18next` library, which allows for easy translation of the user interface and dynamic content.

The translation files are stored in the [`src/locales`](./src/locales) directory, with each language having its own JSON file. The `useTranslation` hook from `react-i18next` is used to access the translated strings throughout the application.

## Routing
The POS System's routing is handled using the `react-router-dom` library. The main routes are defined in the `src/router` directory, and the corresponding page components are rendered based on the URL path.

The routing structure includes the following main routes:

- `/login`: The route for the login page, which renders the `LoginPage` component.
- `/`: The main entry point, which renders the `MainScreen` component.
- `/order/create`: The route for creating a new order, which renders the `SalesDashboard` component.
- `/order/payment`: The route for the payment process, which renders the `PaymentDashboard` component.
- `/products/list`: The route for the product inventory, which renders the `ProductsDashboard` component.
- `/product/add`: The route for adding a new product, which renders the `ProductEntryPanel` component.
- `/refund/create`: The route for processing refunds, which renders the `RefundDashboard` component.
- `/purchase/list`: The route for viewing the purchase receipts, which renders the `PurchaseReceipts` component.
- `/summary/calculate`: The route for generating reports, which renders the `SummaryDashboard` component.

## Contributing
We welcome contributions to the POS System project. If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure that the code passes all tests.
4. Submit a pull request, describing the changes you have made.

We will review your pull request and provide feedback. Once your changes are approved, they will be merged into the main codebase.

## License
The POS System is licensed under the [MIT License]().
