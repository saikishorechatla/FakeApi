import React from 'react';
import { ChevronIcon } from '../../../assets/icons';
import AppText from '../AppText/AppText';

export const APP_DROPDOWN_INPUT_TEST_ID = 'APP_DROPDOWN_INPUT';
export const APP_DROPDOWN_ITEMS_LIST_CONTAINER_TEST_ID = 'APP_DROPDOWN_ITEMS_LIST_CONTAINER';
export const APP_DROPDOWN_EMPTY_ITEM_TEST_ID = 'APP_DROPDOWN_EMPTY_ITEM';
export const APP_DROPDOWN_ITEM_TEST_ID = 'APP_DROPDOWN_ITEM';

interface IData {
  label: string;
  value: string;
}

interface Props {
  labelText: string;
  selectedItem?: IData;
  data: IData[];
  onChange: (args: IData) => void;
  optional?: boolean;
  validateDropDown?: () => void;
  disabled?: boolean;
  testID?: string;
}

const AppDropdown = ({
  labelText,
  selectedItem,
  data,
  onChange,
  optional,
  disabled = false,
  testID = "",
  validateDropDown = () => {},
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(null); // State to track highlighted item index
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onBlur = () => {
    setIsOpen(false);
    validateDropDown();
  };

  const handleInputClick = () => {
    if (disabled) return;
    setIsOpen((prevState) => !prevState); // Toggle the dropdown
  };

  // Added: Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) return; // Only handle if dropdown is open

    if (event.key === 'ArrowDown') {
      event.preventDefault(); // Prevent default scrolling behavior
      setHighlightedIndex((prevIndex) => {
        // Move to next item, loop back to start if at the end
        const nextIndex = prevIndex === null ? 0 : (prevIndex + 1) % data.length;
        return nextIndex;
      });
    } else if (event.key === 'ArrowUp') {
      event.preventDefault(); // Prevent default scrolling behavior
      setHighlightedIndex((prevIndex) => {
        // Move to previous item, loop to end if at the beginning
        const nextIndex = prevIndex === null ? data.length - 1 : (prevIndex - 1 + data.length) % data.length;
        return nextIndex;
      });
    } else if (event.key === 'Enter' && highlightedIndex !== null) {
      event.preventDefault(); // Prevent default form submission behavior
      onChange(data[highlightedIndex]); // Select the highlighted item
      setIsOpen(false); // Close the dropdown after selection
    }
  };

  // Added: Handle item selection with mouse click
  const handleItemClick = (item: IData) => {
    onChange(item); // Trigger the onChange event with the clicked item
    setIsOpen(false); // Close the dropdown
  };

  // Helper function to apply styles based on focus state
  const appTextColor = () => {
    return inputRef.current === document.activeElement ? 'text-bnf_primary' : 'text-bnf_gray_838383';
  };

  return (
    <div className="relative">
      <input
        data-testid={testID || APP_DROPDOWN_INPUT_TEST_ID}
        ref={inputRef}
        type="text"
        onFocus={handleInputClick}
        onKeyDown={handleKeyDown} // Added: Keydown event listener for arrow and enter keys
        className={`text-base pt-3 pb-1.5 w-full border-b-2 font-rubik cursor-pointer ${
          isOpen ? 'border-b-bnf_primary' : 'border-b-bnf_black_60'
        }`}
        onBlur={onBlur}
        disabled={disabled}
        readOnly
      />
      <label
        className={`absolute left-8 transition-all pointer-events-none ${
          isOpen || selectedItem?.value ? '-top-0.5' : 'bottom-1.5'
        }`}
      >
        <AppText
          className={`transition-all ${
            isOpen || selectedItem?.value ? `text-xs ${appTextColor()}` : 'text-sm text-bnf_gray_838383'
          }`}
        >
          {labelText}
        </AppText>
      </label>
      <AppText
        className={`absolute bottom-1.5 pointer-events-none ${disabled && 'text-[#bebebe]'}`}
      >
        {selectedItem?.label}
      </AppText>
      <div
        id="dropdown-icon-container"
        className={`cursor-pointer absolute bottom-1.5 right-0 translate-y-1/2 ${
          isOpen ? 'rotate-180' : 'rotate-0'
        }`}
        onClick={handleInputClick}
      >
        <ChevronIcon className={isOpen ? 'stroke-bnf_primary' : 'stroke-bnf_black'} />
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div
          data-testid={APP_DROPDOWN_ITEMS_LIST_CONTAINER_TEST_ID}
          className="absolute top-full left-0 w-full bg-bnf_white shadow-md border transition-all"
        >
          <ul className="py-2">
            {optional && (
              <li>
                <button
                  data-testid={APP_DROPDOWN_EMPTY_ITEM_TEST_ID}
                  onMouseDown={() => handleItemClick({ label: '', value: '' })}
                  className="px-4 py-2 cursor-pointer bg-bnf_white_30 min-h-[2.5rem]"
                >
                  <AppText>(empty)</AppText>
                </button>
              </li>
            )}
            {data.map((item, index) => (
              <li key={item.value}>
                <button
                  data-testid={`${APP_DROPDOWN_ITEM_TEST_ID}_${index}`}
                  onMouseDown={() => handleItemClick(item)} // Added: Mouse click to select item
                  className={`px-4 py-2 hover:bg-bnf_white_28 relative cursor-pointer ${
                    index === highlightedIndex ? 'bg-bnf_primary_20' : '' // Added: Highlight the selected item
                  }`}
                  onMouseEnter={() => setHighlightedIndex(index)} // Highlight item on hover
                >
                  <AppText>{item.label}</AppText>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


export default AppDropdown;
