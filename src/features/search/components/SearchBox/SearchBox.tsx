import classNames from 'classnames';
import {
  ChangeEvent,
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { selectClearSearch, setQuery } from 'features/search/store';
import { useDebounce } from 'hooks/useDebounce';
import CloseIcon from '/public/icons/ui/close.svg';
import SearchIcon from '/public/icons/ui/search.svg';
import ProgressIcon from '/public/icons/ui/progress.svg';

import './SearchBox.scss';

interface SearchBoxProps {
  onClear: () => void;
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

const SearchBox = forwardRef(
  (
    { className, isLoading, onSearch, onClear, placeholder }: SearchBoxProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const dispatch = useAppDispatch();
    const clearSearch = useAppSelector(selectClearSearch);

    const [input, setInput] = useState({
      value: '',
      isValid: true,
    });

    const debouncedValue = useDebounce<string>(input.value, 750);

    const handleInputSubmit = useCallback(
      (value: string) => {
        let result = '';

        // Remove the extra spaces
        result = value.trim();

        if (!result) return;

        // Detect the phrase
        const isPhrase = /\s/g.test(result);
        if (isPhrase) {
          const words = result.split(' ');
          // Remove words that contain more than 2 characters
          const wordsCropped = words.filter((word) => word.length > 2);
          result = wordsCropped.join(' ');
        }

        onSearch(result);
      },
      [onSearch]
    );

    const clearInput = () => {
      setInput({ value: '', isValid: true });
      onClear();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (!value) {
        clearInput();
        return;
      }
      // Validate input. Leave only the digits, spaces and letters,
      const regex = /^[а-щьюяґєіїa-z\d\s]+$/i;
      const isValid = regex.test(value);
      if (isValid) {
        setInput({ value, isValid: true });
      } else {
        setInput({ value, isValid: false });
      }
    };

    const handleClear = () => {
      clearInput();
    };

    useEffect(() => {
      handleInputSubmit(debouncedValue);
    }, [debouncedValue, handleInputSubmit]);

    useEffect(() => {
      if (clearSearch) {
        setInput({ value: '', isValid: true });
        dispatch(setQuery(''));
        // dispatch(setClearSearch(false));
      }
    }, [clearSearch, dispatch]);

    const loadingIcon = (
      <div className="search-box__icon progress anim">
        <ProgressIcon className="anim--loading" />
      </div>
    );

    const searchIcon = (
      <div className="search-box__icon anim">
        <SearchIcon />
      </div>
    );

    const clearIcon = !!input.value && (
      <div className="search-box__icon action anim">
        <CloseIcon onClick={handleClear} />
      </div>
    );

    const errorMsgEl = !input.isValid && (
      <div className="search-box__error-message">
        Дозволені лише літери, цифри та пробіл.
      </div>
    );

    return (
      <div className={classNames('search-box anim shadow--a', className)}>
        <div className="search-box__input-wrapper">
          {isLoading ? loadingIcon : searchIcon}
          <input
            ref={ref}
            value={input.value}
            className="search-box__input"
            onChange={handleChange}
            placeholder={placeholder}
          />
          {clearIcon}
        </div>

        {errorMsgEl}
      </div>
    );
  }
);

SearchBox.displayName = 'SearchBox';

export { SearchBox };
