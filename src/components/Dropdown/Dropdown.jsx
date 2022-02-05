import React from 'react';
import { useClickOutside } from '../../hooks';
import { Checkbox } from '../Checkbox';
import { Divider } from '../Divider';

import './Dropdown.scss';

export const Dropdown = ({ items: initialItems, type = 'items', placeholder, values, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [items, setItems] = React.useState(initialItems);
  const [searchTerm, setSearchTerm] = React.useState('');

  const [selectedItems, setSelectedItems] = React.useState(items.filter((item) => values.includes(item.value)) || []);

  const dropdownRef = React.useRef();

  useClickOutside(dropdownRef, () => {
    setItems(initialItems);
    setIsOpen(false);
  });

  React.useEffect(() => {
    if (!values || values.length === 0) return setSelectedItems([]);

    setSelectedItems(initialItems.filter((item) => values.includes(item.value)) || []);

    // eslint-disable-next-line
  }, [values]);

  React.useEffect(() => {
    setItems(
      initialItems.filter((item) => {
        if (item.label && item.label.title && item.label.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        }

        if (item.label && item.label.subtitle && item.label.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        }

        return false;
      }),
    );

    // eslint-disable-next-line
  }, [searchTerm]);

  React.useEffect(() => {
    onChange && onChange(selectedItems);

    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown__header" onClick={() => setIsOpen(!isOpen)}>
        <div className="dropdown__header-title">
          <h3>{selectedItems.length > 0 ? `${selectedItems.length} ${type} selected` : placeholder}</h3>
        </div>
      </div>
      {isOpen && (
        <div className="dropdown__body">
          <div className="dropdown__body-search">
            <input
              type="text"
              placeholder="Search"
              autoFocus
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <div className="dropdown__body-list">
            {selectedItems.length > 0 && (
              <div className="dropdown__body-list-selected">
                <p>Selected</p>
                {selectedItems.map((item) => (
                  <div
                    key={item.value}
                    className="dropdown__body-list-item"
                    onClick={() => {
                      if (!selectedItems.includes(item)) {
                        setSelectedItems([...selectedItems, item]);
                      } else {
                        setSelectedItems(selectedItems.filter((i) => i !== item));
                      }
                    }}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        if (!selectedItems.includes(item)) {
                          setSelectedItems([...selectedItems, item]);
                        } else {
                          setSelectedItems(selectedItems.filter((i) => i !== item));
                        }
                      }
                    }}
                  >
                    <div className="dropdown__body-list-item-checkbox">
                      <Checkbox checked={selectedItems && selectedItems.includes(item)} />
                    </div>
                    <div className="dropdown__body-list-item-content">
                      <h4>{item.label.title}</h4>
                    </div>
                  </div>
                ))}
                <Divider />
                <br />
              </div>
            )}
            {items.map((item) => (
              <div
                key={item.value}
                className="dropdown__body-list-item"
                onClick={() => {
                  if (!selectedItems.includes(item)) {
                    setSelectedItems([...selectedItems, item]);
                  } else {
                    setSelectedItems(selectedItems.filter((i) => i !== item));
                  }
                }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    if (!selectedItems.includes(item)) {
                      setSelectedItems([...selectedItems, item]);
                    } else {
                      setSelectedItems(selectedItems.filter((i) => i !== item));
                    }
                  }
                }}
              >
                <div className="dropdown__body-list-item-checkbox">
                  <Checkbox checked={selectedItems && selectedItems.includes(item)} />
                </div>
                <div className="dropdown__body-list-item-content">
                  <h4>{item.label.title}</h4>
                  {item.label.subtitle && <p>{item.label.subtitle}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
