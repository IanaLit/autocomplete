import { render } from "@testing-library/react";
import App from "../App";

describe('App', ()=>{
    test("show search field", async()=>{
        const {getByPlaceholderText} = render(<App/>);
        const input = getByPlaceholderText(/Search/);
        expect(input).toBeInTheDocument();
    })
})