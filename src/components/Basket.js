import React, { PureComponent } from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

// import IntlMessageFormat from "intl-messageformat";
import {
    Cart,
    Product,
    CheckoutButton,
    cartLocalization,
    cartReducer,
    setCartCurrency
} from "react-shopping-cart";

// import "bootstrap/dist/css/bootstrap.css";
/**
 * quartz,
 *  https://github.com/thomaspark/bootswatch/tree/v5/dist
 * https://bootswatch.com/
 */




const { getDefaultLocalization } = cartLocalization;

// You may take localization object from wherever you want, that's just an example
// For more information, see localization section
/**
 * https://www.npmjs.com/package/react-shopping-cart#product
 */
const iPadCaseLocalization = {
    color: "Color",
    iPadCase: "iPad case",
    blau: "Blau",
    red: "Red",
    green: "Green",
    yellow: "Yellow",
    GBP: "£",
    EUR: "€",
    USD: "$"
};

const iPadPropertiesWithAdditionalCostLocalization = {
    yellow: "Yellow (+{cost, number, CUR})",
    blau: "Blau (+{cost, number, CUR})"
};

const store = createStore(
    combineReducers({
        cart: cartReducer
        // Your own reducers, sir
    })
);

store.dispatch(setCartCurrency("EUR"));

class App extends PureComponent {
    state = {
        product: {
            name: "iPadCase",
            id: "ipad-case",
            path: "/shop/ipad-case/",
            properties: {
                color: [
                    {
                        additionalCost: {
                            GBP: 1,
                            EUR: 2,
                            USD: 3.5
                        },
                        value: "blau"
                    },
                    "red",
                    "green",
                    {
                        additionalCost: {
                            GBP: 1,
                            EUR: 2,
                            USD: 3.5
                        },
                        value: "yellow"
                    }
                ]
            },
            propertiesToShowInCart: ["color"],
            prices: { GBP: 70, EUR: 80, USD: 90 },
            currency: "GBP",
            imageSrc: "1-483x321.jpeg"
        },
        getProductLocalization: getDefaultLocalization("product", "en", {
            ...iPadCaseLocalization,
            ...iPadPropertiesWithAdditionalCostLocalization
        }),
        getCheckoutButtonLocalization: getDefaultLocalization(
            "checkoutButton",
            "en",
            iPadCaseLocalization
        ),
        getCartLocalization: getDefaultLocalization(
            "cart",
            "en",
            iPadCaseLocalization
        )
    };

    render() {
        const {
            product,
            getCheckoutButtonLocalization,
            getProductLocalization,
            getCartLocalization
        } = this.state;

        const checkoutButtonElement = (
            <CheckoutButton
                getLocalization={getCheckoutButtonLocalization}
                checkoutURL="/to/my/checkout"
            />
        );
        return (
            <Provider store={store}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Product
                                {...product}
                                checkoutButton={checkoutButtonElement}
                                getLocalization={getProductLocalization}
                                // iconCheckoutClassName={"fa fa-mail mx-1"}
                                iconCheckoutClassName={"fas fa-address-card"}
                            />
                        </div>
                        <div className="col">
                            <Cart
                                checkoutButton={checkoutButtonElement}
                                getLocalization={getCartLocalization}
                            />
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;
