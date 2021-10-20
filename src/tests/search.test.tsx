import { fireEvent, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from "../components/search";

describe('Search', ()=>{
    beforeAll(() => {
        jest.useFakeTimers();
    })

    afterAll(() => {
        jest.useRealTimers()
    })
    test("show loader", async()=>{
        const {getByPlaceholderText, getByTestId} = render(<Search/>);
        const input = getByPlaceholderText(/Search/);
        expect(input).toBeNull;
        userEvent.type(input, "g");
        expect(getByTestId("loader")).toBeInTheDocument();

    })
    test("handle change", async()=>{
        const onChangeHandler = jest.fn();
        const handleNavigation = jest.fn();
        const {getByPlaceholderText} = render(<input type="text" className="search-input"
        placeholder = "&#xF002; Search"
        onChange={e => onChangeHandler(e.target.value)}
        onKeyDown={e => handleNavigation(e)}
    />);
        const input = getByPlaceholderText(/Search/);
        userEvent.type(input, "g");
        expect((input as HTMLInputElement).value).toBe('g');
        expect(onChangeHandler).toBeCalledWith("g");
        expect(onChangeHandler).toBeCalledTimes(1);
        expect(handleNavigation).toBeCalledTimes(1);
        fireEvent.keyDown(input, { key: 'ArrowDown'});
        expect(handleNavigation).toBeCalledTimes(2);
    })
})