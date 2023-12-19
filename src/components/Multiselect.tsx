import React, { useRef, useState, useEffect } from "react";
import "./Multiselect.scss";

function Multiselect() {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [inputList, setInputList] = useState<
    { value: string; emoji: string }[]
  >([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getRandomEmoji = () => {
    const emojis = ["😀", "😎", "🌟", "🚀", "🌈", "🎉", "🍎", "🌸", "🦄", "🍕"];
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newEmoji = getRandomEmoji();
      setInputList((prevList) => [
        ...prevList,
        { value: inputValue, emoji: newEmoji },
      ]);
      setInputValue("");
    }
  };

  const isOptionSelected = (option: { value: string; emoji: string }) => {
    return selectedItems.some((item) => item.value === option.value);
  };

  const handleClickOutsideDropdown = (e: MouseEvent) => {
    if (
      isDropdownOpen &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <div>
        <h2>Multiselect</h2>
        <div className="selected-items">
          {selectedItems.map((item, index) => (
            <div key={index} className="selected-item">
              <span>{item.value}</span>
              <span>{item.emoji}</span>
            </div>
          ))}
        </div>
        <div className="multi-select">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            onClick={() => setIsDropdownOpen(true)}
            ref={inputRef}
          />
          <div
            className={`${
              inputList.length > 0 && isDropdownOpen ? "dropdown" : "no-drop"
            }`}
            ref={dropdownRef}
          >
            {inputList.map((item, index) => (
              <div
                key={index}
                className={`option  ${
                  isOptionSelected(item) ? "selected" : ""
                }`}
                onClick={() => {
                  if (!isOptionSelected(item)) {
                    setSelectedItems([...selectedItems, item]);
                  }
                }}
              >
                <div>{item.value}</div>
                <div>{item.emoji}</div>
                <div className="alight__tick">
                  {isOptionSelected(item) && "✓"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Multiselect;
