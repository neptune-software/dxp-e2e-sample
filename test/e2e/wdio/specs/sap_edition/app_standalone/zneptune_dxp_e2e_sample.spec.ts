import * as dxpE2E from "@neptune-software/dxp-e2e-toolbox";
import * as dotenv from "dotenv";
import { default as _wdi5 } from "wdio-ui5-service";

//@ts-ignore <-- https://github.com/percy/percy-selenium-js/issues/429
import { percyScreenshot } from "@percy/selenium-webdriver";

import Text from "sap/m/Text";
import Button from "sap/m/Button";


const wdi5 = new _wdi5();

const selectors = {
    ZNEPTUNE_DXP_E2E_SAMPLE: {
        txtSimpleFormVALUE: {
            selector: {
                id: "txtSimpleFormVALUE"
            }
        },
        ButtonToggleValue: {
            selector: {
                id: "ButtonToggleValue",
                interaction: {
                    idSuffix: "BDI-content"
                }
            }
        }

    }
};

describe("Testing app ZNEPTUNE_DXP_E2E_SAMPLE ", () => {

    before(async () => {
        // load environment variables from .env file
        dotenv.config();
        // setup neptune dxp e2e toolbox
        dxpE2E.common.Environment.getInstance().setup({
            wdi5: wdi5,
            browser: browser,
            dxpEditionType: dxpE2E.common.DxpEditionType.sapEdition,
            dxpVersion: process.env.DXP_SAP_EDITION_VERSION || "23.10.0000"
        });
    });


    it("Perform toggle of a value", async () => {

        const app = await dxpE2E.sapEdition.AppSapEdition.open({
            appName: "ZNEPTUNE_DXP_E2E_SAMPLE",
            webapp: true,
            saml2Disabled: true,
            neptuneDebug: true,
            url: process.env.SAP_URL,
            client: process.env.SAP_CLIENT,
        })

        const webappLogin = new dxpE2E.sapEdition.WebappLogin();

        await webappLogin.login(process.env.SAP_USER!, process.env.SAP_PASSWORD!);

        await webappLogin.injectUI5();

        await app.waitUntilNeptuneIsReady();

        // get initial text value control
        let txtSimpleFormVALUEControl = await browser.asControl<Text>(selectors.ZNEPTUNE_DXP_E2E_SAMPLE.txtSimpleFormVALUE);

        // get the initial value of it (.getText())
        let VALUEtext = await txtSimpleFormVALUEControl.getText(false);

        // is it initially really empty?
        await expect(VALUEtext).toBe("");

        // get the Toggle Button control.
        const ButtonToggleValue = await browser.asControl<Button>(selectors.ZNEPTUNE_DXP_E2E_SAMPLE.ButtonToggleValue);

        // press the button
        await ButtonToggleValue.press();

        // since a backend trip is evolved wait a little
        await browser.pause(1000);

        // get the new text
        VALUEtext = await txtSimpleFormVALUEControl.getText(false);

        // now it should be "Value A" which is filled from the backend!
        await expect(VALUEtext).toBe("Value A");

        // press the toggle button again
        await ButtonToggleValue.press();

        // get the new text
        VALUEtext = await txtSimpleFormVALUEControl.getText(false);

        // now it should be "Value B" which is filled from the backend!
        await expect(VALUEtext).toBe("Value B");

        await percyScreenshot(driver, "Standalone - ZNEPTUNE_DXP_E2E_SAMPLE", {});

    });

});


